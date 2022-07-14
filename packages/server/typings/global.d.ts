declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    MONGO_INITDB_ROOT_USERNAME: string;
    MONGO_INITDB_ROOT_PASSWORD: string;
    MONGO_INITDB_ROOT_PORT: string;
    SUPER_ACCOUNT?: string;
    SUPER_ACCOUNT_PASSWORD?: string;
    EMAIL_AUTHORIZATION_CODE: string;
    MAILBOX: string;
  }
}
