<template>
  <form class="login" @submit.prevent="onSubmit">
    <h3>Вход</h3>
  </form>
</template>

<script>
import { email, required, minLength } from "vuelidate/lib/validators";

export default {
  name: "Login",
  data: () => ({
    passwordType: "password",
    email: "",
    password: ""
  }),
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) }
  },
  methods: {
    passwordVisibility() {
      this.passwordType =
        this.passwordType === "password" ? "text" : "password";
    }
  }
};
</script>

<style lang="scss" scoped></style>
