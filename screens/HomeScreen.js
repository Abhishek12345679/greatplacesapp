import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

const HomeScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>Great</Text>
      <Text>Places</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    margin:30
  },
});

export default HomeScreen;
