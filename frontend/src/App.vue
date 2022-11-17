<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style lang="scss">
#app {
  min-height: 100vh;
  margin: 0 auto;
  /* background-image: url(@/assets/paper_texture02.jpg); */
  background-color: #f2f2f2;
  background-repeat: no-repeat;
  background-size: cover;
  font-family: "Poppins", sans-serif;
}
* {
  margin: 0;
  padding: 0;
}
a {
  color: #333;
  text-decoration: none;
}
</style>
