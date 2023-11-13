import { StyleSheet, Text, View, Image, Button } from "react-native";

export default function Individual() {
  return (
    <View style={styles.container}>
      {/* logo */}
      <Image style={styles.logo} source={require("./logo.png")} />
      <Text>{"\n"}</Text>
      {/* song entry details */}
      <Text style={styles.username}>username</Text>
      <Text style={styles.song}>SONG</Text>
      <Text style={styles.artist}>by Artist</Text>
      <Text>Rating -- in stars</Text>
      {/* edit button */}
      {/* delete button */}
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
  },
  username: {
    color: "#ccbed8",
    fontSize: 14,
  },
});
