import { StyleSheet, Text, View } from "react-native";
import Read from "./Components/Read";
// import Individual from "./Components/Individual";

export default function App() {
  return (
    <View style={styles.container}>
      <Read />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#17222c",
    alignItems: "center",
    // justifyContent: "center",
  },
});
