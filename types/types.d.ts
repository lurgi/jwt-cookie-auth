declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_JWT_SECRET: string;
    }
  }
}

export {};
