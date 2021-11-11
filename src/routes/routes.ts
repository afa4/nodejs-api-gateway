import { loadHosts, Host, Route } from '../hosts/hosts';
import server from '../server/server';
import httpProxy from 'express-http-proxy';


const hosts = loadHosts();
const proxies = createProxies(hosts);

function createProxies(hosts: Host[]): any {
  const proxies: any = {};
  
  hosts
    .map((host) => host.url)
    .forEach((url) => proxies[url] = httpProxy(url));

  return proxies;
}

function addAppEndpoint(host: string, route: Route) {
  const method = route.method.toLowerCase();
  (server as any)[method](route.path, (req: any, res: any, next: any) => proxies[host](req,res,next));
  // https://expressjs.com/en/4x/api.html#app.METHOD
}

function registerRoutes() {
  hosts.forEach(host => {
    host.routes.forEach(route => addAppEndpoint(host.url, route))
  });
}

export { registerRoutes };