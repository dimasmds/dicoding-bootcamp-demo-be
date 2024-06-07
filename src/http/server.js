import Hapi from '@hapi/hapi';
import { deleteProductHandler, getProductsHandler, postProductHandler, putProductHandler } from './handler.js';

function createServer() {
  const server = Hapi.server({
    host: 'localhost',
    port: 5000,
  });

  server.route([
    {
      method: 'GET',
      path: '/products',
      handler: getProductsHandler,
    },
    {
      method: 'POST',
      path: '/products',
      handler: postProductHandler,
    },
    {
      method: 'PUT',
      path: '/products/{id}',
      handler: putProductHandler,
    },
    {
      method: 'DELETE',
      path: '/products/{id}',
      handler: deleteProductHandler,
    }
  ]);

  return server;
}

export { createServer };
