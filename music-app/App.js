import { StyleSheet, Text, View } from "react-native";
import Read from "./Components/Read";
import Register from "./Components/Register";
import Individual from "./Components/Individual";
// // import Logout from "./Components/LogOut";
import Create from "./Components/Create";
import Login from "./Components/Login";
import Update from "./Components/Update";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
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
