import { createClient } from '@supabase/supabase-js';
import { config, generateId } from '../utils/index.js';

const supabase = createClient(config.supabase.project, config.supabase.anonKey);

async function addProduct({ name, price }) {
  const id = generateId('product');
  const product = { id, name, price };

  const { error } = await supabase.from('products').insert(product);

  if (error) throw error;

  return id;
}

async function getProducts() {
  const { data, error } = await supabase.from('products').select();

  if (error) throw error;

  return data;
}

async function editProduct({ id, name, price }) {
  const {  data } = await supabase
    .from('products')
    .select()
    .eq('id', id);

  const [product] = data;

  if (!product) {
    throw new Error('product is not found');
  }

  const { error } = await supabase
    .from('products')
    .update({ name, price })
    .eq('id', id);

  if (error) throw error;
}

async function deleteProduct(id) {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

export { addProduct, getProducts, editProduct, deleteProduct };
