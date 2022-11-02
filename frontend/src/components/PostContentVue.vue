<template>
  <div>
    <form @submit.prevent="createNewPost">
      <div>
        <label for="title"></label>
        <input type="text" name="title" id="title" v-model="title" />
      </div>
      <div>
        <label for="author"></label>
        <select id="author" v-model="author">
          <option value="자작 시">자삭 시</option>
          <option value="가져온 시">가져온 시</option>
        </select>
      </div>
      <div>
        <label for="content"></label>
        <input type="text" name="content" id="content" v-model="content" />
      </div>
      <button>submit</button>
      <p v-if="logMsg">{{ logMsg }}</p>
    </form>
  </div>
</template>

<script>
import { createPost } from "@/api/post";
export default {
  data() {
    return {
      title: "",
      author: "자작 시",
      content: "",
      logMsg: "",
    };
  },
  methods: {
    async createNewPost() {
      try {
        const postData = {
          title: this.title,
          author: this.author,
          content: this.content,
          owner: this.$store.state.userName,
        };
        await createPost(postData);
        this.$router.push("/main");
      } catch (error) {
        this.logMsg = "로그인을 해주세요";
      }
    },
  },
};
</script>

<style></style>
