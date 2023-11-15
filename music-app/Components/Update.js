import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import StarRating from "react-native-star-rating";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

export default function Update() {
  const route = useRoute();
  const { item } = route.params;

  const [id, setID] = useState(item.id);
  const [username, setUsername] = useState(item.username);
  const [artist, setArtist] = useState(item.artist);
  const [song, setSong] = useState(item.song);
  const [rating, setRating] = useState(item.rating);

  const navigation = useNavigation();

  // update the song
  const handleUpdate = async () => {
    const songData = { id, username, artist, song, rating };

    try {
      const response = await fetch(
        "http://172.21.250.15:8080/index.php/rating/edit",
        // aleks IP address
        //  "http://172.21.98.195/index.php/rating/edit",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(songData),
        }
      );

      // update song data list for Read

      alert("Updated successfully!");
      // navigation.goBack();
      navigation.navigate("Read");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <View style={styles.app}>
      {/* logo */}
      <Image style={styles.logo} source={require("./logo.png")} />
      <Text>{"\n"}</Text>
      <View style={styles.container}>
        {/* logo
        <Image style={styles.logo} source={require("./logo.png")} />
        <Text>{"\n"}</Text> */}
        <Text style={styles.title}>Update Rating</Text>
        <View style={styles.form}>
          <Text style={styles.label}>Artist</Text>
          <TextInput
            style={styles.input}
            placeholder="Artist"
            autoCompleteType="off"
            autoCapitalize="none"
            keyboardType="default"
            value={artist}
            onChangeText={(text) => setArtist(text)}
            required
          />
          <Text style={styles.label}>Song</Text>
          <TextInput
            style={styles.input}
            placeholder="Title"
            autoCompleteType="off"
            value={song}
            onChangeText={(text) => setSong(text)}
            required
          />
          <Text style={styles.label}>Rating</Text>
          <StarRating
            disabled={false}
            maxStars={5}
            rating={rating}
            selectedStar={(rating) => setRating(rating)}
            fullStarColor={"#FF1CC0"}
            emptyStarColor={"black"}
            starSize={30}
          />
          <Text>{"\n"}</Text>
          <Button
            disabled={!artist || !song || !rating}
            title="Rate"
            onPress={handleUpdate}
          ></Button>
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
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6c80ff",
    width: "80%",
    maxWidth: 420,
    minHeight: 400,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: 16,
  },
  logo: {
    width: 160,
    height: 82,
    marginTop: 16,
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
    borderColor: "black",
    backgroundColor: "#dce0fc",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
});
