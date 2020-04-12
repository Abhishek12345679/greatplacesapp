import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { useDispatch } from "react-redux";
import * as PlacesActions from "../store/Places-action";

import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import * as LocationPicker from "expo-location";

import Colors from "../constants/Colors";
import CREDENTIALS from "../env";

const AddNewPlaceScreen = (props) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState();
  const [userLocation, setUserLocation] = useState();

  const pinnedLocation = props.navigation.getParam("selectedLocation");

  useEffect(() => {
    if (pinnedLocation) {
      setUserLocation(pinnedLocation);
    }
  });

  const textChangehandler = (text) => {
    setTitle(text);
  };

  const savePlaceHandler = () => {
    dispatch(
      PlacesActions.addPlace(
        title,
        imageUrl,
        userLocation.latitude,
        userLocation.longitude
      )
    );
    props.navigation.navigate("Home");
  };

  const verifyMapPermissions = async () => {
    const response = await Permissions.askAsync(Permissions.LOCATION);
    if (response.status !== "granted") {
      Alert.alert(
        "Insufficient Permissions",
        "You need to grant Location permissions to use this map",
        [{ text: Grant }]
      );
      return false;
    }
    return true;
  };

  const verifyCameraPermissions = async () => {
    const response = await Permissions.askAsync(
      Permissions.CAMERA_ROLL,
      Permissions.CAMERA
    );
    if (response.status !== "granted") {
      Alert.alert(
        "Insufficient Permissions",
        "You need to grant Camera permissions to use this map",
        [{ text: Grant }]
      );
      return false;
    }
    return true;
  };

  const saveImagehandler = async () => {
    const hasPermissions = await verifyCameraPermissions();

    if (!hasPermissions) {
      return;
    }
    const cameraResponse = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    // const cameraResponse = await ImagePicker.launchImageLibraryAsync({
    //   allowsEditing: true,
    //   aspect: [16, 9],
    //   quality: 1,
    // });

    if (cameraResponse.cancelled === false) {
      setImageUrl(cameraResponse.uri);
    }
  };

  const chooseLocationTypeHandler = () => {
    Alert.alert(
      "Choose",
      "Do you want to choose a location on the map or give your current location",
      [
        { text: "use location", onPress: saveLocationhandler },
        {
          text: "pick on map",
          onPress: pickOnMapHandler,
        },
      ]
    );
  };

  const saveLocationhandler = async () => {
    // staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${userLocation.la},${userLocation.longitude}&zoom=12&size=400x300&maptype=roadmap&markers=color:red%7Clabel:C%7C${userLocation.latitude},${userLocation.longitude}&key=${CREDENTIALS.GOOGLE_API_KEY}`;

    const hasPermissions = await verifyMapPermissions();

    if (!hasPermissions) {
      return;
    }

    try {
      const locationResponse = await LocationPicker.getCurrentPositionAsync({
        timeout: 10000,
      });
      // console.log(locationResponse);
      setUserLocation({
        latitude: locationResponse.coords.latitude,
        longitude: locationResponse.coords.longitude,
      });
    } catch (err) {
      Alert.alert(
        "Could not fetch location!",
        "Please try again later or pick a location on the map.",
        [{ text: "Okay" }]
      );
    }
  };

  const pickOnMapHandler = () => {
    props.navigation.navigate("Maps");
  };

  return (
    <View style={styles.screen}>
      <TouchableOpacity
        style={styles.addMap}
        onPress={chooseLocationTypeHandler}
      >
        {!!!userLocation ? (
          <View style={styles.addMap}>
            <Ionicons name="ios-map" size={40} color="#fff" />
          </View>
        ) : (
          <Image
            source={{
              uri: `https://maps.googleapis.com/maps/api/staticmap?center=${userLocation.latitude},${userLocation.longitude}&zoom=13&size=400x300&maptype=roadmap&markers=color:red%7Clabel:A%7C${userLocation.latitude},${userLocation.longitude}&key=${CREDENTIALS.GOOGLE_API_KEY}`,
            }}
            style={{ width: "100%", height: "100%" }}
          />
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={saveImagehandler} style={styles.addImage}>
        {!imageUrl ? (
          <Ionicons name="ios-image" size={40} color="#000" />
        ) : (
          <Image style={styles.image} source={{ uri: imageUrl }} />
        )}
      </TouchableOpacity>
      <View style={{ alignItems: "center", marginTop: 10 }}>
        <TextInput
          title={title}
          onChangeText={textChangehandler}
          style={styles.textInput}
          placeholder="Title"
        />
      </View>
      <TouchableOpacity onPress={savePlaceHandler} style={styles.saveButton}>
        <Text style={{ ...styles.text, marginTop: 0 }}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
    borderColor: "#fff",
  },
  actionBtn: {
    width: 50,
    height: 50,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  text: {
    fontFamily: "apple",
    color: "white",
    fontSize: 17,
    marginTop: 10,
  },
  textInput: {
    borderBottomWidth: 2,
    textAlign: "center",
    padding: 10,
    width: 200,
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    borderRadius: 75,
    overflow: "hidden",
    resizeMode: "cover",
  },
  saveButton: {
    width: 100,
    height: 50,
    borderRadius: 5,
    backgroundColor: Colors.primaryColor,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
});

export default AddNewPlaceScreen;
