# Deployment

The site is an Astro app (Node adapter, standalone mode) built and run with Bun inside Docker.

## Pipeline

- **Pull requests** run [`ci.yml`](../.github/workflows/ci.yml): type check (`astro check`) and a production build.
- **Pushes to `main`** run [`docker-deploy.yml`](../.github/workflows/docker-deploy.yml), which builds the
  [Dockerfile](../Dockerfile) and pushes `<DOCKERHUB_USERNAME>/euaell.github.io` tagged `latest` and the commit SHA.
  It can also be started manually (`workflow_dispatch`).

Required repository secrets (Settings → Secrets and variables → Actions):

| Secret               | Description                              |
| -------------------- | ---------------------------------------- |
| `DOCKERHUB_USERNAME` | DockerHub username                       |
| `DOCKERHUB_TOKEN`    | DockerHub access token with write access |

## Runtime environment

The contact form endpoint (`/api/contact`) sends mail through SMTP and reads these at runtime:

| Variable           | Description                     | Default          |
| ------------------ | ------------------------------- | ---------------- |
| `NODE_MAILER_HOST` | SMTP host                       | `smtp.gmail.com` |
| `NODE_MAILER_PORT` | SMTP port (465 uses TLS)        | `465`            |
| `NODE_MAILER_USER` | SMTP user, also the inbox       | —                |
| `NODE_MAILER_PASS` | SMTP password or app password   | —                |

For Gmail, enable 2-factor authentication and use an
[app password](https://myaccount.google.com/apppasswords) for `NODE_MAILER_PASS`.

## Running the image

The container listens on port `4321`.

```bash
docker run -d \
  --name portfolio \
  --restart unless-stopped \
  -p 4321:4321 \
  -e NODE_MAILER_USER=you@gmail.com \
  -e NODE_MAILER_PASS=your-app-password \
  <DOCKERHUB_USERNAME>/euaell.github.io:latest
```

To deploy a new version, pull the latest image on the server and recreate the container.

## Troubleshooting

- **Image push fails:** check both secrets are set and the token can write to the repository.
- **Contact form returns 503:** the SMTP connection failed; check the `NODE_MAILER_*` values and `docker logs portfolio`.
