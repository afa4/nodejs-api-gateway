import { registerMiddlewareErrorHandler, registerMiddlewares } from './middlewares/middlewares';
import { registerRoutes } from './routes/routes';
import server from './server/server';

const port = 8080;

registerMiddlewares();
registerRoutes();
registerMiddlewareErrorHandler();

server.listen(port, () => console.log(`Example app listening on port ${port}!`));
