<template>
  <div class="main-block">
    <h3>Страница пользователя</h3>
    <div class="container">
      <div class="create">
        <div class="create__item create__firstname">
          <p>Имя</p>
          <input
            v-model="user.firstname"
            type="text"
            class="form-control"
            placeholder="Имя"
          />
        </div>
        <div class="create__item create__lastname">
          <p>Фамилия</p>
          <input
            v-model="user.lastname"
            type="text"
            class="form-control"
            placeholder="Фамилия"
          />
        </div>
        <div class="create__item create__nickname">
          <p>Псевдоним</p>
          <input
            v-model="user.nickname"
            type="text"
            class="form-control"
            placeholder="Псевдоним"
          />
        </div>
        <div class="create__item create__email">
          <p>E-mail</p>
          <input
            v-model="user.email"
            type="email"
            class="form-control"
            placeholder="E-mail"
          />
        </div>
        <div class="create__item create__adress">
          <p>Адресс</p>
          <input
            v-model="user.adress"
            type="text"
            class="form-control"
            placeholder="Адресс"
          />
        </div>
        <div class="create__item create__password">
          <p>Пароль</p>
          <input
            v-model="user.password"
            :type="passwordType"
            class="form-control"
            placeholder="Пароль"
          />
          <i
            class="fas fa-eye-slash"
            @click="passwordVisibility"
            v-if="passwordType === 'password'"
          ></i>
          <i class="fas fa-eye" @click="passwordVisibility" v-else></i>
        </div>
      </div>

      <div class="create">
        <div class="create__item create__cardNumber">
          <p>Номер карты</p>
          <input
            v-model="user.cardNumber"
            type="text"
            class="form-control"
            placeholder="Номер карты"
          />
        </div>
        <div class="create__sex d-flex">
          <p>Пол</p>
          <div class="create__sex-block d-flex">
            <input type="radio" id="male" value="male" v-model="user.sex" />
            <label for="male">Мужской</label>
            <input type="radio" id="female" value="female" v-model="user.sex" />
            <label for="female">Женский</label>
          </div>
        </div>
        <div class="create__item create__phone">
          <p>Телефон</p>
          <input
            v-model="user.phone"
            type="text"
            class="form-control"
            placeholder="Телефон"
          />
        </div>
        <div class="create__item create__birth">
          <p>Дата рождения</p>
          <DatePicker
            class="birth-title"
            v-model="user.birth"
            type="date"
            format="DD/MM/YYYY"
            :date="user.birth"
            @dateChange="newDateValue"
          />
        </div>
        <div class="create__item create__city">
          <p>Город</p>
          <select v-model="user.city" required class="form-control">
            <option disabled value="Город не указан">Город не выбран</option>
            <option value="Киев">Киев</option>
            <option value="Харьков">Харьков</option>
            <option value="Одесса">Одесса</option>
            <option value="Львов">Львов</option>
          </select>
        </div>
        <div class="create__item create__repassword">
          <p>Повторить пароль</p>
          <input
            v-model="user.repassword"
            :type="repasswordType"
            class="form-control"
            placeholder="Повторить пароль"
          />
          <i
            class="fas fa-eye-slash"
            @click="repasswordVisibility"
            v-if="repasswordType === 'password'"
          ></i>
          <i class="fas fa-eye" @click="repasswordVisibility" v-else></i>
        </div>
      </div>
    </div>
    <button class="btn btn-default btn-save" ref="btnSave" @click="checking">
      Сохранить
      <i class="fa fa-spinner fa-pulse fa-2x" v-if="loading"></i>
      <i class="fas fa-user-circle fa-2x" v-else></i>
    </button>
  </div>
</template>

<script>
import DatePicker from "@/components/adminPages/DatePicker.vue";
import firebase from "firebase";

export default {
  name: "User",
  components: {
    DatePicker
  },
  data() {
    return {
      userData: [],
      loading: false,
      passwordType: "password",
      repasswordType: "password"
    };
  },
  watch: {
    loading() {}
  },
  methods: {
    passwordVisibility() {
      this.passwordType =
        this.passwordType === "password" ? "text" : "password";
    },
    repasswordVisibility() {
      this.repasswordType =
        this.repasswordType === "password" ? "text" : "password";
    },
    newDateValue(value) {
      this.user.birth = value;
    },
    checking() {
      if (
        this.user.password === this.user.repassword &&
        this.user.password !== undefined &&
        this.user.password.toString.length < 1
      ) {
        this.onUpload();
      } else {
        alert("Пароли не совпадают");
      }
    },
    async onUpload() {
      this.loading = true;

      let newData = this.userData.filter(user => {
        return user.id !== this.user.id;
      });
      this.user.repassword = "";
      newData.push(this.user);
      await firebase
        .database()
        .ref("users")
        .set(newData);
      (this.loading = false)((this.$refs.btnSave.textContent = "Сохранено"));
      this.$refs.btnSave.classList.add("show");
    }
  },
  computed: {
    user() {
      return this.$store.getters.info;
    }
  },
  async mounted() {
    this.userData = (
      await firebase
        .database()
        .ref("users")
        .once("value")
    ).val();
  }
};
</script>

<style lang="scss" scoped>
.main-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  h3 {
    margin: 20px 0 40px 0;
  }
  .container {
    display: flex;
    justify-content: space-between;
  }
  i {
    color: #ccc;
  }
}

.create {
  width: 40%;
  &__item {
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    input {
      width: 250px;
      padding: 5px 10px;
      transition: width 0.4s ease-in-out;
    }
  }

  &__sex {
    padding: 10px 20px;
    &-block {
      padding: 0 110px;
      align-items: center;

      input {
        margin: 10px 10px 15px 30px;
      }
      label {
        font-weight: normal;
      }
    }
  }
  &__birth {
    .birth-title {
      width: 250px;
    }
  }
  &__city {
    .form-control {
      width: 250px;
    }
  }
  &__password,
  &__repassword {
    position: relative;
    i {
      position: absolute;
      right: 30px;
      top: 20px;
    }
  }
}

.btn {
  &-save {
    margin: 40px 0;
    width: 200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &.show {
      color: #178817;
      border: 2px solid #55cc556b;
      justify-content: center;
    }
  }
}
</style>
