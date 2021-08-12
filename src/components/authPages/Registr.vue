<template>
  <form class="login" @submit.prevent="onSubmit">
    <h3>Регистрация</h3>

  </form>
</template>

<script>
import { email, required, minLength } from "vuelidate/lib/validators";
import firebase from "firebase";

export default {
  name: "Registr",
  data: () => ({
    loading: false,
    passwordType: "password",
    email: "",
    password: "",
    name: "",
    agree: false,
  }),
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
    name: { required },
    agree: { checked: (v) => v },
  },
  methods: {
    passwordVisibility() {
      this.passwordType =
        this.passwordType === "password" ? "text" : "password";
    },

  },
};
</script>


<style lang="scss" scoped>

</style>