export interface MiddlewareStrategy {
  // include method param: Request (express)
  execute(req: any): void;
}