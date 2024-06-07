import { generateId } from '../utils/index.js';

let products = [];

async function addProduct({ name, price }) {
  const id = generateId('product');
  const product = { id, name, price };

  products = [...products, product];

  return id;
}

async function getProducts() {
  return products;
}

async function editProduct({ id, name, price }) {
  const product = products.find(({ id }) => id === id);

  if (!product) {
    throw new Error(`Product ${id} not found`);
  }

  const newProduct = {
    id, name, price
  };

  products = products.map((p) => p.id === id ? newProduct : p);
}

async function deleteProduct(id) {
  products = products.filter((p) => p.id !== id);
}

export { addProduct, getProducts, editProduct, deleteProduct };
