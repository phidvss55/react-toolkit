import axios from "axios";

const BASE_URL = "http://localhost:4000/api/";

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

console.log("TOKEN", TOKEN);

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: {
    token: `Bearer ${TOKEN}`,
    Authorization: `Bearer ${TOKEN}`,
  },
  headers: {
    token: `Bearer ${TOKEN}`,
    Authorization: `Bearer ${TOKEN}`,
  },
});
