import { MiddlewareError } from '../../error/middleware-error';
import { MiddlewareStrategy } from '../middleware-strategy';

export class ZendeskAuthStrategy implements MiddlewareStrategy {
  execute(req: any): void
  {
    throw new MiddlewareError('Zendesk: Unnauthorized', 401);
  }
}
