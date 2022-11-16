<template>
  <div id="Header">
    <p>PoemProject</p>
    <div>
      <div v-if="this.$store.state.userName" class="login">
        <p>Hllow {{ this.$store.state.userName }}</p>
        <span>
          <button @click="logOut">log out</button>
        </span>
        <router-link to="/write">글 작성</router-link>
      </div>
      <div v-else>
        <button @click="logIn">login</button>
      </div>
    </div>
  </div>
</template>

<script>
import { deleteCookie } from "@/utils/cookies";

export default {
  methods: {
    async logOut() {
      try {
        await deleteCookie("til_auth");
        await deleteCookie("til_user");
        this.$store.state.token = "";
        this.$store.state.userName = "";
      } catch (error) {
        console.log(error);
      }
    },

    logIn() {
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss" scoped>
#Header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  margin-bottom: 50px;
  height: 5rem;
  padding: 0 1rem;

  .login {
    display: flex;
    align-items: center;

    button {
      margin: 0 10px;
    }
  }
}
</style>
