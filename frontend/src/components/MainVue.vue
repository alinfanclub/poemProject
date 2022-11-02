<template>
  <div>
    <HeaderVue></HeaderVue>
    <table>
      <tr v-for="(posts, i) in this.postData" :key="i" id="Post">
        <div>
          <div>
            <td>{{ posts.owner }}</td>
            <td>{{ posts.type }}</td>
          </div>
          <div>
            <td>
              <router-link :to="`/post/${posts._id}`">{{
                posts.title
              }}</router-link>
            </td>
          </div>
        </div>
      </tr>
    </table>
  </div>
</template>

<script>
import { getPost } from "@/api/post";
// import { deleteCookie } from "@/utils/cookies";
import HeaderVue from "@/components/common/HeaderVue.vue";
export default {
  data() {
    return {
      postData: [],
    };
  },
  components: {
    HeaderVue,
  },
  methods: {
    async fetchPost() {
      try {
        const { data } = await getPost();
        this.postData = data.posts;
      } catch (error) {
        console.log(error);
        alert("로그인 해주세요");
        this.$router.push("/login");
      }
    },
    // async logOut() {
    //   try {
    //     await deleteCookie("til_auth");
    //     await deleteCookie("til_user");
    //     this.$store.state.token = "";
    //     this.$store.state.userName = "";
    //   } catch (error) {
    //     console.log(error);
    //   }
    //   this.$router.push("/login");
    // },
    goToDetail() {},
  },
  created() {
    this.fetchPost();
  },
};
</script>

<styl lang="scss" scoped>
table {
  margin: 0 auto;
  width: 80%;
  border-top: 1px solid #ddd;
  #Post {
    display: flex;
    width: 100%;
    height: 8rem;
    border-bottom: 1px solid #ddd;
    padding: 1rem 2rem;
    box-sizing: border-box;
    > div {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      > div {
        &:nth-child(1) {
          display: flex;
          justify-content: start;
          height: 30%;
          align-items: center;

          > td {
            &:nth-child(1) {
              margin-right: 1rem;
            }
          }
        }
        &:nth-child(2) {
          height: 70%;
          display: flex;
          align-items: center;
        }
      }
    }
  }
}
</styl>
