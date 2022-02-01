import { MiddlewareError } from '../../error/middleware-error';
import { MiddlewareStrategy } from '../middleware-strategy';

export class PetsAuthStrategy implements MiddlewareStrategy {
  execute(req: any): void
  {
    throw new MiddlewareError('Pets: Unnauthorized', 401);
  }
}
