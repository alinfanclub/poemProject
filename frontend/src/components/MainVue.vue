<template>
  <div id="Main">
    <HeaderVue></HeaderVue>
    <div id="poemMain">
      <div class="poem_area">
        <div class="poem_area_header">
          <h2>창작시</h2>
          <router-link to="/">더보기</router-link>
        </div>
        <ul>
          <li v-for="(posts, i) in this.sliceCreatePoem" :key="i" id="Post">
            <div>
              <div>
                <div>{{ posts.owner }}</div>
                <div>{{ posts.type }}</div>
              </div>
              <div>
                <div>
                  <router-link :to="`/post/${posts._id}`">{{
                    posts.title
                  }}</router-link>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="poem_area">
        <div class="poem_area_header">
          <h2>가져온 시</h2>
          <router-link to="/">더보기</router-link>
        </div>
        <ul>
          <li v-for="(posts, i) in this.sliceImportPoem" :key="i" id="Post">
            <div>
              <div>
                <div>{{ posts.owner }}</div>
                <div>{{ posts.type }}</div>
              </div>
              <div>
                <div>
                  <router-link :to="`/post/${posts._id}`">{{
                    posts.title
                  }}</router-link>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { ownpoem, importedPoem } from "@/api/post";
// import { deleteCookie } from "@/utils/cookies";
import HeaderVue from "@/components/common/HeaderVue.vue";
export default {
  data() {
    return {
      postData: [],
      ownPoem: [],
      importedPoem: [],
    };
  },
  components: {
    HeaderVue,
  },
  methods: {
    // async fetchPost() {
    //   try {
    //     const { data } = await getPost();
    //     this.postData = data.posts;
    //   } catch (error) {
    //     console.log(error);
    //     alert("로그인 해주세요");
    //     this.$router.push("/login");
    //   }
    // },
    async fetchImportedPoem() {
      try {
        const { data } = await importedPoem();
        this.importedPoem = data.posts;
      } catch (error) {
        console.log(error);
        alert("로그인 해주세요");
        this.$router.push("/login");
      }
    },
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
    // this.fetchPost();
    this.fetchCreatePoem();
    this.fetchImportedPoem();
  },
  computed: {
    sliceCreatePoem() {
      let sliceCreatePoem = [...this.ownPoem].reverse().slice(0, 3);
      return sliceCreatePoem;
    },
    sliceImportPoem() {
      let sliceImportPoem = [...this.importedPoem].reverse().slice(0, 3);
      return sliceImportPoem;
    },
  },
};
</script>

<style lang="scss" scopped>
#Main {
  height: 100%;
  width: 90%;
  margin: 0 auto;

  // > h1 {
  //   height: fit-content;
  //   text-align: right;
  //   padding: 0 5rem;
  //   font-size: 8rem;
  //   display: flex;
  //   align-content: center;
  //   justify-content: right;
  // }
}
#poemMain {
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 10rem;
  div.poem_area {
    height: fit-content;
    min-height: 20rem;
    width: 49%;

    margin-bottom: 4rem;
    // border: 1px solid #ddd;
    background-color: rgba($color: #ffffff, $alpha: 0.5);
    border-radius: 20px;
    box-shadow: 5px 5px 10px rgba($color: #000, $alpha: 0.3);
    > div.poem_area_header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 80%;
      margin: 0 auto;
      padding: 2rem;
    }
    > ul {
      margin: 0 auto;
      width: 80%;
      overflow-y: auto;
      height: 100%;
      #Post {
        display: flex;
        width: 100%;
        height: 8rem;
        border-bottom: 1px solid #ddd;
        // padding: 1rem 2rem;
        box-sizing: border-box;

        &:last-child {
          border-bottom: none;
        }
        > div {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          > div {
            &:nth-child(1) {
              display: flex;
              justify-content: flex-start;
              height: 30%;
              align-items: center;

              > div {
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
  }
}

@media screen and (max-width: 768px) {
  #poemMain {
    flex-direction: column;

    > div.poem_area {
      width: 100%;
    }
  }
}
</style>
