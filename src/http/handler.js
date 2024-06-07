import { addProduct, deleteProduct, editProduct, getProducts } from '../data/supabase.js';

async function getProductsHandler() {
  const products = await getProducts();

  return {
    status: 'success',
    data: {
      products: products
    }
  };
}

async function postProductHandler(request, h) {
  const productId = await addProduct(request.payload);

  return h.response({
    status: 'success',
    data: {
      productId,
    }
  }).code(201);
}

async function putProductHandler(request, h) {
  const { id } = request.params;
  const { name, price } = request.payload;
  const newProduct = { id, name, price };

  try {
    await editProduct(newProduct);

    return {
      status: 'success',
      data: {}
    };
  } catch {
    return h.response({
      status: 'fail',
      message: 'product is not found',
    }).code(404);
  }
}

async function deleteProductHandler(request) {
  const { id } = request.params;

  await deleteProduct(id);

  return {
    status: 'success',
    data: {}
  };
}

export { getProductsHandler, postProductHandler, putProductHandler, deleteProductHandler };
