<template>
  <div>
    <form @submit.prevent="loginForm">
      <div>
        <label for="InputID"></label>
        <input type="text" id="InputID" v-model="username" />
      </div>
      <div>
        <label for="InputPassword"></label>
        <input type="password" id="InputPassword" v-model="password" />
      </div>
      <button>submit</button>
      <p class="log">{{ loginMsg }}</p>
    </form>
    <router-link to="/signup">회원가입</router-link>
  </div>
</template>

<script>
import { logIn } from "../api/auth";
import { validateEmail } from "@/utils/validation";
import { saveAuthToCookie, saveUserToCookie } from "@/utils/cookies";
export default {
  data() {
    return {
      username: "",
      password: "",
      //loginData
      loginMsg: "",
    };
  },
  methods: {
    async loginForm() {
      try {
        const loginData = {
          username: this.username,
          password: this.password,
        };
        const { data } = await logIn(loginData);
        this.$store.commit("setUsername", data.user.nickname);
        this.$store.commit("setToken", data.token); // 토큰 셋팅
        saveAuthToCookie(data.token);
        saveUserToCookie(data.user.nickname);
        console.log(data.user);
        this.$router.push("/main");
      } catch (error) {
        console.log(error.response.data);
        this.loginMsg = error.response.data;
      } finally {
        this.initForm();
      }
    },
    initForm() {
      this.username = "";
      this.password = "";
      this.nickname = "";
    },
  },
  computed: {
    isFormValid() {
      return validateEmail(this.username);
    },
  },
};
</script>

<style></style>
