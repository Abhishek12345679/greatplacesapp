import { createStackNavigator } from "react-navigation-stack";

import { createAppContainer } from "react-navigation";
import { enableScreens } from "react-native-screens";

import HomeScreen from "../screens/HomeScreen";
import DetailsScreen from "../screens/DetailsScreen";
import AddNewPlaceScreen from "../screens/AddNewPlaceScreen";
import MapScreen from "../screens/MapScreen";

enableScreens();

const AddPlacesNavigator = createStackNavigator({
  Add: AddNewPlaceScreen,
});

const DetailsNavigator = createStackNavigator({
  Details: DetailsScreen,
});

const HomeNavigator = createStackNavigator(
  {
    Home: HomeScreen,
  },
  {
    defaultNavigationOptions: {},
    headerMode: "none",
  }
);

const MapsNavigator = createStackNavigator({
  Maps: MapScreen,
});

const placesStackNavigator = createStackNavigator(
  {
    Home: HomeNavigator,
    Details: DetailsNavigator,
    Add: AddPlacesNavigator,
    Maps: MapsNavigator,
  },
  {
    headerMode: "none",
  }
);

export default createAppContainer(placesStackNavigator);
