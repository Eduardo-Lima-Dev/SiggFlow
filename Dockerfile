# Stage 1: deps – todas as dependências (incl. dev para build e seed)
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

# Stage 2: builder – generate Prisma client e build Next.js
FROM deps AS builder
COPY prisma ./prisma/
COPY src ./src/
COPY public ./public/
COPY next.config.ts tailwind.config.ts postcss.config.mjs tsconfig.json ./
RUN npx prisma generate
RUN npm run build

# Stage 3: runner – imagem final de produção
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Usuário não-root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiar do builder: node_modules (com Prisma client gerado), package.json, build e assets
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./

# Entrypoint para wait-for-db, migrate, seed e start
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Entrypoint roda como root para chown do volume; next start roda como nextjs
EXPOSE 3000

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
