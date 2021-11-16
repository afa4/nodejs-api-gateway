import { hosts, Host } from '../hosts/hosts';
import server from '../server/server';
import proxy from 'express-http-proxy';
import { Map } from '../shared/map'
import { RequestHandler } from 'express';

function registerRoutes() {
  const proxies = createProxies(hosts);

  hosts.forEach(host => {
    host.routes.forEach(route => {
      const method = route.method.toLowerCase();
      registerEndpoint(method, host.url, route.path);
    })
  });

  function registerEndpoint(method: string, url: string, path: string) {
    (server as any)[method](path, (req: any, res: any, next: any) => proxies[url](req, res, next)); // https://expressjs.com/en/4x/api.html#app.METHOD
  }
}

function createProxies(hosts: Host[]): Map<RequestHandler> {
  const proxies: Map<RequestHandler> = {};
  
  hosts
    .map((host) => host.url)
    .forEach((url) => proxies[url] = proxy(url));

  return proxies;
}

export { registerRoutes };
