import { StyleSheet, Text, View, Image, Button } from "react-native";
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
      <Text>{"\n"}</Text>
      {/* create button */}
      <Button
        title="Create"
        color={"#FF1CC0"}
        //   onPress={handleCreate}
      ></Button>
      <Text>{"\n"}</Text>
      {/* logout button */}
      <Button
        title="Logout"
        color={"#6c80ff"}
        //   onPress={handleLogout}
      ></Button>
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
