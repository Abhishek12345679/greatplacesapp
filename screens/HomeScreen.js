/* TODO : Outsource the actionButton component so that android can have 
its native like action button */

import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  StatusBar,
  Platform,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import ListItem from "../components/ListItem";

import * as PlacesActions from "../store/Places-action";
import { useDispatch } from "react-redux";

const HomeScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(PlacesActions.loadPlaces());
  }, [dispatch]);

  const places = useSelector((state) => state.places.places);
  const notData = !!(places.length === 0);
  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>Great</Text>
          <Text style={styles.headerText}>Places</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              dispatch(PlacesActions.deleteAll());
            }}
          >
            <View style={styles.actionbtn}>
              <Ionicons name="ios-trash" size={23} color="red" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("Add");
            }}
          >
            <View style={styles.actionbtn}>
              <Ionicons name="ios-add" size={23} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {!notData ? (
        <FlatList
          keyExtractor={(item) => item.id}
          data={places}
          renderItem={(itemData) => (
            <ListItem
              title={itemData.item.title}
              image={itemData.item.imageUrl}
              address={itemData.item.address}
              onPress={() => {
                props.navigation.navigate("Details", {
                  placeId: itemData.item.id,
                });
              }}
            />
          )}
        />
      ) : (
        <View style={styles.centered}>
          <Text style={styles.fallbackText}>Nothing to Show 🙅🏽‍♂️</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 30,
  },
  headerText: {
    fontFamily: "apple-bold",
    fontSize: 40,
    marginBottom: -10,
  },
  actionbtn: {
    width: 50,
    height: 50,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    marginHorizontal: 5,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontFamily: "apple",
    fontSize: 15,
  },
});

export default HomeScreen;
