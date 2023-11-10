import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Register from "./Components/Register";

export default function App() {
  return (
    <View style={styles.container}>
      <Register />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#17222c",
    alignItems: "center",
    justifyContent: "center",
  },
});

// import React from "react";
// import { Text, View } from "react-native";

// const HelloWorldApp = () => {
//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Text>Hello, world!</Text>
//     </View>
//   );
// };
// export default HelloWorldApp;
