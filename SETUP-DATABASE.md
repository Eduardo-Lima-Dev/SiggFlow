# 🗄️ Configuração do Banco de Dados em Produção

Este documento explica como configurar e popular o banco de dados em produção usando os scripts fornecidos.

## 🚀 Scripts Disponíveis

### 1. `setup-one-command.sh` (Recomendado)
Script mais simples que executa tudo em uma única execução:

```bash
./setup-one-command.sh
```

### 2. `setup-neon.sh`
Script específico para o banco Neon DB:

```bash
./setup-neon.sh
```

### 3. `setup-production.sh`
Script genérico que requer a variável `DATABASE_URL` configurada:

```bash
export DATABASE_URL="sua_string_de_conexao"
./setup-production.sh
```

## 📋 O que os Scripts Fazem

1. **Gera o cliente Prisma** (`npx prisma generate`)
2. **Executa as migrações** (`npx prisma migrate deploy`)
3. **Popula o banco com dados** (`npx prisma db seed`)

## 🎯 Para o Banco Neon DB

O banco Neon já está configurado com a string de conexão:
```
postgresql://neondb_owner:npg_X1CsovmxH2NI@ep-lucky-king-adho22zs-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

## 🛠️ Pré-requisitos

- Node.js e npm instalados
- Dependências do projeto instaladas (`npm install`)
- Acesso ao banco de dados

## 📝 Execução Manual

Se preferir executar os comandos manualmente:

```bash
# 1. Configure a DATABASE_URL
export DATABASE_URL="postgresql://neondb_owner:npg_X1CsovmxH2NI@ep-lucky-king-adho22zs-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

# 2. Gere o cliente Prisma
npx prisma generate

# 3. Execute as migrações
npx prisma migrate deploy

# 4. Execute a seed
npx prisma db seed
```

## 🔍 Verificando o Banco

Após a configuração, você pode:

- **Visualizar via Prisma Studio**: `npx prisma studio`
- **Conectar via psql**: `psql "$DATABASE_URL"`
- **Verificar o status**: `npx prisma migrate status`

## ⚠️ Importante

- Os scripts param automaticamente se houver erro (`set -e`)
- Certifique-se de ter permissões de escrita no banco
- Em produção, considere fazer backup antes de executar migrações

## 🎉 Após a Execução

O banco estará configurado com:
- ✅ Todas as tabelas criadas
- ✅ Estrutura do banco atualizada
- ✅ Dados iniciais populados (cursos, currículos, disciplinas)
- ✅ Sistema pronto para uso
