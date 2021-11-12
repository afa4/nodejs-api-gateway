import server from '../server/server';
import { requestToMiddlewareMap } from '../hosts/hosts';
import { HttpError } from './error/http.error';

function registerMiddlewares() {
  server.use((req, res, next) => {
    const requestKey = `${req.method}:${req.path}`;
    const middleware = requestToMiddlewareMap[requestKey];

    if(middleware) {
      try {
        processMiddleware(req, middleware);
        next();
      } catch(error) {
        if(error instanceof HttpError) {
          res.statusCode = error.statusCode;
        } else {
          throw error;
        }
      }
    } else {
      next();
    }
  });
}

function processMiddleware(req: any, middleware: string) {
  if(middleware == 'ZENDESK_AUTHORIZATION') {
    throw new HttpError("Unnauthorized", 401);
  }
}

export { registerMiddlewares };