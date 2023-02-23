export interface Error {
  statusCode: number;
  error: string;
  message: string;
}

export interface Normal<T = unknown> {
  statusCode: number;
  data: T;
  message: string;
}
