export interface MiddlewareStrategy {
  execute(req: any): void;
}
