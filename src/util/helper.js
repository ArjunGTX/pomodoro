import { constants } from "./constant";

export const getAccessToken = () =>
  localStorage.getItem(constants.ACCESS_TOKEN);
