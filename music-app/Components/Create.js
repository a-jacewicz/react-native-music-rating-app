import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import StarRating from 'react-native-star-rating';


export default function Create() {
    const [song, setSong] = useState("");
    const [artist, setArtist] = useState("");
    const [rating, setRating] = useState(0);
    const [message, setMessage] = useState("");

    const handleCreate = async () => {
        try {
          const response = await fetch(
           // kelleighs IP
           // "http://172.21.250.15:8081/index.php/user/register",
           // aleks IP address 
           'http://172.21.98.195/index.php/rating/create', 
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                artist: artist,
                song: song,
                rating: rating,
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
        alert("Rated successfully!");
      } else {
        setMessage("Rating failed.");
        throw new Error("Rating failed.");
      }
    } catch (error) {
      setMessage("Issue!");
      console.error(error);
    }
  };

  return (
    <View>
      <Text>Create Rating</Text>
      <View>
        <Text>Artist</Text>
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
        <Text>Song</Text>
        <TextInput
          style={styles.input}
          placeholder="Title"
          autoCompleteType="off"
          value={song}
          onChangeText={(text) => setSong(text)}
          required
        />
        <Text>Rating</Text>
        <StarRating
        disabled={false}
        maxStars={5}
        rating={rating}
        selectedStar={(rating) => setRating(rating)}
        fullStarColor={'gold'}
        emptyStarColor={'grey'}
        starSize={30}
        
        />
        <Button title="Rate" onPress={handleCreate}></Button>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: "grey",
        backgroundColor: "white",
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 10,
      },
    });