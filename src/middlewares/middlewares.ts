import server from '../server/server';
import { requestToMiddlewareMap } from '../hosts/hosts';
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

function registerMiddlewareErrorHandler() {
  server.use((err: any, req: any, res: any, next: any) => {
    res.status(err.statusCode ?? 500);
    res.json({ error: err.message });
  });
}

export { registerMiddlewares, registerMiddlewareErrorHandler };
