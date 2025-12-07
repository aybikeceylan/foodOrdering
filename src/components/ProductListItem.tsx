import Colors from "@/constants/Colors";
import { Product } from "@/types/Products";
import { Link } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function ProductListItem({ product }: { product: Product }) {
  return (
    <Link href={`/menu/${product.id}`} asChild>
      <Pressable style={styles.productContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.image }}
            style={styles.productImage}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>{product.price}</Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  productContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    width: "100%",

    borderRadius: 8,
    overflow: "hidden",
  },
  productImage: {
    aspectRatio: 1,
    resizeMode: "cover",
    borderRadius: 8,
    overflow: "hidden",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.light.tint,
  },
  description: {
    fontSize: 16,
    fontWeight: "normal",
  },
});
