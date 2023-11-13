import { StyleSheet, Text, View } from "react-native";
import Read from "./Components/Read";
import Register from "./Components/Register";
import Logout from "./Components/LogOut";
import Create from "./Components/Create";
import Login from "./Components/Login";

export default function App() {
  return (
    <View style={styles.container}>
      <Read />
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
    backgroundColor: "#17222c",
    alignItems: "center",
  },
});
