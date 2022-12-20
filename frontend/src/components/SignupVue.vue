<template>
  <div id="signupPage">
    <form @submit.prevent="submitForm">
      <div>
        <label for="userId">E-mail</label>
        <input v-model="username" type="email" name="userId" id="userId" />
      </div>
      <div>
        <label for="userPassword">Passwrod</label>
        <input
          v-model="password"
          type="password"
          name="userPassword"
          id="userPassword"
        />
      </div>
      <div>
        <label for="userNickname">Nickname</label>
        <input
          v-model="nickname"
          type="text"
          name="userNickname"
          id="userNickname"
        />
      </div>
      <button>submit</button>
    </form>
  </div>
</template>

<script>
import { registerUser } from "@/api/auth";
import { validateEmail } from "@/utils/validation";

export default {
  data() {
    return {
      username: "",
      password: "",
      nickname: "",
    };
  },
  methods: {
    async submitForm() {
      try {
        const userData = {
          username: this.username,
          password: this.password,
          nickname: this.nickname,
        };

        const signupCheck = confirm("정말로 가입 하시겠습니까?");
        if (signupCheck) {
          const { data } = await registerUser(userData);
          console.log(data.username);
          this.logMsg = `${data.nickname}님이 성공적으로 가입 되었습니다.`;
          this.initForm();
          alert(`${data.nickname}님이 성공적으로 가입 되었습니다.`);
          this.$router.push("/login");
        }
      } catch (error) {
        this.logMsg = "올바른 입력값을 넣어 주세요";
        alert("이미 가입되어있습니다.");
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

<style lang="scss" scoped>
#signupPage {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  form {
    width: 30rem;
    > div {
      display: flex;
      justify-content: center;
      align-items: center;
      label {
        width: 5rem;
      }
      input {
        width: 90%;
        height: 3rem;
        margin: 1rem 0;
        border: none;
        padding: 0.5rem;
        box-sizing: border-box;
        font-size: 1rem;
        outline: none;
        background-color: transparent;
        background-color: #fff;
        border: 1px solid #c2c2c2;

        &[type="password"] {
          // // font-size: 2rem;
          // color: blue;
          &::placeholder {
            font-size: 1rem;
          }
        }
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
      display: flex;
      justify-content: center;
      margin: 0 auto;
      margin-top: 2rem;
    }
  }
}
</style>
