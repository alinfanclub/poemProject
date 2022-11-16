<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style lnag="scss">
#app {
  min-height: 100vh;
  margin: 0 auto;
  background-image: url(@/assets/paper_texture02.jpg);
  background-repeat: no-repeat;
  background-size: cover;
}
* {
  margin: 0;
  padding: 0;
}
</style>
