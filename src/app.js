import { createServer } from './http/server.js';

(async () => {
  const server = createServer();
  await server.start();
  console.log(`server start at ${server.info.uri}`);
})();
