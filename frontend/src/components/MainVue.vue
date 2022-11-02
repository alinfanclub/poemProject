<template>
  <div>
    <HeaderVue></HeaderVue>
    <table>
      <colgroup>
        <col width="10%" />
        <col width="20%" />
        <col width="20%" />
        <col width="20%" />
        <col width="30%" />
      </colgroup>
      <thead>
        <tr>
          <th>No</th>
          <th>작성자</th>
          <th>제목</th>
          <th>분류</th>
          <th>내용</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(posts, i) in this.postData" :key="i" id="Post">
          <td>{{ i + 1 }}</td>
          <td>{{ posts.owner }}</td>
          <td>
            {{ posts.title }}
          </td>
          <td>{{ posts.author }}</td>
          <td>{{ posts.content }}</td>
        </tr>
      </tbody>
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
  },
  created() {
    this.fetchPost();
  },
};
</script>

<styl lang="scss" scoped>
#Post {
  //   display: flex;
}
</styl>
