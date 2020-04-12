import React, { useState, useCallback, useEffect } from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = (props) => {
  const [markedLocation, setMarkedLocation] = useState();

  const readonly = props.navigation.getParam("readonly");
  const initialLocation = props.navigation.getParam("initialLocation");

  useEffect(() => {
    props.navigation.setParams({ markedLoc: markedLocation });
  }, [markedLocation]);
  const mapRegion = {
    latitude: initialLocation ? initialLocation.lat : 26.7124736,
    longitude: initialLocation ? initialLocation.lng : 89.11257599999999,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const putMarker = (event) => {
    // console.log(event);
    setMarkedLocation({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });
  };

  const saveLocationHandler = useCallback(() => {
    if (!markedLocation) {
      return;
    }
    props.navigation.navigate("Add", {
      selectedLocation: markedLocation,
    });
  }, [markedLocation]);

  useEffect(() => {
    props.navigation.setParams({ saveLocation: saveLocationHandler });
  }, [saveLocationHandler]);

  let markerCoordinates;

  if (markedLocation) {
    markerCoordinates = {
      latitude: markedLocation.latitude,
      longitude: markedLocation.longitude,
    };
    // console.log(markedLocation);
  }

  return (
    <MapView style={styles.map} initialRegion={mapRegion} onPress={putMarker}>
      {!readonly && markerCoordinates && (
        <Marker title="pinned location" coordinate={markerCoordinates} />
      )}
    </MapView>
  );
};

MapScreen.navigationOptions = (navData) => {
  const readonly = navData.navigation.getParam("readonly");
  const markedLocation = navData.navigation.getParam("markedLoc");
  const saveFn = navData.navigation.getParam("saveLocation");
  return {
    headerRight: () => (
      <TouchableOpacity
        onPress={saveFn}
        style={styles.headerButton}
        disabled={!!!markedLocation}
      >
        <Text style={styles.headerRightText}>save</Text>
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  headerButton: {
    marginHorizontal: 20,
    width:10
  },
  headerRightText: {
    fontFamily: "apple-bold",
    fontSize: 18,
    color: "orange",
  },
});

export default MapScreen;
