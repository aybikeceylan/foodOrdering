import { Product } from "@/types/Products";
import { createContext, useContext, useMemo, useState } from "react";

export type CartItem = {
  product: Product;
  quantity: number;
  size: string;
};

const CartContext = createContext<{
  cart: CartItem[];
  addToCart: (product: Product, size: string) => void;
  removeFromCart: (productId: number, size: string) => void;
  updateQuantity: (productId: number, size: string, quantity: number) => void;
  clearCart: () => void;
}>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
});

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product, size: string) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product.id === product.id && item.size === size
      );
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1, size }];
    });
  };

  const removeFromCart = (productId: number, size: string) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(item.product.id === productId && item.size === size)
      )
    );
  };

  const updateQuantity = (
    productId: number,
    size: string,
    quantity: number
  ) => {
    if (quantity <= 0) {
      setCart((prevCart) =>
        prevCart.filter(
          (item) => !(item.product.id === productId && item.size === size)
        )
      );
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId && item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const value = useMemo(
    () => ({ cart, addToCart, removeFromCart, updateQuantity, clearCart }),
    [cart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
export const useCart = () => {
  return useContext(CartContext);
};
