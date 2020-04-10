import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import Colors from "../constants/Colors";

const ListItem = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={{ ...styles.listItem, ...props.listItemStyle }}>
        <Image style={styles.image} source={{ uri: props.image }} />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.address}>{props.address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    width: "100%",
    height: 100,
    backgroundColor: "black",
    marginStart: 30,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "flex-start",
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontFamily: "apple-bold",
    fontSize: 20,
    marginBottom: 4,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#ccc",
    borderColor: "orange",
    borderWidth: 2,
  },
  infoContainer: {
    marginLeft: 25,
    width: 250,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  address: {
    color: "#666",
    fontSize: 16,
  },
});

export default ListItem;
