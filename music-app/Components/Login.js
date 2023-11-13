import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch(
       // kelleighs IP
       // "http://172.21.250.15:8081/index.php/user/register",
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
        alert("Login successful!");
        // navigation.navigate("Login");
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
    <View>
      <Text>Login</Text>
      <View>
        <Text>Username</Text>
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
        <Text>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          autoCompleteType="off"
          value={password}
          onChangeText={(text) => setPassword(text)}
          required
        />
        <Button title="Login" onPress={handleLogin}></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: "grey",
    backgroundColor: "white",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
});
