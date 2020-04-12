import React, { useState } from "react";

import PlacesNavigator from "./navigation/PlacesNavigation";
import { AppLoading } from "expo";

import * as Font from "expo-font";

import { combineReducers, createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import PlacesReducer from "./store/Places-Reducer";

import { init } from "./helpers/db";

init()
  .then(() => {
    console.log("success");
  })
  .catch((err) => {
    console.log("failed");
    console.log(err);
  });

export default function App() {
  const [loaded, setLoaded] = useState(false);

  const rootReducer = combineReducers({
    places: PlacesReducer,
  });

  const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

  //fetch the fonts to use in AppLoading as an async fn

  const fetchFonts = () => {
    return Font.loadAsync({
      "apple-bold": require("./assets/Fonts/apple-bold.ttf"),
      apple: require("./assets/Fonts/apple.ttf"),
    });
  };

  if (!loaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
}
