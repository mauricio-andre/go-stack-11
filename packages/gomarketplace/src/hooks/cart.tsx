import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

interface Product {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  quantity: number;
}

interface CartContext {
  products: Product[];
  addToCart(item: Omit<Product, 'quantity'>): void;
  increment(id: string): void;
  decrement(id: string): void;
}

const CartContext = createContext<CartContext | null>(null);

const CartProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      const productsString = await AsyncStorage.getItem(
        '@GoMarketplace:produtos',
      );

      if (productsString) {
        setProducts(JSON.parse(productsString));
      }
    }

    loadProducts();
  }, []);

  const updateProducts = useCallback(async newProducts => {
    setProducts(newProducts);
    await AsyncStorage.setItem(
      '@GoMarketplace:produtos',
      JSON.stringify(newProducts),
    );
  }, []);

  const increment = useCallback(
    async id => {
      const productIndex = products.findIndex(product => product.id === id);
      const newProducts = [...products];
      newProducts[productIndex].quantity += 1;
      updateProducts(newProducts);
    },
    [products, updateProducts],
  );

  const decrement = useCallback(
    async id => {
      const productIndex = products.findIndex(product => product.id === id);
      const newProducts = [...products];
      newProducts[productIndex].quantity -= 1;

      if (newProducts[productIndex].quantity <= 0) {
        newProducts.splice(productIndex, 1);
      }

      updateProducts(newProducts);
    },
    [products, updateProducts],
  );

  const addToCart = useCallback(
    async (newProduct: Product) => {
      const productIndex = products.findIndex(
        product => product.id === newProduct.id,
      );

      if (productIndex < 0) {
        updateProducts([...products, { ...newProduct, quantity: 1 }]);
        return;
      }

      increment(newProduct.id);
    },
    [products, increment, updateProducts],
  );

  const value = React.useMemo(
    () => ({ addToCart, increment, decrement, products }),

    [products, addToCart, increment, decrement],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

function useCart(): CartContext {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(`useCart must be used within a CartProvider`);
  }

  return context;
}

export { CartProvider, useCart };
