# Usar uma imagem oficial Node.js (versão compatível com Next.js 15.1.3)
FROM node:18-alpine

# Diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar arquivos necessários para instalar dependências
COPY package.json package-lock.json ./

# Instalar dependências do projeto
RUN npm install

# Copiar o restante dos arquivos do projeto
COPY . .

# Construir a aplicação Next.js
RUN npm run build

# Expor a porta padrão do Next.js e do json-server
EXPOSE 3000 5000

# Comando padrão para rodar os dois servidores em paralelo
CMD ["sh", "-c", "npm run server & npm run start"]
