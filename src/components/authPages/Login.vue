<template>
  <form class="login" @submit.prevent="onSubmit">
    <h3>Вход</h3>
    <div class="login__item login__email">
      <input
        type="text"
        placeholder="E-mail"
        v-model.trim="email"
        :class="{
          invalid:
            ($v.email.$dirty && !$v.email.required) ||
            ($v.email.$dirty && !$v.email.email)
        }"
      />
      <small
        class="helper-text invalid"
        v-if="$v.email.$dirty && !$v.email.required"
        >Поле Email не должно быть пустым</small
      >
      <small
        class="helper-text invalid"
        v-else-if="$v.email.$dirty && !$v.email.email"
        >Введите корректный Email</small
      >
    </div>
    <div class="login__item login__password">
      <input
        id="password"
        :type="passwordType"
        placeholder="Пароль"
        v-model.trim="password"
        :class="{
          invalid:
            ($v.password.$dirty && !$v.password.required) ||
            ($v.password.$dirty && !$v.password.minLength)
        }"
      />
      <label
        for="password"
        :class="{
          invalid:
            ($v.password.$dirty && !$v.password.required) ||
            ($v.password.$dirty && !$v.password.minLength)
        }"
        class="login__password-visibility"
        @click="passwordVisibility"
      >
        <i class="fas fa-eye-slash" v-if="passwordType === 'password'"></i>
        <i class="fas fa-eye" v-else></i>
      </label>
      <small
        class="helper-text invalid"
        v-if="$v.password.$dirty && !$v.password.required"
        >Введите пароль</small
      >
      <small
        class="helper-text invalid"
        v-else-if="$v.password.$dirty && !$v.password.minLength"
        >Пароль должен быть {{ $v.password.$params.minLength.min }} символов.
        Сейчас он {{ password.length }}</small
      >
    </div>
    <button type="submit" class="btn btn-default">
      Войти <i class="fas fa-sign-in-alt fa-2x"></i>
    </button>
    <div class="login__registr">
      Нет акаунта?
      <router-link to="/registr"> Зарегестрироваться </router-link>
    </div>
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
    },
    async onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const formData = {
        email: this.email,
        password: this.password
      };

      await this.$store.dispatch("login", formData);
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  padding: 40px;
  background: #fff;
  border-radius: 5px;

  &__item {
    width: 100%;

    input {
      width: 100%;
      height: 40px;
      margin: 30px 0 10px 0;
      border: none;
      border-bottom: 1px solid #ccc;
      &:focus {
        outline: none;
        border-color: #1dac24;
      }

      &.invalid {
        border-color: #f44336;
        margin: 19px 0 0;
      }
    }
    small {
      color: #f44336;
    }
  }

  &__password {
    position: relative;

    &-visibility {
      position: absolute;
      top: 40px;
      right: 10px;

      &.invalid {
        top: 30px;
      }
    }
  }

  .btn {
    width: 100%;
    margin: 20px 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* text-transform: uppercase; */
  }
  i {
    color: #ccc;
  }
}
</style>
