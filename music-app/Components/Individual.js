import { StyleSheet, Text, View, Image, Button } from "react-native";
import { Rating } from "react-native-ratings";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

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
      <Rating readonly={true} tintColor="#17222c" />
      <Text>{"\n"}</Text>
      <View style={styles.iconContainer}>
        {/* edit button */}
        <FontAwesomeIcon
          icon={faPenToSquare}
          color={"#B131FA"}
          size={30}
          style={styles.icon}
        />
        {/* delete button */}
        <FontAwesomeIcon icon={faTrash} color={"#FF1CC0"} size={30} />
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
    // justifyContent: "space-between",
    // width: "100%", // Adjust width based on your design
  },
  icon: {
    marginRight: 64, // Adjust the margin as needed
  },
});
