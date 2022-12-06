import axios from "axios";
// import store from "@/store/index";
import { setInterceptors } from "@/api/interceptor";

function crateInstance() {
  const instance = axios.create({
    baseURL: "http://localhost:3000/comment",
  });
  return setInterceptors(instance);
}

const instance = crateInstance();

//use axios create
function AddComment(commentData) {
  return instance.post("", commentData);
}
function GetComment(id) {
  return instance.get(`/${id}`);
}

export { AddComment, GetComment };
