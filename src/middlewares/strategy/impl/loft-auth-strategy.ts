import { MiddlewareError } from '../../error/middleware-error';
import { MiddlewareStrategy } from '../middleware-strategy';

export class LoftAuthStrategy implements MiddlewareStrategy {
  execute(req: any): void
  {
    throw new MiddlewareError('Loft: Unnauthorized', 401);
  }
}