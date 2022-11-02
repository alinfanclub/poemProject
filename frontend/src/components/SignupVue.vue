<template>
  <div>
    <form @submit.prevent="submitForm">
      <div>
        <label for="userId">ID</label>
        <input v-model="username" type="text" name="userId" id="userId" />
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
        const { data } = await registerUser(userData);
        console.log(data.username);
        this.logMsg = `${data.nickname}님이 성공적으로 가입 되었습니다.`;
        this.initForm();
      } catch (error) {
        this.logMsg = "올바른 입력값을 넣어 주세요";
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
div {
  display: flex;
  align-items: center;
  justify-content: space-between;

  label {
    margin-right: 20px;
  }
}
</style>
