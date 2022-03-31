// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ts from 'typescript';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      APPLICATION_PORT: number;
      APPLICATION_URI: string;

      BCRYPT_SALT: number;
      JWT_SECRET: string;
    }
  }
}

export {};
