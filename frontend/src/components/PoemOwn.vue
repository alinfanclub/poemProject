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
import { ownpoem } from "@/api/post";
import HeaderVue from "./common/HeaderVue.vue";
export default {
  data() {
    return {
      ownPoem: [],
    };
  },
  methods: {
    async fetchCreatePoem() {
      try {
        const { data } = await ownpoem();
        this.ownPoem = data.posts;
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
      let sliceCreatePoem = [...this.ownPoem].reverse();
      return sliceCreatePoem;
    },
  },
};
</script>

<style lang="scss" scoped>
@import url(../css/poemlist.css);
</style>
