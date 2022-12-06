import axios from "axios";
// import store from "@/store/index";
import { setInterceptors } from "@/api/interceptor";

// function crateInstance() {
//   const instance = axios.create({
//     baseURL: "http://localhost:3000/comment",
//   });
//   return setInterceptors(instance);
// }

function crateInstance() {
  const instance = axios.create({
    baseURL:
      "https://port-0-poemproject-11er1a24lbbi8bv8.gksl2.cloudtype.app/comment",
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

function DeleteComment(a) {
  return instance.delete(`/${a}`);
}

export { AddComment, GetComment, DeleteComment };
