import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
// import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
// import {
//   faCheck,
//   faTimes,
//   faInfoCircle,
// } from "@fortawesome/free-solid-svg-icons";

// const USER_REGEX = /^[a-zA-Z0-9-_]{4,23}$/;
// const PWD_REGEX = /^[a-zA-Z0-9-_]{10,24}$/;

export default function Register({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [second, setSecond] = useState("");
  const [message, setMessage] = useState("");

  // const [validUser, setValidUser] = useState(false);
  // const [validPwd, setValidPwd] = useState(false);
  // const [validSecond, setValidSecond] = useState(false);

  // useEffect(() => {
  //   const isValid = USER_REGEX.test(username);
  //   setValidUser(isValid);
  // }, [username]);

  // useEffect(() => {
  //   const isValidPwd = PWD_REGEX.test(password);
  //   setValidPwd(isValidPwd);

  //   const match = password === second;
  //   setValidSecond(match);
  // }, [password, second]);

  const handleRegistration = async () => {
    try {
      const response = await fetch(
       // kelleighs IP
       // "http://172.21.250.15:8081/index.php/user/register",
       // aleks IP address 
       'http://172.21.98.195/index.php/user/register', 
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
            second: second,
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
        alert("Registered successfully!");
        // navigation.navigate("Login");
      } else {
        setMessage("Registration failed.");
        throw new Error("Registration failed.");
      }
    } catch (error) {
      setMessage("Username is already taken.");
      console.error(error);
    }
  };

  return (
    <View>
      <Text>Register</Text>
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
        <Text>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          autoCompleteType="off"
          value={second}
          onChangeText={(text) => setSecond(text)}
          required
        />
        <Button title="Register" onPress={handleRegistration}></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  //   container: {
  //     // flex: 1,
  //     justifyContent: "center",
  //     alignItems: "center",
  //     backgroundColor: "#FF1CC0",
  //     width: "80%",
  //     maxWidth: 420,
  //     minHeight: 400,
  //     display: "flex",
  //     flexDirection: "column",
  //     justifyContent: "flex-start",
  //     padding: 16,
  //   },
  //   title: {
  //     fontSize: 24,
  //     fontWeight: "bold",
  //     marginBottom: 20,
  //   },
  //   form: {
  //     width: "80%",
  //   },
  //   label: {
  //     fontSize: 16,
  //     marginBottom: 8,
  //   },
  input: {
    height: 40,
    borderColor: "grey",
    backgroundColor: "white",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  //   validIcon: {
  //     color: "limegreen",
  //     marginLeft: 4,
  //   },
  //   invalidIcon: {
  //     color: "red",
  //     marginLeft: 4,
  //   },
  //   infoIcon: {
  //     color: "white",
  //   },
  //   hide: {
  //     display: "none",
  //   },
  //   instructions: {
  //     flexDirection: "row",
  //     alignItems: "center",
  //     marginTop: 8,
  //     backgroundColor: "#000",
  //     borderRadius: 8,
  //     padding: 4,
  //     position: "relative",
  //     bottom: -10,
  //     // fontSize: 14,
  //     // marginTop: 8,
  //     // color: "red", // Change color as needed
  //   },
  //   offscreen: {
  //     position: "absolute",
  //     left: -9999,
  //     height: 1,
  //     width: 1,
  //     overflow: "hidden",
  //   },
  //   info: {
  //     color: "white",
  //   },
  //   button: {
  //     backgroundColor: "#007BFF",
  //     paddingVertical: 10,
  //     borderRadius: 5,
  //     marginTop: 20,
  //     alignItems: "center",
  //   },
  //   buttonText: {
  //     color: "#fff",
  //     fontSize: 18,
  //   },
  //   link: {
  //     color: "blue", // Adjust the color as needed
  //     textDecorationLine: "underline",
  //   },
  //   login: {
  //     alignItems: "center",
  //   },
});
