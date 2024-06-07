import { describe } from 'vitest';
import { addProduct, deleteProduct, editProduct, getProducts } from './local.js';
import { itActLikeDataSource } from './_test/index.js';

describe('local data', () => {
  itActLikeDataSource({ addProduct, deleteProduct, editProduct, getProducts });
});
