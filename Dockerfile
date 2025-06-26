# Etapa 1 - Build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
ENV HUSKY_SKIP_HOOKS=1
RUN npm install

COPY . .
RUN npm run build

# Etapa 2 - Produção
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
ENV HUSKY_SKIP_HOOKS=1
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

CMD ["node", "dist/server.js"]