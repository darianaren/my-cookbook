import { combineReducers } from "redux";

import confirmationReducer from "./reducerConfirmation";
import dietsReducer from "./reducerDiets";
import loadReducer from "./reducerLoad";
import messageReducer from "./reducerMessage";
import recipeReducer from "./reducerRecipe";
import soundReducer from "./reducerSound";
import themeReducer from "./reducerTheme";
import urlReducer from "./reducerUrl";
import userReducer from "./reducerUser";

const reducer = combineReducers({
  confirmation: confirmationReducer,
  diets: dietsReducer,
  load: loadReducer,
  message: messageReducer,
  recipes: recipeReducer,
  sound: soundReducer,
  theme: themeReducer,
  urls: urlReducer,
  users: userReducer,
});

export default reducer;
