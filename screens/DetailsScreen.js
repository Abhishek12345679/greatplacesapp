import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useSelector } from "react-redux";

import CREDENTIALS from "../env";

const DetailsScreen = (props) => {
  const selectedPlaceId = props.navigation.getParam("placeId");
  const places = useSelector((state) => state.places.places);
  const selectedPlace = places.find((place) => place.id === selectedPlaceId);
  return (
    <View style={styles.screen}>
      <Image source={{ uri: selectedPlace.imageUrl }} style={styles.image} />
      <Image
        source={{
          uri: `https://maps.googleapis.com/maps/api/staticmap?center=${selectedPlace.latitude},${selectedPlace.longitude}&zoom=13&size=400x300&maptype=roadmap&markers=color:red%7Clabel:A%7C${selectedPlace.latitude},${selectedPlace.longitude}&key=${CREDENTIALS.GOOGLE_API_KEY}`,
        }}
        style={styles.image}
      />
    </View>
  );
};

DetailsScreen.navigationOptions = (navData) => {
  const headerTitle = navData.navigation.getParam("placeTitle");
  return {
    headerTitle: headerTitle,
  };
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
  image: {
    width: "100%",
    height: 300,
  },
});
export default DetailsScreen;
