import * as FileSystem from "expo-file-system";

import { insertData, fetchData, deleteData } from "../helpers/db";

import CREDENTIALS from "../env";

export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACE = "SET_PLACE";
export const DELETE_ALL = "DELETE_ALL";

export const addPlace = (title, imageUrl, latitude, longitude) => {
  return async (dispatch) => {
    const fileName = imageUrl.split("/").pop();
    // console.log(fileName);
    const newPath = FileSystem.documentDirectory + fileName;

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${CREDENTIALS.GOOGLE_API_KEY}`
    );

    if (!response.ok) {
      throw new Error("response error");
    }

    const resData = await response.json();
    // console.log(resData);

    if (!resData) {
      throw new Error("!resData error");
    }
    const address = resData.results[0].formatted_address;

    try {
      await FileSystem.moveAsync({
        from: imageUrl,
        to: newPath,
      });
      const dbResult = await insertData(
        title,
        newPath,
        address,
        latitude,
        longitude
      );
      console.log("errrorororororo");
      console.log(dbResult);
      dispatch({
        type: ADD_PLACE,
        placeData: {
          id: dbResult.insertId,
          title: title,
          imageUrl: newPath,
          address: address,
          latitude: latitude,
          longitude: longitude,
        },
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const loadPlaces = () => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchData();
      // console.log(dbResult);
      dispatch({ type: SET_PLACE, places: dbResult.rows._array });
    } catch (err) {
      throw err;
    }
  };
};

export const deleteAll = () => {
  return async (dispatch) => {
    try {
      const dbResult = await deleteData();
      // console.log(dbResult);
      dispatch({ type: DELETE_ALL, places: dbResult.rows._array });
    } catch (err) {
      throw err;
    }
  };
};
