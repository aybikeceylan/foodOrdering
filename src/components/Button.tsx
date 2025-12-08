import Colors from "@/constants/Colors";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

const Button = ({
  children,
  onPress,
}: {
  children: React.ReactNode;
  onPress: () => void;
}) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

export default Button;
const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.light.tint,
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: "100%",
    height: 50,

    borderWidth: 1,
    borderColor: Colors.light.tint,
    margin: 10,
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
