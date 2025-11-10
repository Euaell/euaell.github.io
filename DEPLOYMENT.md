# Deployment Documentation

This document describes the Docker deployment setup for this Next.js portfolio application.

## Overview

The application is automatically built and deployed to DockerHub when changes are pushed to the `main` branch using GitHub Actions.

## Architecture

- **Framework**: Next.js 14 with standalone output
- **Container**: Multi-stage Docker build using Alpine Linux
- **Deployment**: Automated via GitHub Actions to DockerHub
- **Registry**: DockerHub with `latest` tag

## GitHub Actions Workflow

### Workflow File
Location: [.github/workflows/docker-deploy.yml](.github/workflows/docker-deploy.yml)

### Trigger
- Pushes to `main` branch
- Manual trigger via `workflow_dispatch`

### What It Does
1. Checks out the code
2. Sets up Docker Buildx for efficient builds
3. Logs into DockerHub using secrets
4. Builds the Docker image with caching
5. Pushes the image to DockerHub with the `latest` tag

## Required GitHub Secrets

You must configure these secrets in your GitHub repository settings (Settings → Secrets and variables → Actions):

| Secret Name | Description | Example Value |
|-------------|-------------|---------------|
| `DOCKERHUB_USERNAME` | Your DockerHub username | `johndoe` |
| `DOCKERHUB_TOKEN` | DockerHub access token (not password!) | `dckr_pat_xxx...` |

### How to Create DockerHub Access Token:
1. Log into DockerHub
2. Go to Account Settings → Security
3. Click "New Access Token"
4. Give it a name (e.g., "GitHub Actions")
5. Copy the token (you won't see it again!)
6. Add it to GitHub secrets as `DOCKERHUB_TOKEN`

## Environment Variables

The application requires the following environment variables at runtime:

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `NODE_MAILER_HOST` | SMTP server hostname | Yes | `smtp.gmail.com` |
| `NODE_MAILER_PORT` | SMTP server port | Yes | `465` |
| `NODE_MAILER_USER` | Email account username | Yes | `your-email@gmail.com` |
| `NODE_MAILER_PASS` | Email account password/app password | Yes | `your-app-password` |
| `NODE_ENV` | Node environment | Auto-set | `production` |

### Environment Variable Setup

1. **For local development**: Copy `.env.example` to `.env` and fill in your values
   ```bash
   cp .env.example .env
   # Edit .env with your actual values
   ```

2. **For Docker deployment**: Pass environment variables when running the container
   ```bash
   docker run -d \
     -p 3000:3000 \
     -e NODE_MAILER_HOST=smtp.gmail.com \
     -e NODE_MAILER_PORT=465 \
     -e NODE_MAILER_USER=your-email@gmail.com \
     -e NODE_MAILER_PASS=your-app-password \
     your-dockerhub-username/euaell.github.io:latest
   ```

3. **For production servers**: Use environment variable management tools like:
   - Docker Compose with `.env` files
   - Kubernetes secrets
   - Cloud provider secret managers (AWS Secrets Manager, etc.)

### Gmail Configuration
If using Gmail for NodeMailer:
1. Enable 2-factor authentication on your Google account
2. Generate an app-specific password at https://myaccount.google.com/apppasswords
3. Use the app-specific password in `NODE_MAILER_PASS`

## Docker Image

### Image Location
The image is pushed to: `<your-dockerhub-username>/euaell.github.io:latest`

### Multi-Stage Build
The Dockerfile uses a 3-stage build for optimization:
1. **deps**: Installs dependencies using Yarn
2. **builder**: Builds the Next.js application
3. **runner**: Creates minimal production image (only runtime files)

### Build Details
- Base image: `node:lts-alpine`
- Package manager: Yarn (via corepack)
- Build output: Next.js standalone
- Exposed port: 3000

## Running the Application

### Pull from DockerHub
```bash
docker pull your-dockerhub-username/euaell.github.io:latest
```

### Run the Container
```bash
docker run -d \
  --name portfolio \
  -p 3000:3000 \
  --restart unless-stopped \
  -e NODE_MAILER_HOST=smtp.gmail.com \
  -e NODE_MAILER_PORT=465 \
  -e NODE_MAILER_USER=your-email@gmail.com \
  -e NODE_MAILER_PASS=your-app-password \
  your-dockerhub-username/euaell.github.io:latest
```

### Using Docker Compose
Create a `docker-compose.prod.yml`:

```yaml
version: '3.8'

services:
  portfolio:
    image: your-dockerhub-username/euaell.github.io:latest
    container_name: portfolio
    ports:
      - "3000:3000"
    environment:
      - NODE_MAILER_HOST=${NODE_MAILER_HOST}
      - NODE_MAILER_PORT=${NODE_MAILER_PORT}
      - NODE_MAILER_USER=${NODE_MAILER_USER}
      - NODE_MAILER_PASS=${NODE_MAILER_PASS}
    restart: unless-stopped
```

Then run:
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## Local Development

### Using Docker
```bash
# Build and run development container
npm run docker:dev
```

### Without Docker
```bash
# Install dependencies
yarn install

# Run development server
yarn dev

# Build for production
yarn build

# Start production server
yarn start
```

## Troubleshooting

### Build Fails in GitHub Actions
- Check that DOCKERHUB_USERNAME and DOCKERHUB_TOKEN secrets are set correctly
- Verify the DockerHub token has write permissions
- Check GitHub Actions logs for specific error messages

### Container Starts But Email Doesn't Work
- Verify environment variables are passed correctly to the container
- Check email credentials are valid
- For Gmail, ensure app-specific password is used (not regular password)
- Check container logs: `docker logs <container-name>`

### Port 3000 Already in Use
- Stop the conflicting service or use a different port:
  ```bash
  docker run -p 8080:3000 ...  # Maps host port 8080 to container port 3000
  ```

## Deployment Workflow

1. **Development**: Make changes locally and test
2. **Commit**: Commit changes to a feature branch
3. **Pull Request**: Create PR and review changes
4. **Merge**: Merge PR to `main` branch
5. **Automatic Build**: GitHub Actions automatically builds and pushes to DockerHub
6. **Deploy**: Pull the latest image on your production server and restart containers

## Security Notes

- Never commit `.env` file (it's already in `.gitignore`)
- Use app-specific passwords, never your main account password
- Rotate DockerHub tokens periodically
- Keep the `NODE_MAILER_PASS` secret secure
- Consider using secrets management tools for production

## Monitoring

Monitor your deployment:
- Check GitHub Actions status in the "Actions" tab
- View DockerHub for successful image pushes
- Monitor application logs: `docker logs -f <container-name>`
- Set up health checks in your production environment

## Additional Resources

- [Next.js Docker Documentation](https://nextjs.org/docs/deployment#docker-image)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [DockerHub Documentation](https://docs.docker.com/docker-hub/)
