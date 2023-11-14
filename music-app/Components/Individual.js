import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import StarRating from "react-native-star-rating";

export default function Individual() {
  const route = useRoute();
  const { item } = route.params;

  const [id, setID] = useState(item.id);
  const [username, setUsername] = useState(item.username);
  const [artist, setArtist] = useState(item.artist);
  const [song, setSong] = useState(item.song);
  const [rating, setRating] = useState(item.rating);

  const navigation = useNavigation();

  // edit entry
  // navigate to update page with data
  const handleEdit = (item) => {
    navigation.navigate("Update", { item });
  };

  // delete entry
  // pop up to confirm and navigate to read
  const removeEntry = async (id) => {
    try {
      const response = await fetch(
        "http://172.21.250.15:8080/index.php/rating/delete",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, username }), // Make sure username is defined
        }
      );

      const responseData = await response.json();

      if (responseData.message) {
        console.log(responseData.message);

        // update songData list and return it to Read

        // Navigate back to the Read screen
        navigation.navigate("Read");
      } else {
        console.error("Unexpected response format:", responseData);
      }
    } catch (error) {
      console.error("Error deleting entry:", error.message);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      "Confirm Deletion",
      "Do you want to remove?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => removeEntry(item.id),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.app}>
      <View style={styles.container}>
        {/* logo */}
        <Image style={styles.logo} source={require("./logo.png")} />
        <Text>{"\n"}</Text>
        {/* song entry details */}
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.song}>{song}</Text>
        <Text style={styles.artist}>by {artist}</Text>
        <StarRating
          disabled={true}
          maxStars={5}
          rating={rating}
          fullStarColor={"#FF1CC0"}
          emptyStarColor={"#fcd7f2"}
          starSize={36}
        />
        <Text>{"\n"}</Text>
        {/* add condition to only show if username is same as user who is logged in */}
        <View style={styles.iconContainer}>
          {/* edit button */}
          <TouchableOpacity
            onPress={() => {
              handleEdit(item);
            }}
          >
            <FontAwesomeIcon
              icon={faPenToSquare}
              color={"#B131FA"}
              size={30}
              style={styles.icon}
            />
          </TouchableOpacity>
          {/* delete button */}
          <TouchableOpacity
            onPress={() => {
              handleDelete(item.id);
            }}
          >
            <FontAwesomeIcon icon={faTrash} color={"#FF1CC0"} size={30} />
          </TouchableOpacity>
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
    alignItems: "center",
    padding: 16,
    backgroundColor: "#17222c",
  },
  logo: {
    width: 160,
    height: 82,
  },
  song: {
    fontWeight: "bold",
    color: "#FF1CC0",
    fontSize: 30,
  },
  artist: {
    color: "#B131FA",
    fontSize: 22,
    paddingBottom: 10,
  },
  username: {
    color: "#ccbed8",
    fontSize: 14,
  },
  iconContainer: {
    flexDirection: "row",
  },
  icon: {
    marginRight: 64,
  },
});
