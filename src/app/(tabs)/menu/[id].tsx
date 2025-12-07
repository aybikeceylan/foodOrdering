import products from "@/data/products";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams();
  const product = products.find((product) => product.id === Number(id));
  if (!product) {
    return <Text>Product not found</Text>;
  }
  return (
    <View>
      <Text>ProductDetailsScreen {product?.name}</Text>
      <Text>ProductDetailsScreen {product?.description}</Text>
      <Text>ProductDetailsScreen {product?.price}</Text>
      <Text>ProductDetailsScreen {product?.image}</Text>
      <Image
        source={{ uri: product?.image }}
        style={{ width: 100, height: 100 }}
      />
    </View>
  );
}
