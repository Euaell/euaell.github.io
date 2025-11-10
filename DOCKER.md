# Docker Deployment Guide

This guide explains how to deploy the portfolio application using Docker.

## Prerequisites

- [Docker](https://www.docker.com/get-started) installed and running
- [Docker Compose](https://docs.docker.com/compose/install/) (optional, for development)

## Quick Start

### Method 1: Using the deployment script (Recommended)

```bash
npm run deploy
```

This will automatically build and deploy your portfolio.

### Method 2: Manual Docker commands

1. **Build the Docker image:**
   ```bash
   npm run docker:build
   ```

2. **Run the container:**
   ```bash
   npm run docker:run
   ```

3. **Access your portfolio:**
   Open your browser and go to `http://localhost:3000`

## Development with Docker

For development with hot reload:

```bash
npm run docker:dev
```

This uses Docker Compose to run the application in development mode with file watching.

## Docker Commands

| Command | Description |
|---------|-------------|
| `npm run docker:build` | Build the Docker image |
| `npm run docker:run` | Run the container in production mode |
| `npm run docker:stop` | Stop the running container |
| `npm run docker:remove` | Remove container and image |
| `npm run docker:logs` | View container logs |
| `npm run docker:dev` | Start development environment |
| `npm run deploy` | Complete deployment script |

## Manual Docker Commands

If you prefer using Docker directly:

```bash
# Build the image
docker build -t portfolio-app .

# Run the container
docker run -d \
  --name portfolio-container \
  -p 3000:3000 \
  --restart unless-stopped \
  portfolio-app

# View logs
docker logs portfolio-container

# Stop the container
docker stop portfolio-container

# Remove container and image
docker rm portfolio-container
docker rmi portfolio-app
```

## Environment Variables

The application uses the following environment variables:

- `NODE_ENV`: Set to `production` for production builds
- `NEXT_TELEMETRY_DISABLED`: Disables Next.js telemetry
- `PORT`: Port number (default: 3000)
- `HOSTNAME`: Hostname (default: "0.0.0.0")

## Docker Configuration

### Production Dockerfile Features

- **Multi-stage build**: Optimizes final image size
- **Non-root user**: Runs as `nextjs` user for security
- **Alpine Linux**: Smaller base image
- **Output tracing**: Leverages Next.js standalone output for minimal size
- **Production optimizations**: Disabled telemetry, optimized for performance

### Development Dockerfile Features

- **Hot reload**: File changes trigger automatic rebuilds
- **Development dependencies**: Includes all dev tools
- **Volume mounting**: Source code is mounted for real-time updates

## Deployment Options

### Local Development
```bash
npm run docker:dev
```

### Production Deployment
```bash
npm run deploy
```

### Custom Port
```bash
docker run -d \
  --name portfolio-container \
  -p 8080:3000 \
  --restart unless-stopped \
  portfolio-app
```

## Troubleshooting

### Container won't start
1. Check if port 3000 is already in use
2. View logs: `npm run docker:logs`
3. Try a different port: `docker run -p 8080:3000 ...`

### Build failures
1. Ensure Docker is running
2. Check available disk space
3. Try rebuilding: `docker system prune` then rebuild

### Permission issues (Linux/macOS)
```bash
chmod +x deploy.sh
```

## Production Deployment

For production deployment to a server:

1. **Push to registry:**
   ```bash
   docker tag portfolio-app your-registry/portfolio-app:latest
   docker push your-registry/portfolio-app:latest
   ```

2. **Deploy on server:**
   ```bash
   docker pull your-registry/portfolio-app:latest
   docker run -d \
     --name portfolio \
     -p 80:3000 \
     --restart unless-stopped \
     your-registry/portfolio-app:latest
   ```

## Docker Compose for Production

Create a `docker-compose.prod.yml`:

```yaml
version: '3.8'
services:
  portfolio:
    image: portfolio-app:latest
    ports:
      - "80:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    labels:
      - "traefik.enable=true"  # If using Traefik
```

## Security Considerations

- Container runs as non-root user
- No unnecessary packages in production image
- Environment variables for sensitive data
- Regular security updates of base image

## Image Size Optimization

The production image is optimized for size:
- Multi-stage build removes build dependencies
- Alpine Linux base (smaller than Ubuntu)
- Next.js standalone output (only necessary files)
- No development dependencies

Expected final image size: ~150-200MB 