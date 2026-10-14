FROM oven/bun:1-alpine AS base
WORKDIR /app

# Everything needed to build (including devDependencies)
FROM base AS deps
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Runtime dependencies only
FROM base AS prod-deps
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
RUN bun run build

# Astro Node adapter (standalone) served by Bun
FROM base AS runner
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=4321

COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package.json ./

USER bun
EXPOSE 4321
CMD ["bun", "./dist/server/entry.mjs"]
