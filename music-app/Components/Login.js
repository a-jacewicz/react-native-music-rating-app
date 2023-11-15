import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigation = useNavigation();

  //  navigate to register page
  const registerLink = () => {
    navigation.navigate("Register");
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(
        // kelleighs IP
       // "http://172.21.250.15:8080/index.php/user/login",
        // aleks IP address
         'http://172.21.98.195/index.php/user/login',
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        }
      );

      // Check if the response is not in JSON format
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.message) {
        setMessage(data.message);
      }

      if (response.status === 200) {
        await AsyncStorage.setItem("username", username);
        alert("Welcome!");
        setUsername(""); 
        setPassword(""); 
        navigation.navigate("Read");
      } else {
        setMessage("Login failed.");
        throw new Error("Login failed.");
      }
    } catch (error) {
      setMessage("Error!");
      console.error(error);
    }
  };

  return (
    <View style={styles.app}>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.form}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            autoCompleteType="off"
            autoCapitalize="none"
            keyboardType="default"
            value={username}
            onChangeText={(text) => setUsername(text)}
            required
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            autoCompleteType="off"
            value={password}
            onChangeText={(text) => setPassword(text)}
            required
          />
          <Button
            style={styles.button}
            title="Login"
            disabled={!username || !password}
            onPress={handleLogin}
          ></Button>
        </View>
        <View style={styles.login}>
          <Text>Need an account?</Text>
          <Text style={styles.link} onPress={registerLink}>
            Register
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: "#17222c",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF1CC0",
    width: "80%",
    maxWidth: 420,
    minHeight: 400,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  form: {
    width: "80%",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "grey",
    backgroundColor: "white",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
  link: {
    color: "blue", // Adjust the color as needed
    textDecorationLine: "underline",
  },
  login: {
    alignItems: "center",
  },
});
