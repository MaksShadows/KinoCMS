<template>
  <div class="auth">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "AuthLayout",
  components: {},
  computed: {
    error() {
      return this.$store.getters.error;
    },
  },
  watch: {
    error(fbError) {
      console.log(fbError.code);
      if (fbError.code === "auth/user-not-found") {
        alert("Такого пользователя не существует");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.auth {
  height: 100vh;
  background: #00000069;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>