import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  ScrollView,
  RefreshControl,
  SafeAreaView,
  TextInput,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Read() {
  const [songData, setSongData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // searching
  const [username, setUsername] = useState("");

  const navigation = useNavigation();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  // gets list of song entries
  useEffect(() => {
    const UserCheck = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem("username");
        if (storedUsername) {
          setUsername(storedUsername);
          fetchData();
        } else {
          navigation.navigate("Login");
        }
      } catch (error) {
        console.error("Error checking for username:", error.message);
      }
    };

    const fetchData = async () => {
      try {
        const response = await fetch(
          // kelleigh IP address

         // "http://172.21.250.15:8080/index.php/rating/view"

         //  "http://172.21.250.15:8080/index.php/rating/view"

          // aleks IP address
           "http://172.21.98.195/index.php/rating/view"
        );
        const data = await response.json();


        // Filter data based on search query
        const filteredData = data.filter(
          (item) =>
            item.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.song.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setSongData(filteredData || []); // changed data to filteredData
      } catch (error) {
        console.error(error.message);
      }
    };
    UserCheck();
  }, []);

  //  go to individual song view
  const onPressSong = (item) => {
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
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.app}>
          <View style={styles.container}>
            {/* logo */}
            <Image style={styles.logo} source={require("./logo.png")} />
            <Text style={styles.username}>Welcome, {username}</Text> 
            <Text>{"\n"}</Text>
            {/* list -- scrolling feature */}
            {/* visual test -- to be deleted */}
            {/* <Text style={styles.entry}>
            <Text style={styles.song}>SONG </Text>
            <Text style={styles.artist}> by Artist</Text>
            <Text style={styles.username}> | username</Text>
          </Text> */}
            {/* ... */}
            <View style={styles.search}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search by artist or song"
                onChangeText={(text) => setSearchQuery(text)}
                value={searchQuery}
              />
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                color={"#6c80ff"}
                size={30}
                style={styles.icon}
              />
            </View>
            <Text>{"\n"}</Text>
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
    </SafeAreaView>
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
    color: "#bb6de8",
  },
  searchInput: {
    height: 40,
    width: 240,
    borderColor: "#6c80ff",
    backgroundColor: "#e6e9fc",
    borderWidth: 1.4,
    marginBottom: 10,
    padding: 8,
    color: "white",
  },
  search: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginLeft: 10,
  },
});