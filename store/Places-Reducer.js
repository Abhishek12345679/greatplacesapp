import { ADD_PLACE, SET_PLACE, DELETE_ALL } from "./Places-action";
import Place from "../models/Place";

const initialState = {
  places: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DELETE_ALL:
      return {
        places: action.places,
      };
    case SET_PLACE:
      return {
        places: action.places.map(
          (place) =>
            new Place(
              place.id.toString(),
              place.title,
              place.imageUrl,
              place.address,
              place.latitude,
              place.longitude
            )
        ),
      };
    case ADD_PLACE:
      const newPlace = new Place(
        action.placeData.id.toString(),
        action.placeData.title,
        action.placeData.imageUrl,
        action.placeData.address,
        action.placeData.latitude,
        action.placeData.longitude
      );
      return {
        places: state.places.concat(newPlace),
      };

    default:
      return state;
  }
};
