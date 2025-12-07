import { FlatList, View } from "react-native";

import ProductListItem from "@/components/ProductListItem";
import products from "@/data/products";

export default function TabOneScreen() {
  return (
    <FlatList
      data={products}
      renderItem={({ item }) => <ProductListItem product={item} />}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      columnWrapperStyle={{ gap: 10 }}
      contentContainerStyle={{ padding: 10, gap: 10 }}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={() => <View style={{ height: 100 }} />}
    />
  );
}
