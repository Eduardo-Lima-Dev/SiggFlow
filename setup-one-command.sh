#!/bin/bash

# Script para configurar o banco de dados Neon em uma única execução
# Uso: ./setup-one-command.sh

set -e

echo "🚀 Configurando banco Neon em uma execução..."

# Define a DATABASE_URL
export DATABASE_URL=""

# Executa tudo em sequência
npx prisma generate && \
npx prisma migrate deploy && \
npx prisma db seed && \
echo "✅ Banco configurado com sucesso! 🎉"
