import { Map } from '../../shared/map';
import { ZendeskAuthStrategy } from './impl/zendesk-auth-strategy';
import { MiddlewareStrategy } from './middleware-strategy';

class MiddlewareStrategyMap {
  [key: string]: MiddlewareStrategy;
}

const middlewareStrategyMap = {
  "ZENDESK_AUTHORIZATION": new ZendeskAuthStrategy()
} as MiddlewareStrategyMap;

export default middlewareStrategyMap;