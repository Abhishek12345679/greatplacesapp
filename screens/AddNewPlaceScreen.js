import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  StatusBar,
  TouchableOpacity,
  Alert,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { useDispatch, useSelector } from "react-redux";
import * as PlacesActions from "../store/Places-action";

import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

const AddNewPlaceScreen = (props) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  const state = useSelector((state) => state.places);

  const textChangehandler = (text) => {
    setValue(text);
  };

  const savePlaceHandler = () => {
    dispatch(PlacesActions.addPlace(value));
    console.log(state);
    props.navigation.navigate("Home");
  };

  const verifyPermissions = async () => {
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
    const hasPermissions = await verifyPermissions();

    if (!hasPermissions) {
      return;
    }
    ImagePicker.launchCameraAsync();
  };

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" />
      <View style={styles.addImage}>
        <TouchableOpacity style={styles.actionBtn} onPress={saveImagehandler}>
          <Ionicons name="ios-add" size={40} color="#000" />
        </TouchableOpacity>
        <Text style={styles.text}>Add Image</Text>
      </View>
      <View style={{ alignItems: "center", marginTop: 10 }}>
        <TextInput
          value={value}
          onChangeText={textChangehandler}
          style={styles.textInput}
          placeholder="Title"
        />
      </View>
      <View style={styles.addMap}>
        <TouchableOpacity
          style={{ ...styles.actionBtn, backgroundColor: "black" }}
          onPress={savePlaceHandler}
        >
          <Ionicons name="ios-add" size={40} color="#fff" />
        </TouchableOpacity>
        <Text style={{ ...styles.text, color: "#000" }}>Add Map</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column",
  },
  addImage: {
    flex: 1,
    width: "100%",
    height: 300,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  addMap: {
    flex: 1,
    width: "100%",
    height: 300,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
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
    borderWidth: 1,
    textAlign: "center",
    width: "50%",
    padding: 10,
  },
});

export default AddNewPlaceScreen;
