import axios from "axios";

const serverPort = import.meta.env.PORT || 5500;

export const axiosInstance = axios.create({
  //local endpoint reference
  baseURL: `https://evangadi-forum-group4-team2-1.onrender.com/api`,

  // deployed endpoint reference
  // baseURL: "",
});
