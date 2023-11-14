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

export default function Update() {
  const [song, setSong] = useState("");
  const [artist, setArtist] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");

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
            // onPress={handleCreate}
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
