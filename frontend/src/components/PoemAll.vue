<template>
  <div>
    <header-vue></header-vue>
    <div id="ShowPoemArea">
      <ul>
        <li v-for="(posts, i) in sliceCreatePoem" :key="i" id="Post">
          <div class="list_item">
            <div>
              <div>{{ posts.author }}</div>
              <div>{{ posts.type }}</div>
            </div>
            <div>
              <router-link :to="`/post/${posts._id}`">{{
                posts.title
              }}</router-link>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getPost } from "@/api/post";
import HeaderVue from "./common/HeaderVue.vue";
export default {
  data() {
    return {
      getPost: [],
    };
  },
  methods: {
    async fetchCreatePoem() {
      try {
        const { data } = await getPost();
        this.getPost = data.posts;
      } catch (error) {
        console.log(error);
        alert("로그인 해주세요");
        this.$router.push("/login");
      }
    },
  },
  components: {
    HeaderVue,
  },
  created() {
    this.fetchCreatePoem();
  },
  computed: {
    sliceCreatePoem() {
      let sliceCreatePoem = [...this.getPost].reverse();
      return sliceCreatePoem;
    },
  },
};
</script>

<style lang="scss" scoped>
@import url(../css/poemlist.css);
</style>
