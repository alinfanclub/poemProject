<template>
  <div>
    <HeaderVue></HeaderVue>
    <div id="peomDetail">
      <div class="Detail_head">
        <div class="poemInfo_title">
          <h1>{{ postData.title }}</h1>
          <div class="small_title">
            <small>{{ postData.author }}</small>
            <small>&nbsp;/ 작성자 : {{ postData.owner }}</small>
          </div>
        </div>
        <div>
          <button
            v-if="postData.owner == this.$store.state.userName"
            @click="deleteThis"
          >
            <ion-icon name="trash-outline"></ion-icon>
          </button>
          <button v-if="postData.owner == this.$store.state.userName">
            <router-link :to="`/post/update/${postData._id}`" replace
              ><ion-icon name="pencil-outline"></ion-icon
            ></router-link>
          </button>
        </div>
      </div>
      <!-- <div class="content">
      {{ postData.content }}
    </div> -->
      <div id="viewer"></div>
      <p v-if="error">{{ this.error }}</p>
    </div>
  </div>
</template>

<script>
import { getPostDetail, deletePost } from "@/api/post";
import Viewer from "@toast-ui/editor/dist/toastui-editor-viewer";
import "@toast-ui/editor/dist/toastui-editor.css";
import HeaderVue from "@/components/common/HeaderVue.vue";
import "prismjs/themes/prism.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import Prism from "prismjs";
import "prismjs/components/prism-clojure.js";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
export default {
  data() {
    return {
      postData: "",
      error: "",
      viewer: null,
    };
  },
  mounted() {
    // this.viewer = new Viewer({
    //   el: document.querySelector("#viewer"),
    //   initialValue: `${this.postData.content}`,
    //   previewStyle: "vertical",
    // });
  },
  components: {
    HeaderVue,
  },
  methods: {
    async getPostDetail() {
      try {
        const id = this.$route.params.id;
        const { data } = await getPostDetail(id);
        this.postData = data;
        this.viewer = new Viewer({
          el: document.querySelector("#viewer"),
          initialValue: `${this.postData.content}`,
          previewHighlight: false,
          previewStyle: "vertical",
          toolbarItems: null,
          plugins: [[codeSyntaxHighlight, { highlighter: Prism }]],
        });
      } catch (error) {
        console.log(error);
      }
    },
    async deleteThis() {
      try {
        const id = this.$route.params.id;
        const con_delete = confirm("정말로 삭제 하시겠습니까?");
        if (con_delete) {
          await deletePost(id);
          this.$router.push("/main");
        }
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

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@200;300;400;500;600;700;900&display=swap");
* {
  text-align: left;
}
#peomDetail {
  background-color: #fff;
  overflow-y: auto;
  width: 50%;
  margin: 0 auto;
  padding: 1rem;
  font-family: "Noto Serif KR", serif;

  .Detail_head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2rem;

    > div.poemInfo_title {
      display: flex;
      align-items: flex-end;

      > div.small_title {
        padding-bottom: 0.5rem;
      }

      h1 {
        font-size: 2rem;
        margin-right: 1rem;
      }
      small {
        padding-bottom: 0.5rem;
      }
    }
  }
  button {
    background-color: transparent;
    border: none;
    padding: 0.2rem;
    &:hover {
      background-color: #ababab;
      border-radius: 50px;
    }
    ion-icon {
      font-size: 1.5rem;
    }
  }
}
#viewer {
  min-height: calc(100vh - 200px);
  height: fit-content;
  padding: 2rem;
  box-sizing: border-box;

  .toastui-editor-contents pre code,
  .toastui-editor-contents {
    font-family: "Noto Serif KR", serif;
  }
  .toastui-editor-contents {
    font-size: 1rem;
  }
}
@media (max-width: 1320px) {
  #peomDetail {
    .Detail_head {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      padding: 0 0.5rem;

      > div.poemInfo_title {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        h1 {
          font-size: 2.5rem;
          margin-right: 1rem;
          margin-bottom: 0.5rem;
        }
        small {
          padding-bottom: 0.5rem;
        }
      }
    }
    button {
      background-color: transparent;
      border: none;
      margin-top: 0.5rem;
      padding: 0.2rem;
      &:hover {
        background-color: #ababab;
        border-radius: 50px;
      }
      ion-icon {
        font-size: 1rem;
      }
    }
  }
  #viewer {
    min-height: calc(100vh - 215px);
    height: fit-content;
    padding: 0.5rem;
    box-sizing: border-box;
    margin-top: 1rem;

    .toastui-editor-contents pre code,
    .toastui-editor-contents {
      font-family: "Noto Serif KR", serif;
    }
    .toastui-editor-contents {
      font-size: 0.9rem;
    }
  }
}
@media (max-width: 800px) {
  #peomDetail {
    background-color: #fff;
    overflow-y: auto;
    width: 90%;
    margin: 0 auto;
    padding: 0.5rem;
    font-family: "Noto Serif KR", serif;

    .Detail_head {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      padding: 0 0.5rem;

      > div.poemInfo_title {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        h1 {
          font-size: 1.5rem;
          margin-right: 1rem;
          margin-bottom: 0.5rem;
        }
        small {
          padding-bottom: 0.5rem;
        }
      }
    }
    button {
      background-color: transparent;
      border: none;
      margin-top: 0.5rem;
      padding: 0.2rem;
      &:hover {
        background-color: #ababab;
        border-radius: 50px;
      }
      ion-icon {
        font-size: 1rem;
      }
    }
  }
  #viewer {
    min-height: calc(100vh - 215px);
    height: fit-content;
    padding: 0.5rem;
    box-sizing: border-box;
    margin-top: 1rem;

    .toastui-editor-contents pre code,
    .toastui-editor-contents {
      font-family: "Noto Serif KR", serif;
    }
    .toastui-editor-contents {
      font-size: 0.9rem;
    }
  }
}
</style>
