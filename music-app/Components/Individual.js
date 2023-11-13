import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Rating } from "react-native-ratings";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function Individual({ route }) {
  const { data } = route.params;

  const [id, setID] = useState(data.id);
  const [username, setUsername] = useState(data.username);
  const [artist, setArtist] = useState(data.artist);
  const [song, setSong] = useState(data.song);
  const [rating, setRating] = useState(data.rating);

  // edit entry
  // navigate to update page with data
  // const handleEdit = (item) => {
  //   const data = {
  //     id: item.id,
  //     username: item.username,
  //     song: item.song,
  //     artist: item.artist,
  //     rating: item.rating,
  //   };
  //   navigate("/update", { data });
  // };

  // delete entry
  // pop up to confirm and navigate to read
  // const removeEntry = async (id) => {
  //   try {
  //     const response = await fetch("http://localhost/index.php/rating/delete", {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ id, username }), // Make sure username is defined
  //     });

  //     const responseData = await response.json();

  //     if (responseData.message) {
  //       console.log(responseData.message);
  //       setSongData((prevSongData) =>
  //         prevSongData.filter((item) => item.id !== id)
  //       );
  //     } else {
  //       console.error("Unexpected response format:", responseData);
  //     }
  //   } catch (error) {
  //     console.error("Error deleting entry:", error.message);
  //   }
  // };

  // const handleDelete = () => {
  //   Alert.alert(
  //     "Confirm Deletion",
  //     "Do you want to remove?",
  //     [
  //       {
  //         text: "Cancel",
  //         style: "cancel",
  //       },
  //       {
  //         text: "OK",
  //         onPress: () => removeEntry(item.id),
  //       },
  //     ],
  //     { cancelable: false }
  //   );
  // };

  return (
    <View style={styles.container}>
      {/* logo */}
      <Image style={styles.logo} source={require("./logo.png")} />
      <Text>{"\n"}</Text>
      {/* song entry details */}
      <Text style={styles.username}>{username}</Text>
      <Text style={styles.song}>{song}</Text>
      <Text style={styles.artist}>by {artist}</Text>
      <Rating readonly={true} tintColor="#17222c" startingValue={rating} />
      <Text>{"\n"}</Text>
      {/* add condition to only show if username is same as user who is logged in */}
      <View style={styles.iconContainer}>
        {/* edit button */}
        <TouchableOpacity
        // onPress={() => {
        //   handleEdit(item);
        // }}
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
        // onPress={() => {
        //   handleDelete(item.id);
        // }}
        >
          <FontAwesomeIcon icon={faTrash} color={"#FF1CC0"} size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 16,
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
