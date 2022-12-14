/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_ENV_CHECK_STRING: string;
  readonly VITE_RESAS_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
