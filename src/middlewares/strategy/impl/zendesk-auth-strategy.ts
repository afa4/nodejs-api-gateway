import { HttpError } from '../../error/http.error';
import { MiddlewareStrategy } from '../middleware-strategy';

export class ZendeskAuthStrategy implements MiddlewareStrategy {
  execute(req: any): void
  {
    throw new HttpError('Method not implemented.', 401);
  }
  
}