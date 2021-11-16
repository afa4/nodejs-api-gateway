import server from '../server/server';
import { requestToMiddlewareMap } from '../hosts/hosts';
import { HttpError } from './error/http.error';
import middlewareStrategyMap from './strategy/middleware-strategy-map';

function registerMiddlewares() {
  server.use((req, res, next) => {
    const requestKey = `${req.method}:${req.path}`;
    const middleware = requestToMiddlewareMap[requestKey];

    if(middleware) {
      try {
        middlewareStrategyMap[middleware]?.execute(req);
        next();
      } catch(error) {
        next(error);
      }
    } else {
      next();
    }
  });
}

export { registerMiddlewares };