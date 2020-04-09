import React, { useState } from "react";

import PlacesNavigator from "./navigation/PlacesNavigation";
import { AppLoading } from "expo";

import * as Font from "expo-font";

export default function App() {
  const [loaded, setLoaded] = useState(false);

  //fetch the fonts to use in AppLoading as an async fn

  const fetchFonts = () => {
    return Font.loadAsync({
      "apple-bold": require("./assets/Fonts/apple-bold.ttf"),
      apple: require("./assets/Fonts/apple.ttf"),
    });
  };

  if (!loaded) {
    <AppLoading
      startAsync={fetchFonts}
      onFinish={() => setLoaded(true)}
      onError={(err) => console.log(err)}
    />;
  }

  return <PlacesNavigator />;
}
