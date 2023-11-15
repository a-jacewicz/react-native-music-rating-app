import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useRoute, useNavigation } from "@react-navigation/native";
import StarRating from "react-native-star-rating";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Individual() {
  const route = useRoute();
  const { item } = route.params;

  const [id, setID] = useState(item.id);
  const [username, setUsername] = useState(item.username);
  const [artist, setArtist] = useState(item.artist);
  const [song, setSong] = useState(item.song);
  const [rating, setRating] = useState(item.rating);
  const [showIcons, setShowIcons] = useState(false);

  const navigation = useNavigation();

  const onRefresh = useCallback(async () => {
    try {
      const response = 
      await fetch(
        // kelleigh IP address
       // "http://172.21.250.15:8080/index.php/rating/view"
        // aleks IP address
          "http://172.21.98.195/index.php/rating/view"
      );
      const data = await response.json();

      const filteredData = data.filter((item) => item.id === id);

      if (filteredData.length > 0) {
        setUsername(filteredData[0].username);
        setArtist(filteredData[0].artist);
        setSong(filteredData[0].song);
        setRating(filteredData[0].rating);
      } else {
        console.warn("Entry not found in the data");
      }
    } catch (error) {
      console.error(error.message);
    }
  }, [id]);

  const isCurrentUser = async () => {
    const loggedInUsername = await AsyncStorage.getItem("username");
    return loggedInUsername === username;
  };

  useEffect(() => {
    const fetchData = async () => {
      await onRefresh();
      const currentUser = await isCurrentUser();
      setShowIcons(currentUser);
    };
    fetchData();
  }, [onRefresh]);

  const removeEntry = async () => {
    try {
      const response =  await fetch(
        // kelleigh IP address
       // "http://172.21.250.15:8080/index.php/rating/view"
        // aleks IP address
          "http://172.21.98.195/index.php/rating/delete", 
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id, username }),
          }
        );

      const responseData = await response.json();

      if (responseData.message) {
        console.log(responseData.message);
        navigation.goBack();
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
          onPress: removeEntry,
        },
      ],
      { cancelable: false }
    );
  };

  const handleEdit = () => {
    navigation.navigate("Update", { item });
  };

  const renderEditDeleteIcons = () => {
    if (showIcons) {
      return (
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={handleEdit}>
            <FontAwesomeIcon
              icon={faPenToSquare}
              color={"#B131FA"}
              size={30}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete}>
            <FontAwesomeIcon icon={faTrash} color={"#FF1CC0"} size={30} />
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.app}>
      <View style={styles.container}>
        <Image style={styles.logo} source={require("./logo.png")} />
        <Text>{"\n"}</Text>
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
        {renderEditDeleteIcons()}
      </View>
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