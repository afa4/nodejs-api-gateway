import { registerRoutes } from './routes/routes';
import server from './server/server';

const port = 8080;

registerRoutes();

server.listen(port, () => console.log(`Example app listening on port ${port}!`));
