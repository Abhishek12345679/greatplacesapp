import React from "react";
import { createStackNavigator } from "react-navigation-stack";

import { createAppContainer } from "react-navigation";
import { enableScreens } from "react-native-screens";

import HomeScreen from "../screens/HomeScreen";
import DetailsScreen from "../screens/DetailsScreen";
import AddNewPlaceScreen from "../screens/AddNewPlaceScreen";

enableScreens();

const AddPlacesNavigator = createStackNavigator(
  {
    Add: AddNewPlaceScreen,
  },
  {
    defaultNavigationOptions: {},
    headerMode: "none"
  }
);

const HomeNavigator = createStackNavigator(
  {
    Home: HomeScreen,
  },
  {
    defaultNavigationOptions: {},
    headerMode: "none",
  }
);

const placesStackNavigator = createStackNavigator(
  {
    Home: HomeNavigator,
    Add: AddPlacesNavigator,
    Details: DetailsScreen,
  },
  {
    headerMode: "none",
  }
);

export default createAppContainer(placesStackNavigator);
