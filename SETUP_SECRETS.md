# Quick Setup Guide: GitHub Secrets

Before the deployment workflow can run successfully, you need to configure these secrets in your GitHub repository.

## Steps to Add Secrets

1. Go to your GitHub repository
2. Click on **Settings** (top menu)
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret**
5. Add each secret listed below

## Required Secrets

### 1. DOCKERHUB_USERNAME
- **Description**: Your DockerHub username
- **How to get it**: Your DockerHub account username (not email)
- **Example**: `johndoe` (if your DockerHub profile is https://hub.docker.com/u/johndoe)

### 2. DOCKERHUB_TOKEN
- **Description**: DockerHub personal access token
- **How to create it**:
  1. Log into [DockerHub](https://hub.docker.com)
  2. Click on your username (top right) → **Account Settings**
  3. Go to **Security** tab
  4. Click **New Access Token**
  5. Give it a name like `GitHub Actions Portfolio Deploy`
  6. Set permissions to **Read, Write, Delete** (or at minimum **Read, Write**)
  7. Click **Generate**
  8. **IMPORTANT**: Copy the token immediately (you won't see it again!)
  9. Paste this token as the secret value in GitHub

## Verification

After adding these secrets, you can verify the setup:

1. Go to the **Actions** tab in your GitHub repository
2. You should see the workflow listed: "Build and Push Docker Image to DockerHub"
3. Trigger a test run:
   - Click on the workflow name
   - Click **Run workflow** → **Run workflow**
   - Wait for it to complete (usually 3-5 minutes)
4. If successful, your image will be available at: `https://hub.docker.com/r/<your-username>/euaell.github.io`

## Troubleshooting

### "Error: Cannot perform an interactive login from a non TTY device"
- This means `DOCKERHUB_TOKEN` is not set or is incorrect
- Verify the secret name is exactly `DOCKERHUB_TOKEN` (case-sensitive)

### "Error: denied: requested access to the resource is denied"
- The token doesn't have write permissions
- Create a new token with **Read, Write** permissions
- Update the `DOCKERHUB_TOKEN` secret with the new token

### "Error: repository does not exist"
- The workflow will automatically create the repository on DockerHub on first push
- Make sure your DockerHub username is correct in the secret

## Next Steps

After secrets are configured and the workflow runs successfully:

1. Pull your image from DockerHub:
   ```bash
   docker pull <your-dockerhub-username>/euaell.github.io:latest
   ```

2. Run the container (see [DEPLOYMENT.md](DEPLOYMENT.md) for full details):
   ```bash
   docker run -d \
     -p 3000:3000 \
     -e NODE_MAILER_HOST=smtp.gmail.com \
     -e NODE_MAILER_PORT=465 \
     -e NODE_MAILER_USER=your-email@gmail.com \
     -e NODE_MAILER_PASS=your-app-password \
     <your-dockerhub-username>/euaell.github.io:latest
   ```

3. Access your application at http://localhost:3000

For complete deployment documentation, see [DEPLOYMENT.md](DEPLOYMENT.md).
