import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Register from "./Components/Register";
import Logout from "./Components/LogOut";
import Create from "./Components/Create";
import Login from "./Components/Login";

export default function App() {
  return (
    <View style={styles.container}>
      <Register />
      <Logout />
    <Create />
      <Login />
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
