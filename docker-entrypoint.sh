#!/bin/sh
set -e

# Garantir que o volume seed_state seja gravável pelo usuário nextjs
if [ -d /app/seed_state ]; then
  chown -R nextjs:nodejs /app/seed_state 2>/dev/null || true
fi

POSTGRES_HOST="${POSTGRES_HOST:-postgres}"
POSTGRES_PORT="${POSTGRES_PORT:-5432}"
TIMEOUT="${POSTGRES_TIMEOUT:-30}"

echo "Aguardando PostgreSQL em ${POSTGRES_HOST}:${POSTGRES_PORT} (timeout ${TIMEOUT}s)..."
elapsed=0
until nc -z "$POSTGRES_HOST" "$POSTGRES_PORT" 2>/dev/null; do
  if [ "$elapsed" -ge "$TIMEOUT" ]; then
    echo "Timeout: PostgreSQL não ficou disponível a tempo." >&2
    exit 1
  fi
  sleep 1
  elapsed=$((elapsed + 1))
done
echo "PostgreSQL disponível."

echo "Executando migrações..."
npx prisma migrate deploy

SEED_MARKER="${SEED_MARKER:-/app/seed_state/done}"
if [ ! -f "$SEED_MARKER" ]; then
  echo "Executando seed (apenas na primeira vez)..."
  npx prisma db seed
  mkdir -p "$(dirname "$SEED_MARKER")"
  touch "$SEED_MARKER"
  echo "Seed concluído."
else
  echo "Seed já executado anteriormente, pulando."
fi

echo "Iniciando aplicação em 0.0.0.0:3000..."
exec su nextjs -s /bin/sh -c "exec node node_modules/.bin/next start --hostname 0.0.0.0 --port 3000"
