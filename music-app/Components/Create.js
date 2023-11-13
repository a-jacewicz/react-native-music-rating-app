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


export default function Create() {
    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState("");
    const [rating, setRating] = useState("");

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