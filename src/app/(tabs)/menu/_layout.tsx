import Colors from "@/constants/Colors";
import { useCart } from "@/providers/CartProvider";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Stack } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const CartIconWithBadge = () => {
  const { cart } = useCart();
  const cartCount = cart.length;

  return (
    <Link href="/cart" asChild>
      <Pressable>
        {({ pressed }) => (
          <View style={styles.iconContainer}>
            <FontAwesome
              name="shopping-cart"
              size={25}
              color={Colors.light.text}
              style={{
                margin: 5,
                opacity: pressed ? 0.5 : 1,
              }}
            />
            {cartCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {cartCount > 99 ? "99+" : cartCount}
                </Text>
              </View>
            )}
          </View>
        )}
      </Pressable>
    </Link>
  );
};

const MenuStack = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        title: "Menu",
        headerRight: () => <CartIconWithBadge />,
      }}
    />
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#FF3B30",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 6,
    borderWidth: 2,
    borderColor: "#fff",
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default MenuStack;
