<template>
  <div id="createPost">
    <!-- <form @submit.prevent="createNewPost">
      <div>
        <label for="title">제목</label>
        <input type="text" name="title" id="title" v-model="title" />
      </div>
      <div>
        <label for="author">작가</label>
        <input type="text" name="author" id="author" v-model="author" />
      </div>
      <div>
        <label for="content">내용</label>
        <textarea type="text" name="content" id="content" v-model="content" />
      </div>

      <div>
        <label for="type">종류</label>
        <select id="type" v-model="type">
          <option value="자작 시">자삭 시</option>
          <option value="가져온 시">가져온 시</option>
        </select>
      </div>
      <button>submit</button>
      <p v-if="logMsg">{{ logMsg }}</p>
    </form> -->
    <div id="editor"></div>
  </div>
</template>

<script>
import { createPost } from "@/api/post";
import Editor from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";

export default {
  data() {
    return {
      title: "",
      type: "자작 시",
      author: "",
      content: "",
      logMsg: "",
      editor: null,
    };
  },
  mounted() {
    this.editor = new Editor({
      el: document.querySelector("#editor"),
      height: "500px",
      initialEditType: "markdown",
    });
  },
  methods: {
    async createNewPost() {
      try {
        const postData = {
          title: this.title,
          type: this.type,
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

<style lang="scss">
.toastui-editor-defaultUI .ProseMirror,
.toastui-editor-main .toastui-editor-md-tab-style > .active {
  background-color: #fff;
}
#createPost {
  width: 90%;
  margin: 0 auto;
  padding: 1rem;

  > form {
    display: flex;
    flex-direction: column;

    > div {
      display: flex;
      flex-direction: column;
      margin-bottom: 2rem;

      > label {
        margin-bottom: 0.5rem;
      }
    }

    input,
    textarea,
    select {
      width: 100%;
    }

    input {
      height: 3rem;
      padding: 1rem;
      box-sizing: border-box;
      font-size: 1.5rem;
    }

    textarea {
      resize: none;
      min-height: 10rem;
      padding: 1rem;
      box-sizing: border-box;
    }

    button {
      width: 3rem;
      height: auto;
      margin: 0 auto;
    }
  }
}
</style>
