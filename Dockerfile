# Base image
FROM oven/bun:1-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the Astro application
ENV NODE_ENV=production

# Build arguments for environment variables (optional)
ARG NODE_MAILER_HOST
ARG NODE_MAILER_PORT
ARG NODE_MAILER_USER
ARG NODE_MAILER_PASS

ENV NODE_MAILER_HOST=$NODE_MAILER_HOST
ENV NODE_MAILER_PORT=$NODE_MAILER_PORT
ENV NODE_MAILER_USER=$NODE_MAILER_USER
ENV NODE_MAILER_PASS=$NODE_MAILER_PASS

RUN bun run build

# Production image, copy all the files and run the server
FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 astro

# Copy the built application
COPY --from=builder --chown=astro:nodejs /app/dist ./dist
COPY --from=builder --chown=astro:nodejs /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER astro

EXPOSE 4321

ENV PORT=4321
ENV HOST="0.0.0.0"
ENV NODE_ENV=production

# Start the Astro Node server
CMD ["node", "./dist/server/entry.mjs"]
