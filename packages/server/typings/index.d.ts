import { Context } from 'koa';

declare module 'koa' {
  interface DefaultContext {
    success: (body: any) => void;
    error: (err: Error | string, code?: number) => void;
  }
}
