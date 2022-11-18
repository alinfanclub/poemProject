<template>
  <div>
    <div id="loginForm">
      <div id="loginMsg">
        <h1>Welcome!</h1>
        <p>Poem Project</p>
      </div>
      <form @submit.prevent="loginForm">
        <div>
          <label for="InputID"></label>
          <input
            type="email"
            id="InputID"
            v-model="username"
            placeholder="E-MAIL"
          />
        </div>
        <div>
          <label for="InputPassword"></label>
          <input
            type="password"
            id="InputPassword"
            v-model="password"
            placeholder="PASSWORD"
          />
        </div>
        <div class="loginBtns">
          <button>LOGIN</button>
          <router-link to="/signup">Sign up</router-link>
        </div>
        <p class="log">{{ loginMsg }}</p>
      </form>
    </div>
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

<style lang="scss">
// input:-webkit-autofill,
// input:-webkit-autofill:hover,
// input:-webkit-autofill:focus,
// input:-webkit-autofill:active {
//   transition: background-color 5000s ease-in-out 0s;
//   -webkit-transition: background-color 9999s ease-out;
//   -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
//   -webkit-text-fill-color: #000 !important;
// }

#loginForm {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  // background-color: rgb(253, 253, 195);
  width: 50%;
  min-width: 16.6rem;
  max-width: 27.7rem;
  height: fit-content;
  max-height: 40rem;

  #loginMsg {
    margin-bottom: 7rem;

    h1 {
      font-size: 4rem;
      margin-bottom: 1rem;
    }
    p {
      color: rgb(160, 160, 160);
      font-size: 2rem;
    }
  }

  form {
    > div {
      display: flex;
      justify-content: center;

      input {
        width: 100%;
        height: 3rem;
        margin: 1rem 0;
        border: none;
        border-bottom: 1px solid #333;
        padding: 0.5rem;
        box-sizing: border-box;
        font-size: 1rem;
        outline: none;
        background-color: transparent;

        &[type="password"] {
          // // font-size: 2rem;
          // color: blue;
          &::placeholder {
            font-size: 1rem;
          }
        }
      }

      &.loginBtns {
        align-items: center;
        flex-direction: column;
        margin-top: 2rem;

        a {
          margin-top: 2rem;
          color: #a2a2a2;
          &:hover {
            color: darkblue;
          }
        }

        button {
          border: 0;
          background-color: darkblue;
          color: #fff;
          font-size: 1.2rem;
          padding: 0.3rem 1rem;
          box-sizing: border-box;
          border-radius: 5px;
          width: 10rem;
        }
      }
    }
  }
}

@media (max-width: 800px) {
  #loginForm {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    // background-color: rgb(253, 253, 195);
    width: 90%;
    min-width: 16.6rem;
    max-width: 27.7rem;
    height: fit-content;
    max-height: 40rem;

    #loginMsg {
      margin-bottom: 5rem;

      h1 {
        font-size: 3rem;
        margin-bottom: 1rem;
      }
      p {
        color: rgb(160, 160, 160);
        font-size: 1.5rem;
      }
    }

    form {
      > div {
        display: flex;
        justify-content: center;

        input {
          width: 100%;
          height: 3rem;
          margin: 1rem 0;
          border: none;
          border-bottom: 1px solid #333;
          padding: 0.5rem;
          box-sizing: border-box;
          font-size: 1rem;
          outline: none;
          background-color: transparent;

          &[type="password"] {
            // // font-size: 2rem;
            // color: blue;
            &::placeholder {
              font-size: 1rem;
            }
          }
        }

        &.loginBtns {
          align-items: center;
          flex-direction: column;
          margin-top: 2rem;

          a {
            margin-top: 2rem;
            color: #a2a2a2;
            &:hover {
              color: darkblue;
            }
          }

          button {
            border: 0;
            background-color: darkblue;
            color: #fff;
            font-size: 1.2rem;
            padding: 0.3rem 1rem;
            box-sizing: border-box;
            border-radius: 5px;
            width: 10rem;
          }
        }
      }
    }
  }
}
</style>
