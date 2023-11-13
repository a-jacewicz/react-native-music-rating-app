import { StyleSheet, Text, View } from "react-native";
import Read from "./Components/Read";
import Register from "./Components/Register";
import Individual from "./Components/Individual";
// import Logout from "./Components/LogOut";
import Create from "./Components/Create";
import Login from "./Components/Login";
import Update from "./Components/Update";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // <View style={styles.container}>
    //   <Read />
    //   <Register />
    //   <Logout />
    //   <Create />
    //   <Login />
    // </View>

    <NavigationContainer>
      <Stack.Navigator initialRouteName="Read">
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Read" component={Read} />
        <Stack.Screen name="Create" component={Create} />
        <Stack.Screen name="Individual" component={Individual} />
        <Stack.Screen name="Update" component={Update} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#17222c",
    alignItems: "center",
  },
});
