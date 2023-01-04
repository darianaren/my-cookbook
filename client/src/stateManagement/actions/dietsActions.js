import { GET_DIETS } from "../types";

export const getDiets = (diets) => ({ type: GET_DIETS, payload: diets });
