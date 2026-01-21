/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly NODE_MAILER_HOST: string;
  readonly NODE_MAILER_PORT: string;
  readonly NODE_MAILER_USER: string;
  readonly NODE_MAILER_PASS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
