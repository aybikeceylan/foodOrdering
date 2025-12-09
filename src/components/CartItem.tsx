import Colors from "@/constants/Colors";
import { CartItem as CartItemType, useCart } from "@/providers/CartProvider";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const CartItem = ({ cartItem }: { cartItem: CartItemType }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity, size } = cartItem;

  const handleIncrease = () => {
    updateQuantity(product.id, size, quantity + 1);
  };

  const handleDecrease = () => {
    updateQuantity(product.id, size, quantity - 1);
  };

  const totalPrice = (product.price * quantity).toFixed(2);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.image }}
          style={styles.productImage}
          resizeMode="cover"
        />
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.nameRow}>
          <Text style={styles.productName} numberOfLines={2}>
            {product.name}
          </Text>
          <View style={styles.sizeBadge}>
            <Text style={styles.sizeText}>{size}</Text>
          </View>
        </View>
        <Text style={styles.productDescription} numberOfLines={2}>
          {product.description}
        </Text>
        <View style={styles.priceRow}>
          <Text style={styles.unitPrice}>${product.price.toFixed(2)}</Text>
          <Text style={styles.totalPrice}>${totalPrice}</Text>
        </View>
      </View>

      <View style={styles.actionsContainer}>
        <View style={styles.quantityContainer}>
          <Pressable
            style={styles.quantityButton}
            onPress={handleDecrease}
            android_ripple={{ color: "#e0e0e0" }}
          >
            <Ionicons name="remove" size={18} color={Colors.light.tint} />
          </Pressable>
          <Text style={styles.quantityText}>{quantity}</Text>
          <Pressable
            style={styles.quantityButton}
            onPress={handleIncrease}
            android_ripple={{ color: "#e0e0e0" }}
          >
            <Ionicons name="add" size={18} color={Colors.light.tint} />
          </Pressable>
        </View>

        <Pressable
          style={styles.removeButton}
          onPress={() => removeFromCart(product.id, size)}
          android_ripple={{ color: "#ffebee" }}
        >
          <Ionicons name="trash-outline" size={20} color="#d32f2f" />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#f5f5f5",
    marginRight: 12,
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
    gap: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#212121",
    flex: 1,
  },
  sizeBadge: {
    backgroundColor: Colors.light.tint,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 32,
    alignItems: "center",
  },
  sizeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "white",
  },
  productDescription: {
    fontSize: 13,
    color: "#757575",
    marginBottom: 8,
    lineHeight: 18,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  unitPrice: {
    fontSize: 13,
    color: "#757575",
    textDecorationLine: "line-through",
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.light.tint,
  },
  actionsContainer: {
    alignItems: "flex-end",
    gap: 8,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#212121",
    minWidth: 30,
    textAlign: "center",
  },
  removeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ffebee",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CartItem;
