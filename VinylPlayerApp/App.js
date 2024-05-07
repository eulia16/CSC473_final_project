import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  Text,
  StatusBar,
} from "react-native";

const SERVER_URL = "http:/129.3.126.99:3000";

const App = () => {
  // Function to make POST requests to the server
  const sendCommandToServer = (command) => {
    fetch(`${SERVER_URL}/${command}`, {
      method: "POST",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        Alert.alert(
          `${
            command.charAt(0).toUpperCase() + command.slice(1)
          } command sent successfully`
        );
      })
      .catch((error) => {
        console.error("Error:", error);
        Alert.alert("Error sending command");
      });
  };

  // Functions that will run when buttons are pressed
  const handlePlayPress = () => sendCommandToServer("play");
  const handlePausePress = () => sendCommandToServer("pause");
  const handleStopPress = () => sendCommandToServer("stop");

  // Custom button component
  const CustomButton = ({ title, onPress, color }) => (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, { backgroundColor: color }]}
      activeOpacity={0.7}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.title}>Vinyl Player Controller</Text>
      </View>

      {/* Buttons */}
      <CustomButton title="Play" onPress={handlePlayPress} color="#1abc9c" />
      <CustomButton title="Stop" onPress={handleStopPress} color="#e83535" />
      <CustomButton title="Pause" onPress={handlePausePress} color="#eb8934" />
    </View>
  );
};

// Define styling for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#34495e", // Dark blue color
  },
  header: {
    position: "absolute",
    top: 100,
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    color: "#ecf0f1", // Soft white color
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  button: {
    elevation: 8,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginVertical: 20,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
  },
});

export default App;
