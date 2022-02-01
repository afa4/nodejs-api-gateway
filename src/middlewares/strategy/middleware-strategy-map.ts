import { Map } from '../../shared/map';
import { PetsAuthStrategy } from './impl/pets-auth-strategy';
import { ClientsAuthStrategy } from './impl/clients-auth-strategy';
import { MiddlewareStrategy } from './middleware-strategy';

const middlewareStrategyMap: Map<MiddlewareStrategy> = {
  "CLIENTS_AUTHORIZATION": new ClientsAuthStrategy(),
  "PETS_AUTHORIZATION": new PetsAuthStrategy()
};

export default middlewareStrategyMap;
