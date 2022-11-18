<template>
  <div>
    <HeaderVue></HeaderVue>
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
      <div class="postInfo">
        <div>
          <!-- <label for="title">제목</label> -->
          <input
            type="text"
            name="title"
            id="title"
            v-model="title"
            placeholder="제목"
          />
        </div>
        <div>
          <!-- <label for="author">작가</label> -->
          <input
            type="text"
            name="author"
            id="author"
            v-model="author"
            placeholder="작가"
          />
        </div>
        <div>
          <!-- <label for="type">종류</label> -->
          <select id="type" v-model="type">
            <option value="null" disabled>시 종류</option>
            <option value="자작 시">자삭 시</option>
            <option value="가져온 시">가져온 시</option>
          </select>
        </div>
      </div>
      <div id="editor" ref="toastuiEditor"></div>
      <!-- <button @click="getMarkdown()">sumit</button> -->
      <div class="submit_btn">
        <button class="" @click="createNewPost()">SUBMIT</button>
      </div>
      <!-- <button @click="getHtml()">sumithtml</button> -->
    </div>
  </div>
</template>

<script>
import { createPost } from "@/api/post";
import Editor from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "prismjs/themes/prism.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import Prism from "prismjs";
import "prismjs/components/prism-clojure.js";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";

import colorSyntax from "@toast-ui/editor-plugin-color-syntax";

import HeaderVue from "@/components/common/HeaderVue.vue";

export default {
  data() {
    return {
      title: "",
      type: "자작 시",
      author: "",
      content: "",
      logMsg: "",
      editor: null,
      markdown: "",
    };
  },
  components: {
    HeaderVue,
  },
  mounted() {
    if (window.innerWidth > 800) {
      this.editor = new Editor({
        el: document.querySelector("#editor"),
        height: "75vh",
        initialEditType: "markdown",
        previewStyle: "vertical",
        previewHighlight: false,
        exts: ["myExt"],
        placeholder: "Please enter text.",
        plugins: [[colorSyntax, codeSyntaxHighlight, { highlighter: Prism }]],
      });
    } else {
      this.editor = new Editor({
        el: document.querySelector("#editor"),
        height: "75vh",
        initialEditType: "markdown",
        previewStyle: "tap",
        previewHighlight: false,
        exts: ["myExt"],
        placeholder: "Please enter text.",
      });
    }
  },
  methods: {
    async createNewPost() {
      try {
        this.markdown = this.editor.getMarkdown();
        const postData = {
          title: this.title,
          type: this.type,
          content: this.markdown,
          owner: this.$store.state.userName,
          author: this.author,
        };
        await createPost(postData);
        this.$router.push("/main");
      } catch (error) {
        this.logMsg = "로그인을 해주세요";
      }
    },
    getMarkdown() {
      this.markdown = this.editor.getMarkdown();
      console.log(this.markdown);
    },
  },
};
</script>

<style lang="scss">
.toastui-editor-defaultUI .ProseMirror,
.toastui-editor-main .toastui-editor-md-tab-style > .active,
.toastui-editor-main
  .toastui-editor-md-vertical-style
  .toastui-editor-md-preview {
  background-color: #fff;
}
#createPost {
  width: 90%;
  margin: 0 auto;
  padding: 1rem;

  div.postInfo {
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;

    > label {
      margin-bottom: 0.5rem;
    }

    input,
    textarea,
    select {
      width: 100%;
    }

    input {
      height: 2rem;
      padding: 1rem;
      box-sizing: border-box;
      font-size: 1rem;
      margin-bottom: 1rem;
      border: 1px solid #ddd;
      color: #333;
      &::placeholder {
        font-size: 1rem;
        color: #333;
      }
    }
    select {
      font-size: 1rem;
      height: 2rem;
      padding: 0 1rem;
      border: 1px solid #ddd;
      font-size: 1rem;
      color: #333;
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

  .submit_btn {
    width: 100%;
    text-align: right;
    margin-top: 1rem;

    > button {
      background-color: yellowgreen;
      color: #fff;
      border: none;
      border-radius: 20px;
      padding: 0.5rem;
      cursor: pointer;

      &:hover {
        background-color: green;
      }
    }
  }
}
</style>
