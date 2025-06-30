#!/bin/bash

echo "🚀 Configurando SiggFlow - Sistema de Gestão Acadêmica"
echo "=================================================="

# Verificar se o Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não está instalado. Por favor, instale o Node.js primeiro."
    exit 1
fi

# Verificar se o npm está instalado
if ! command -v npm &> /dev/null; then
    echo "❌ npm não está instalado. Por favor, instale o npm primeiro."
    exit 1
fi

echo "✅ Node.js e npm encontrados"

# Instalar dependências
echo "📦 Instalando dependências..."
npm install

# Verificar se o arquivo .env existe
if [ ! -f .env ]; then
    echo "📝 Criando arquivo .env..."
    cat > .env << EOF
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/siggflow"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="$(openssl rand -base64 32)"
EOF
    echo "⚠️  IMPORTANTE: Configure as variáveis de ambiente no arquivo .env"
    echo "   - DATABASE_URL: URL do seu banco PostgreSQL"
    echo "   - NEXTAUTH_SECRET: Já foi gerado automaticamente"
fi

# Gerar cliente do Prisma
echo "🔧 Gerando cliente do Prisma..."
npx prisma generate

echo ""
echo "🎉 Configuração concluída!"
echo ""
echo "📋 Próximos passos:"
echo "1. Configure o arquivo .env com suas credenciais do banco"
echo "2. Execute: npx prisma migrate dev --name init"
echo "3. Execute: npm run dev"
echo ""
echo "🌐 O projeto estará disponível em: http://localhost:3000"
echo ""
echo "📚 Para mais informações, consulte o README.md" 