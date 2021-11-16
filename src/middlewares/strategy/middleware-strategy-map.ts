import { Map } from '../../shared/map';
import { LoftAuthStrategy } from './impl/loft-auth-strategy';
import { ZendeskAuthStrategy } from './impl/zendesk-auth-strategy';
import { MiddlewareStrategy } from './middleware-strategy';

const middlewareStrategyMap: Map<MiddlewareStrategy> = {
  "ZENDESK_AUTHORIZATION": new ZendeskAuthStrategy(),
  "LOFT_AUTHORIZATION": new LoftAuthStrategy()
};

export default middlewareStrategyMap;
