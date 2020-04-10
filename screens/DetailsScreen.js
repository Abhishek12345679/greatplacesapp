import React from "react";
import { View, Text, StyleSheet } from "react-native";

const DetailsScreen = (props) => {
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.text}>
          {props.navigation.getParam("placeTitle")}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },
  text: {
    fontFamily: "apple-bold",
    fontSize: 40,
    marginBottom: -10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 30,
  },
});
export default DetailsScreen;
