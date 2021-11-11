import * as fs from 'fs';

interface Host {
  url: string;
  routes: Route[];
}

interface Route {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  path: string;
  middlewares?: string[];
}

function loadHosts(): Host[] {
  const resourcesString = fs.readFileSync('resources.json', 'utf8');
  return JSON.parse(resourcesString);
}
 
export { Host, Route, loadHosts };