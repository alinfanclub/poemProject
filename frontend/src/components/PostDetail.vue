<template>
  <div id="peomDetail">
    <button
      v-if="postData.owner == this.$store.state.userName"
      @click="deleteThis"
    >
      delete
    </button>
    <h1>{{ postData.title }}</h1>
    <small>{{ postData.author }}</small>
    <div class="content">
      {{ postData.content }}
    </div>
    <p v-if="error">{{ this.error }}</p>
  </div>
</template>

<script>
import { getPostDetail, deletePost } from "@/api/post";
export default {
  data() {
    return {
      postData: "",
      error: "",
    };
  },
  methods: {
    async getPostDetail() {
      try {
        const id = this.$route.params.id;
        const { data } = await getPostDetail(id);
        this.postData = data;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteThis() {
      try {
        const id = this.$route.params.id;
        await deletePost(id);
        this.$router.push("/main");
      } catch (err) {
        this.error = err.message;
        console.log(err);
      }
    },
  },
  created() {
    this.getPostDetail();
  },
};
</script>

<style lang="scss" scoped>
* {
  text-align: left;
}
#peomDetail {
  padding: 1rem;
  h1 {
    font-size: 3rem;
  }
  div.content {
    white-space: pre;
    text-align: left;
    min-height: 50rem;
  }
}
</style>
