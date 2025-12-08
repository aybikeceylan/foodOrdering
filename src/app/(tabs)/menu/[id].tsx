import Button from "@/components/Button";
import Colors from "@/constants/Colors";
import products from "@/data/products";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams();
  const product = products.find((product) => product.id === Number(id));
  const sizes = ["S", "M", "L", "XL"];
  const [selectedSize, setSelectedSize] = useState<string>("S");
  if (!product) {
    return <Text>Product not found</Text>;
  }
  return (
    <View>
      <Stack.Screen options={{ title: product?.name }} />
      <View style={styles.imageContainer}>
        <Image source={{ uri: product?.image }} style={styles.image} />
      </View>
      <View style={styles.sizeSection}>
        <Text style={styles.sizeLabel}>Select size</Text>
        <View style={styles.sizeContainer}>
          {sizes.map((size) => (
            <Pressable
              key={size}
              style={[
                styles.sizeButton,
                selectedSize === size && styles.sizeButtonSelected,
              ]}
              onPress={() => setSelectedSize(size)}
            >
              <Text
                style={[
                  styles.sizeText,
                  selectedSize === size && styles.sizeTextSelected,
                ]}
              >
                {size}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{product?.name}</Text>
        <Text style={styles.description}>{product?.description}</Text>
        <Text style={styles.price}>{product?.price}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={() => {}}>Add to Cart</Button>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  imageContainer: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    overflow: "hidden",
    padding: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 10,
  },
  infoContainer: {
    padding: 10,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.light.tint,
  },
  buttonContainer: {
    padding: 10,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  sizeSection: {
    padding: 10,
  },
  sizeLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  sizeContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  sizeButton: {
    backgroundColor: "#E0E0E0",
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  sizeButtonSelected: {
    backgroundColor: Colors.light.tint,
  },
  sizeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  sizeTextSelected: {
    color: "#fff",
  },
});
