# SiggFlow - Sistema de Gestão Acadêmica

Sistema de cadastro e gestão de alunos desenvolvido com Next.js, Prisma, PostgreSQL e NextAuth.

## Funcionalidades

- ✅ Cadastro de alunos com validação
- ✅ Login seguro com NextAuth
- ✅ Dashboard personalizado
- ✅ Gestão de cursos e semestres
- ✅ Interface moderna e responsiva

## Tecnologias Utilizadas

- **Next.js 15** - Framework React
- **Prisma** - ORM para banco de dados
- **PostgreSQL** - Banco de dados
- **NextAuth.js** - Autenticação
- **Tailwind CSS** - Estilização
- **TypeScript** - Tipagem estática
- **Zod** - Validação de dados
- **bcryptjs** - Hash de senhas

## Configuração

### 1. Instalação das Dependências

```bash
npm install
```

### 2. Configuração do Banco de Dados

1. Crie um banco PostgreSQL
2. Configure as variáveis de ambiente no arquivo `.env`:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/siggflow"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
```

### 3. Configuração do Prisma

```bash
# Gerar o cliente do Prisma
npx prisma generate

# Executar as migrações
npx prisma migrate dev --name init

# (Opcional) Abrir o Prisma Studio
npx prisma studio
```

### 4. Executar o Projeto

```bash
npm run dev
```

O projeto estará disponível em `http://localhost:3000`

## Estrutura do Projeto

```
src/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts    # API NextAuth
│   │   └── register/route.ts              # API de cadastro
│   ├── cadastro/page.tsx                  # Página de cadastro
│   ├── dashboard/page.tsx                 # Dashboard do usuário
│   ├── login/page.tsx                     # Página de login
│   └── page.tsx                           # Página inicial
├── lib/
│   ├── auth.ts                            # Configuração NextAuth
│   └── prisma.ts                          # Cliente Prisma
└── types/
    └── next-auth.d.ts                     # Tipos personalizados
```

## Modelo de Dados

### Usuário (User)
- `id` - Identificador único
- `name` - Nome completo
- `email` - Email (único)
- `password` - Senha (hash)
- `curso` - Curso do aluno (enum)
- `semestre` - Semestre atual (1-10)
- `emailVerified` - Verificação de email
- `image` - Imagem do perfil
- `createdAt` - Data de criação
- `updatedAt` - Data de atualização

### Cursos Disponíveis
- Ciência da Computação
- Design Digital
- Engenharia de Computação
- Engenharia de Software
- Redes de Computadores
- Sistemas de Informação

## Rotas da Aplicação

- `/` - Redireciona para login ou dashboard
- `/cadastro` - Página de cadastro de alunos
- `/login` - Página de login
- `/dashboard` - Dashboard do usuário (protegida)

## API Endpoints

- `POST /api/register` - Cadastro de usuário
- `GET/POST /api/auth/[...nextauth]` - Autenticação NextAuth

## Segurança

- Senhas são hasheadas com bcrypt
- Validação de dados com Zod
- Autenticação segura com NextAuth
- Proteção de rotas
- Validação de entrada

## Desenvolvimento

### Comandos Úteis

```bash
# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar em produção
npm start

# Linting
npm run lint

# Prisma Studio
npx prisma studio

# Reset do banco
npx prisma migrate reset
```

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/siggflow"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
```

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT.
