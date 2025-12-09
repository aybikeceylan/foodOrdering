import Button from "@/components/Button";
import CartItem from "@/components/CartItem";
import Colors from "@/constants/Colors";
import { useCart } from "@/providers/CartProvider";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { FlatList, Platform, StyleSheet, Text, View } from "react-native";

const Cart = () => {
  const { cart, clearCart } = useCart();

  const total = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Cart" }} />
      {cart.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your cart is empty</Text>
          <Text style={styles.emptySubtext}>
            Add some delicious items to get started!
          </Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cart}
            renderItem={({ item }) => <CartItem cartItem={item} />}
            keyExtractor={(item) => `${item.product.id}-${item.size}`}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
          <View style={styles.footer}>
            <View style={styles.summaryContainer}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Items:</Text>
                <Text style={styles.summaryValue}>{totalItems}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal:</Text>
                <Text style={styles.summaryValue}>${total.toFixed(2)}</Text>
              </View>
              <View style={[styles.summaryRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>Total:</Text>
                <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <Button onPress={clearCart}>
                <Text style={styles.clearButtonText}>Clear Cart</Text>
              </Button>
            </View>
          </View>
        </>
      )}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  listContent: {
    paddingTop: 16,
    paddingBottom: 200,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#212121",
    marginBottom: 8,
    textAlign: "center",
  },
  emptySubtext: {
    fontSize: 16,
    color: "#757575",
    textAlign: "center",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },
  summaryContainer: {
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: "#757575",
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#212121",
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  totalLabel: {
    fontSize: 20,
    fontWeight: "700",
    color: "#212121",
  },
  totalValue: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.light.tint,
  },
  buttonContainer: {
    marginTop: 8,
  },
  clearButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Cart;
