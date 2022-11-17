<template>
  <div id="Header">
    <p><router-link to="/">PoemProject</router-link></p>
    <div>
      <div v-if="this.$store.state.userName" class="login">
        <p class="user_name" @click="mb_toggle">
          Hllow {{ this.$store.state.userName }}
        </p>
        <div class="mb_menu" v-if="mb_menu">
          <span class="logout_btn">
            <button @click="logOut">log out</button>
          </span>
          <router-link to="/write" class="">글 작성</router-link>
        </div>
        <span class="logout_btn">
          <button @click="logOut">log out</button>
        </span>
        <router-link to="/write" class="post_btn">글 작성</router-link>
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
  data() {
    return {
      mb_menu: false,
    };
  },
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
    mb_toggle() {
      if (this.mb_menu == false && window.innerWidth <= 800) {
        this.mb_menu = true;
      } else {
        this.mb_menu = false;
      }
    },
  },
  mounted() {
    // const mb = document.querySelector(".mb_menu");
    // const user_name = document.querySelector(".user_name");
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
  // margin-bottom: 50px;
  height: 5rem;
  padding: 0 1rem;
  position: relative;
  // display: none;
  .mb_menu {
    position: absolute;
    background-color: #fff;
    border: 1px solid #9c9c9c;
    bottom: -120%;
    width: 7rem;
    height: 7rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    > .logout_btn {
      display: flex;
      margin-bottom: 2rem;
    }
  }

  .login {
    display: flex;
    align-items: center;

    button {
      margin: 0 10px;
    }
  }
}

@media (max-width: 800px) {
  #Header {
    background-color: #fff;
    border-bottom: 1px solid #ddd;
    margin-bottom: 1rem;
    z-index: 5;

    .post_btn,
    .logout_btn {
      display: none;
    }
  }
}
</style>
