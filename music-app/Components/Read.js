import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import logo from "./logo.png";

export default function Read() {
  return (
    <View style={styles.container}>
      {/* logo */}
      <Image style={styles.logo} source={require("./logo.png")} />
      <Text>{"\n"}</Text>
      <Text>HEYYYY!</Text>
      {/* list -- scrolling feature */}
      {/* create button */}
      {/* logout button */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",
    padding: 16,
  },
  logo: {
    width: 160,
    height: 82,
  },
});
