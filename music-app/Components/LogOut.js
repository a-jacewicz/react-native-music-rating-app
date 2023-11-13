import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
} from "react-native";


export default function Logout() {
    const [message, setMessage] = useState("");


    const handleLogout = async () => {
        try {
          const response = await fetch(
           // kelleighs IP
           // "http://172.21.250.15:8081/index.php/user/register",
           // aleks IP address 
           'http://172.21.98.195/index.php/user/logout',
           {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            credentials: 'include', 
            body: JSON.stringify({}), 
}); 

if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();

  if (data.message) {
    setMessage(data.message);
  }

  if (response.status === 200) {
    alert("Logged out successfully!");
  } else {
    setMessage("Logout failed.");
    throw new Error("Logout failed.");
  }
} catch (error) {
  setMessage("Issue!");
  console.error(error);
}
};

return (
<View>
<Button title="logout" onPress={handleLogout}></Button>
</View>
);
} 
