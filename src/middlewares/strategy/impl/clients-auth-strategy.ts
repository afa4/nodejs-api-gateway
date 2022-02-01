import { MiddlewareError } from '../../error/middleware-error';
import { MiddlewareStrategy } from '../middleware-strategy';

export class ClientsAuthStrategy implements MiddlewareStrategy {
  execute(req: any): void
  {
    throw new MiddlewareError('Clients: Unnauthorized', 401);
  }
}
