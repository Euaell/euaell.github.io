FROM node:lts-alpine AS base

# Stage 1: Install dependencies
FROM base AS deps
WORKDIR /app

# Enable corepack for yarn
RUN corepack enable

# Copy package files
COPY package.json ./

# Install dependencies using yarn
# Note: --frozen-lockfile is not used since yarn.lock is gitignored
RUN yarn install --production=false

# Stage 2: Build the application
FROM base AS builder
WORKDIR /app

# Enable corepack for yarn
RUN corepack enable

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application
RUN yarn build

# Stage 3: Production server
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy built application
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]