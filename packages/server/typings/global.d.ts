declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    MONGO_INITDB_ROOT_USERNAME: string;
    MONGO_INITDB_ROOT_PASSWORD: string;
    MONGO_INITDB_ROOT_PORT: string;
  }
}
