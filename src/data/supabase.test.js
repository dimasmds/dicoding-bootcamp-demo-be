import { describe } from 'vitest';
import { addProduct, deleteProduct, editProduct, getProducts } from './supabase.js';
import { itActLikeDataSource } from './_test/index.js';

describe('supabase data', () => {
  itActLikeDataSource({ addProduct, deleteProduct, editProduct, getProducts });
});
