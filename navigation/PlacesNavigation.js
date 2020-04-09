import React from "react";
import { createStackNavigator } from "react-navigation-stack";

import { createAppContainer } from "react-navigation";
import { enableScreens } from "react-native-screens";

import HomeScreen from "../screens/HomeScreen";
import DetailsScreen from "../screens/DetailsScreen";
import AddNewPlaceScreen from "../screens/AddNewPlaceScreen";

enableScreens();

const placesStackNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
    Add: AddNewPlaceScreen,
  },
  {
    headerMode: "none",
  }
);

export default createAppContainer(placesStackNavigator);
