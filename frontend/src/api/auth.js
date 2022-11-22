import axios from "axios";
// import store from "@/store/index";
import { setInterceptors } from "@/api/interceptor";

function crateInstance() {
  const instance = axios.create({
    baseURL: "https://d1cuv13t5kqbgp.cloudfront.net/user",
  });
  return setInterceptors(instance);
}

const instance = crateInstance();

//use axios create
function registerUser(userData) {
  return instance.post("signup", userData);
}

function logIn(loginData) {
  return instance.post("login", loginData);
}

export { registerUser, logIn };
