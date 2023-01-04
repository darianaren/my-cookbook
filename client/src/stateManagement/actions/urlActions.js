import { UPDATE_URL, SEARCH, CLEAR_URL } from "../types";

export const updateURL = (url) => ({ type: UPDATE_URL, payload: url });
export const updateSearch = (url) => ({ type: SEARCH, payload: url });
export const clearURL = () => ({ type: CLEAR_URL });
