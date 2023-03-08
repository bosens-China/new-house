declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      MONGO_INITDB_ROOT_USERNAME: string;
      MONGO_INITDB_ROOT_PASSWORD: string;
      MONGO_INITDB_ROOT_PORT: string;
      MONGO_URL?: string;
      // 邮箱相关
      EMAIL_ACCOUNT: string;
      EMAIL_AUTHORIZATION_CODE: string;

      // 代理池1
      PROXY_PROXY_POOL: string;
      // 代理池2
      PROXY_IPPROXYPOOL: string;

      // server部分
      PORT: string;
    }
  }
}

export {};
