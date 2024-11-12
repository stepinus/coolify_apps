# Установка зависимостей и сборка
FROM node:20-alpine AS base

# Установка зависимостей
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Копирование package-lock и package.json
COPY package.json package-lock.json ./
RUN npm ci

# Сборка проекта
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Сборка Next.js
RUN npm run build

# Финальный образ для запуска
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

# Создание непривилегированного пользователя
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Копирование собранных артефактов
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Переключение на непривилегированного пользователя
USER nextjs

# Порты и переменные
EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Команда запуска
CMD ["node", "server.js"]
