import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Read() {
  const [songData, setSongData] = useState([]);

  const navigation = useNavigation();

  // gets list of song entries
  useEffect(() => {
    const UserCheck = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        if (storedUsername) { 
          fetchData();
        } else {
        navigation.navigate('Login'); 
        }
      }
    catch (error) {
      console.error('Error checking for username:', error.message);
    }
  };

    const fetchData = async () => {
      try {
        const response = await fetch(
          // kelleigh IP address
         // "http://172.21.250.15:8080/index.php/rating/view"
          // aleks IP address
           "http://172.21.98.195/index.php/rating/view"
        );
        const data = await response.json();
        setSongData(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    UserCheck();
  }, []);

  //  go to individual song view
  const onPressSong = (item) => {
    // const data = {
    //   item,
    // };
    // navigate("/viewSong", { data });
    navigation.navigate("Individual", { item });
  };

  //  navigate to create page
  const handleCreate = () => {
    navigation.navigate("Create");
  };

  // log user out and navigate to login page
  const handleLogout = () => {
    navigation.navigate("Login");
  };

  return (
    <ScrollView>
      <View style={styles.app}>
        <View style={styles.container}>
          {/* logo */}
          <Image style={styles.logo} source={require("./logo.png")} />
          <Text>{"\n"}</Text>
          {/* list -- scrolling feature */}
          {/* visual test -- to be deleted */}
          <Text style={styles.entry}>
            <Text style={styles.song}>SONG </Text>
            <Text style={styles.artist}> by Artist</Text>
            <Text style={styles.username}> | username</Text>
          </Text>
          {/* ... */}
          <View>
            {songData &&
              songData.map((item) => (
                <View key={item.id}>
                  <Text
                    style={styles.entry}
                    onPress={() => {
                      onPressSong(item);
                    }}
                  >
                    <Text style={styles.song}>{item.song} </Text>
                    <Text style={styles.artist}> {item.artist}</Text>
                    <Text style={styles.username}> | {item.username}</Text>
                  </Text>
                </View>
              ))}
          </View>
          <Text>{"\n"}</Text>
          {/* create button */}
          <Button
            title="Create"
            color={"#FF1CC0"}
            onPress={handleCreate}
          ></Button>
          <Text>{"\n"}</Text>
          {/* logout button */}
          <Button
            title="Logout"
            color={"#6c80ff"}
            onPress={handleLogout}
          ></Button>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: "#17222c",
    alignItems: "center",
  },
  container: {
    alignItems: "center",
    padding: 16,
    backgroundColor: "#17222c",
    flex: 1,
  },
  logo: {
    width: 160,
    height: 82,
  },
  entry: {
    color: "white",
    backgroundColor: "#4A0074",
    paddingTop: 16,
    paddingBottom: 16,
    padding: 16,
    marginBottom: 10,
  },
  song: {
    fontWeight: "bold",
    color: "#e1d4f3",
  },
  artist: {
    color: "#ccbed8",
  },
  username: {
    color: "#161616",
  },
});