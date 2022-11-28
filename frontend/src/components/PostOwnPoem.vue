<template>
  <div>
    <header-vue></header-vue>
    <div id="ownPoemArea">
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
li {
  list-style: none;
}
#ownPoemArea {
  width: 50%;
  height: 100vh;
  margin: 0 auto;
  background-color: #fff;
  padding: 0 1rem;
  box-sizing: border-box;

  ul {
    li {
      border-bottom: 1px solid #333;
      padding: 1rem 1rem;
      box-sizing: border-box;

      div.list_item {
        > div {
          &:nth-child(1) {
            display: flex;
            margin-bottom: 1rem;

            > div:nth-child(1) {
              margin-right: 1rem;
            }
          }
          &:nth-child(2) {
            a {
              font-size: 1.2rem;
            }
          }
        }
      }
    }
  }
}
</style>
