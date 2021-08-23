<template>
  <form class="login" @submit.prevent="onSubmit">
    <h3>Регистрация</h3>
    <div class="login__item login__email">
      <input
        id="email"
        type="text"
        placeholder="E-mail"
        v-model.trim="email"
        :class="{
          invalid:
            ($v.email.$dirty && !$v.email.required) ||
            ($v.email.$dirty && !$v.email.email)
        }"
      />
      <!-- <label for="email">Email</label> -->
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
    <div class="login__item login__name">
      <input
        type="text"
        placeholder="Имя"
        v-model.trim="name"
        :class="{
          invalid: $v.name.$dirty && !$v.name.required
        }"
      />
      <small
        class="helper-text invalid"
        v-if="$v.name.$dirty && !$v.name.required"
        >Введите Имя</small
      >
    </div>
    <div class="login__agree">
      <input type="checkbox" id="cbx" v-model="agree" />
      <label for="cbx" class="check">
        <svg width="18px" height="18px" viewBox="0 0 18 18">
          <path
            d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"
          ></path>
          <polyline points="1 9 7 14 15 4"></polyline>
        </svg>
      </label>
      <span>С правилами согласен</span>
    </div>
    <button type="submit" class="btn btn-default">
      Зарегестрироваться
      <i class="fas fa-user-circle fa-2x" v-if="!loading"></i>
      <i class="fa fa-spinner fa-pulse fa-2x" v-else></i>
    </button>
    <div class="login__registr">
      Есть акаунта?
      <router-link to="/login"> Войти </router-link>
    </div>
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
    agree: false
  }),
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
    name: { required },
    agree: { checked: v => v }
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
      this.loading = true;
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name,
        users: (
          await firebase
            .database()
            .ref("users")
            .once("value")
        ).val()
      };

      await this.$store.dispatch("registr", formData);
      this.$router.push("/user");
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

  &__agree {
    width: 100%;
    margin: 10px 0;
    input {
      display: none;
    }
    span {
      font-weight: normal;
      margin-left: 10px;
    }
    .check {
      cursor: pointer;
      position: relative;
      margin: auto;
      width: 18px;
      height: 18px;
      -webkit-tap-highlight-color: transparent;
      transform: translate3d(0, 0, 0);
      &:before {
        content: "";
        position: absolute;
        top: -15px;
        left: -15px;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: rgba(#223254, 0.03);
        opacity: 0;
        transition: opacity 0.2s ease;
      }
      svg {
        position: relative;
        z-index: 1;
        fill: none;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke: #c8ccd4;
        stroke-width: 1.5;
        transform: translate3d(0, 0, 0);
        transition: all 0.2s ease;
        path {
          stroke-dasharray: 60;
          stroke-dashoffset: 0;
        }
        polyline {
          stroke-dasharray: 22;
          stroke-dashoffset: 66;
        }
      }
      &:hover {
        &:before {
          opacity: 1;
        }
        svg {
          stroke: #4285f4;
        }
      }
    }
    #cbx:checked + .check {
      svg {
        stroke: #4285f4;
      }
      path {
        stroke-dashoffset: 60;
        transition: all 0.3s linear;
      }
      polyline {
        stroke-dashoffset: 42;
        transition: all 0.2s linear;
        transition-delay: 0.15s;
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
