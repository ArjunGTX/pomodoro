import axios from "axios";
import { getAccessToken } from "../util/helper";

const createConfig = (token) => ({
  headers: {
    authorization: token,
  },
});

export const axiosGet = async (url, requireAuth) => {
  if (requireAuth) {
    const token = getAccessToken();
    if (!token) return Promise.reject(Error("Invalid AccessToken"));
    return await axios.get(url, createConfig(token));
  }
  return await axios.get(url);
};

export const axiosPost = async (url, requireAuth, habit) => {
  if (requireAuth) {
    const token = getAccessToken();
    if (!token) return Promise.reject(Error("Invalid AccessToken"));
    return await axios.post(url, { habit }, createConfig(token));
  }
  return await axios.post(url, habit);
};

export const axiosDelete = async (url, requireAuth) => {
  if (requireAuth) {
    const token = getAccessToken();
    if (!token) return Promise.reject(Error("Invalid AccessToken"));
    return await axios.delete(url, createConfig(token));
  }
  return await axios.delete(url);
};

export * from "./auth";
export * from "./todo";
