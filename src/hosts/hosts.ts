import * as fs from 'fs';
import { Map } from '../shared/map';

interface Host {
  url: string;
  routes: Route[];
}

interface Route {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  path: string;
  middleware?: string;
}

function loadHosts(): Host[] {
  const resourcesString = fs.readFileSync('resources.json', 'utf8');
  const hosts: Host[] = JSON.parse(resourcesString);
  return hosts;
}

function mapRequestToMiddleware(hosts: Host[]): Map<string> {
  const requestToMiddlewareMap: Map<string> = {};
  hosts
    .flatMap((host) => host.routes)
    .forEach((route) => {
      if(route.middleware) {
        const key = `${route.method}:${route.path}`;
        requestToMiddlewareMap[key] = route.middleware
      }
    });
    return requestToMiddlewareMap;
}

const hosts = loadHosts();
const requestToMiddlewareMap = mapRequestToMiddleware(hosts);
 
export { Host, hosts, requestToMiddlewareMap };
