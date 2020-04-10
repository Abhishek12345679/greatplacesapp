/* TODO : Outsource the actionButton component so that android can have 
its native like action button */

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  StatusBar,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import ListItem from "../components/ListItem";

const HomeScreen = (props) => {
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
      {!notData && (
        <FlatList
          keyExtractor={(item) => item.id}
          data={places}
          renderItem={(itemData) => (
            <ListItem
              title={itemData.item.title}
              image={
                "https://images.pexels.com/photos/2659475/pexels-photo-2659475.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              }
              address={"6th Imperial Avenue"}
              onPress={() => {
                props.navigation.navigate("Details", {
                  placeTitle: itemData.item.title,
                  id: itemData.item.id,
                });
              }}
            />
          )}
        />
      )}
      {notData && (
        <View>
          <ListItem
            title={null}
            address={null}
            onPress={() => {}}
            listItemStyle={{ backgroundColor: "#ccc" }}
          />
          <ListItem
            title={null}
            address={null}
            onPress={() => {}}
            listItemStyle={{ backgroundColor: "#ccc" }}
          />
          <ListItem
            title={null}
            address={null}
            onPress={() => {}}
            listItemStyle={{ backgroundColor: "#ccc" }}
          />
          <ListItem
            title={null}
            address={null}
            onPress={() => {}}
            listItemStyle={{ backgroundColor: "#ccc" }}
          />
          <ListItem
            title={null}
            address={null}
            onPress={() => {}}
            listItemStyle={{ backgroundColor: "#ccc" }}
          />
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
  },
});

export default HomeScreen;
