import { describe, expect, it } from 'vitest';

export function itActLikeDataSource({ addProduct, getProducts, editProduct, deleteProduct }) {
  describe('addProduct function', () => {
    it('should add product correctly', async () => {
      // Arrange
      const product = { name: 'Galaxy S21FE', price: 8_500 };

      // Action
      const id = await addProduct(product);

      // Assert
      const products = await getProducts();
      expect(typeof id).toEqual('string');
      expect(products.length).toEqual(1);

      // Cleanup
      deleteProduct(id);
    });
  });

  describe('getProducts function', () => {
    it('should return an empty array when product is empty', async () => {
      // Action
      const products = await getProducts();

      // Assert
      expect(products).toEqual([]);
    });

    it('should return a products correctly', async () => {
      // Arrange
      const product1Id = await addProduct({ name: 'A', price: 8_500 });
      const product2Id = await addProduct({ name: 'B', price: 9_500 });
      const product3Id = await addProduct({ name: 'C', price: 10_500 });

      // Action
      const products = await getProducts();

      // Assert
      expect(products.length).toEqual(3);
      expect(products.find((p) => p.id === product1Id)).toBeDefined();
      expect(products.find((p) => p.id === product2Id)).toBeDefined();
      expect(products.find((p) => p.id === product3Id)).toBeDefined();

      products.forEach((p) => {
        expect(p.name).toBeDefined();
        expect(p.price).toBeDefined();
      });

      // Cleanup
      await deleteProduct(product1Id);
      await deleteProduct(product2Id);
      await deleteProduct(product3Id);
    });
  });

  describe('editProduct function', () => {
    it('should throw an error when product is not found', async () => {
      // Arrange
      const newProduct = {
        id: 'product-123',
        name: 'Galaxy S21FE',
        price: 8_500,
      };

      // Action & Assert
      await expect(editProduct(newProduct)).rejects.toThrow();
    });

    it('should edit product correctly', async () => {
      // Arrange
      const prevProductId = await addProduct({ name: 'Galaxy S21FE', price: 8_500 });
      const newProduct = {
        id: prevProductId,
        name: 'Galaxy S21FE Baru',
        price: 9_500,
      };

      // Action
      await editProduct(newProduct);

      // Assert
      const products = await getProducts();
      const product = products.find((p) => p.id === prevProductId);
      expect(product.id).toEqual(prevProductId);
      expect(product.name).toEqual('Galaxy S21FE Baru');
      expect(product.price).toEqual(9_500);

      // Clean up
      await deleteProduct(prevProductId);
    });
  });

  describe('deleteProduct function', () => {
    it('should not throw error when product is not found', async () => {
      // Action
      await expect(deleteProduct('product-123')).resolves.not.toThrow();
    });

    it('should delete product correctly', async () => {
      // Arrange
      const productId = await addProduct({ name: 'Galaxy S21FE', price: 8_500 });

      // Action
      await deleteProduct(productId);

      // Assert
      const products = await getProducts();
      expect(products).toEqual([]);
    });
  });
}
