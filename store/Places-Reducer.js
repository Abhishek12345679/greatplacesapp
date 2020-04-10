import { ADD_PLACE } from "./Places-action";
import Place from "../models/Place";

const initialState = {
  places: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      const newPlace = new Place(new Date().toString(), action.placeData.title);
      return {
        places: state.places.concat(newPlace),
      };

    default:
      return state;
  }
};
