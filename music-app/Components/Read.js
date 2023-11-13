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

export default function Read() {
  const [songData, setSongData] = useState([]);

  const navigate = useNavigation();

  //   gets list of song entries
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://172.21.250.15/index.php/rating/view"
        );
        const data = await response.json();
        setSongData(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  //  go to individual song view
  const onPressSong = (item) => {
    const data = {
      username: item.username,
      song: item.song,
      artist: item.artist,
      rating: item.rating,
    };
    navigate("/viewSong", { data });
  };

  //  navigate to create page
  const handleCreate = () => {
    navigate("/create");
  };

  return (
    <ScrollView>
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
          //   onPress={handleLogout}
        ></Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",
    padding: 16,
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
    // alignItems: "center",
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
