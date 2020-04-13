import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { useSelector } from "react-redux";

import CREDENTIALS from "../env";

const DetailsScreen = (props) => {
  const selectedPlaceId = props.navigation.getParam("placeId");
  const places = useSelector((state) => state.places.places);
  const selectedPlace = places.find((place) => place.id === selectedPlaceId);

  const gotoMap = () => {
    props.navigation.navigate("Maps", {
      readonly: true,
      initialLocation: {
        lat: selectedPlace.latitude,
        lng: selectedPlace.longitude,
      },
    });
  };

  return (
    <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
      <View style={styles.screen}>
        <TouchableOpacity style={styles.addMap} onPress={gotoMap}>
          <Image
            source={{
              uri: `https://maps.googleapis.com/maps/api/staticmap?center=${selectedPlace.latitude},${selectedPlace.longitude}&zoom=13&size=400x300&maptype=roadmap&markers=color:red%7Clabel:A%7C${selectedPlace.latitude},${selectedPlace.longitude}&key=${CREDENTIALS.GOOGLE_API_KEY}`,
            }}
            style={{ width: "100%", height: "100%" }}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.addImage}>
          <Image
            style={styles.image}
            source={{ uri: selectedPlace.imageUrl }}
          />
        </TouchableOpacity>
        <View style={styles.title}>
          <Text style={styles.titleText}>{selectedPlace.title}</Text>
        </View>
        <View style={styles.addressContainer}>
          <Text style={styles.text}>{selectedPlace.address}</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

DetailsScreen.navigationOptions = (navData) => {
  const headerTitle = navData.navigation.getParam("placeTitle");
  return {
    headerTitle: headerTitle,
  };
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "apple",
    color: "#fff",
  },
  header: {},
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  },

  screen: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  addMap: {
    width: "100%",
    height: 300,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  addImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowOpacity: 0.6,
    shadowOffset: {
      width: 7,
      height: 3,
    },
    marginTop: -50,
    borderWidth: 2,
    borderColor: "orange",
  },

  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    borderRadius: 75,
    overflow: "hidden",
    resizeMode: "cover",
  },
  addressContainer: {
    width: "90%",
    height: 75,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginTop: 15,
    borderRadius: 15,
    borderColor: "orange",
    borderWidth: 2,
  },
  title: {
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontFamily: "apple-bold",
    fontSize: 25,
  },
});
export default DetailsScreen;
