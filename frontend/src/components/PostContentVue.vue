<template>
  <div>
    <HeaderVue></HeaderVue>
    <div id="createPost">
      <div class="postInfo">
        <div>
          <input
            type="text"
            name="title"
            id="title"
            v-model="title"
            placeholder="제목"
          />
        </div>
        <div>
          <input
            type="text"
            name="author"
            id="author"
            v-model="author"
            placeholder="작가"
          />
        </div>
        <div>
          <select id="type" v-model="type">
            <option value="null" disabled>시 종류</option>
            <option value="창작 시">창작 시</option>
            <option value="가져온 시">가져온 시</option>
          </select>
        </div>
      </div>
      <div id="editor" ref="toastuiEditor"></div>
      <div class="submit_btn">
        <button class="" @click="createNewPost()">SUBMIT</button>
        <!-- <button class="" @click="temporarilySave()">임시저장</button> -->
      </div>
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
      type: "창작 시",
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
        hooks: {
          // addImageBlobHook: this.upload,
        },
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
        plugins: [[colorSyntax, codeSyntaxHighlight, { highlighter: Prism }]],
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
    async upload(file, setText) {
      try {
        if (!file) return false;

        // 이미지 제외 막기 처리하기
        if (file && file.size > 5242880) {
          const size = (file.size / (1000 * 1000)).toFixed(1);
          alert(
            `최대 업로드 사이즈(5 MB)를 초과 하였습니다.\n현재 사이즈 ${size}MB`
          );

          return false;
        }
        // api 업로드 만들기
        const formData = new FormData();
        formData.append("image", file);
        // 요청 보내고
        // 해당 부분은 구현해야한다
        // const { data } = await uploadImageFile(formData);
        // if (data.success === true) {
        setText(file.name, "image");
        // }
      } catch (e) {
        alert("파일 업로드에 실패하였습니다");
      }
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
