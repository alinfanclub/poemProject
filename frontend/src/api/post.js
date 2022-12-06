import axios from "axios";
// import store from "@/store/index";
import { setInterceptors } from "@/api/interceptor";

// function crateInstance() {
//   const instance = axios.create({
//     baseURL: "http://localhost:3000/",
//   });
//   return setInterceptors(instance);
// }
function crateInstance() {
  const instance = axios.create({
    baseURL: "http://localhost:3000/",
  });
  return setInterceptors(instance);
}

const instance = crateInstance();

//use axios create
function createPost(postData) {
  return instance.post("post", postData);
}

function getPost() {
  return instance.get("post");
}
function getPostDetail(id) {
  return instance.get(`post/${id}`);
}
function deletePost(id) {
  return instance.delete(`post/${id}`);
}
function ownpoem() {
  return instance.get("post/ownpoem");
}
function importedPoem() {
  return instance.get("post/importedPoem");
}
function updatePost(id, postData) {
  return instance.put(`post/${id}`, postData);
}
function temporarily(postData) {
  return instance.put(`post/temporarily`, postData);
}

export {
  createPost,
  getPost,
  getPostDetail,
  deletePost,
  ownpoem,
  importedPoem,
  updatePost,
  temporarily,
};
