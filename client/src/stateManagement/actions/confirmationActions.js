import { CONFIMATION_WINDOW_OPEN, CONFIMATION_WINDOW_CLOSE } from "../types";

export const confirmationOpen = () => ({ type: CONFIMATION_WINDOW_OPEN });

export const confirmationClose = () => ({ type: CONFIMATION_WINDOW_CLOSE });
