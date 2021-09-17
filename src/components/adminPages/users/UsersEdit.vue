<template>
  <div class="main-block">
    <div class="d-flex">
      <div class="create">
        <div class="create__item create__firstname d-flex">
          <p>Имя</p>
          <input
            v-model="userData.firstname"
            type="text"
            required
            placeholder="Имя"
          />
        </div>
        <div class="create__item create__lastname d-flex">
          <p>Фамилия</p>
          <input
            v-model="userData.lastname"
            type="text"
            required
            placeholder="Фамилия"
          />
        </div>
        <div class="create__item create__nickname d-flex">
          <p>Псевдоним</p>
          <input
            v-model="userData.nickname"
            type="text"
            placeholder="Псевдоним"
          />
        </div>
        <div class="create__item create__email d-flex">
          <p>E-mail</p>
          <input
            v-model="userData.email"
            type="email"
            required
            placeholder="E-mail"
          />
        </div>
        <div class="create__item create__adress d-flex">
          <p>Адресс</p>
          <input
            v-model="userData.adress"
            type="text"
            required
            placeholder="Адресс"
          />
        </div>
        <div class="create__item create__password d-flex">
          <p>Пароль</p>
          <input
            v-model="userData.password"
            type="password"
            required
            placeholder="Пароль"
          />
        </div>
      </div>
      <div class="create">
        <div class="create__item create__cardNumber d-flex">
          <p>Номер карты</p>
          <input
            v-model="userData.cardNumber"
            type="text"
            placeholder="Номер карты"
          />
        </div>
        <div class="create__sex d-flex">
          <p>Пол</p>
          <div class="create__sex-block d-flex">
            <input type="radio" id="male" value="male" v-model="userData.sex" />
            <label for="male">Мужской</label>
            <input
              type="radio"
              id="female"
              value="female"
              required
              v-model="userData.sex"
            />
            <label for="female">Женский</label>
          </div>
        </div>
        <div class="create__item create__phone d-flex">
          <p>Телефон</p>
          <input
            v-model="userData.phone"
            type="text"
            required
            placeholder="Телефон"
          />
        </div>
        <div class="create__item create__birth d-flex">
          <p>Дата рождения</p>
          <DatePicker
            class="birth-title"
            v-model="userData.birth"
            type="date"
            format="DD/MM/YYYY"
            :date="userData.birth"
            @dateChange="newDateValue"
          />
        </div>
        <div class="create__item create__city d-flex">
          <p>Город</p>
          <select v-model="userData.city" required class="form-control">
            <option disabled value="Город не указан">Город не выбран</option>
            <option value="Киев">Киев</option>
            <option value="Харьков">Харьков</option>
            <option value="Одесса">Одесса</option>
            <option value="Львов">Львов</option>
          </select>
        </div>
        <div class="create__item create__repassword d-flex">
          <p>Повторить пароль</p>
          <input
            v-model="userData.repassword"
            type="password"
            required
            placeholder="Повторить пароль"
          />
        </div>
      </div>
    </div>
    <button class="btn btn-default btn-save" ref="btnSave" @click="checking">
      Сохранить
    </button>
  </div>
</template>

<script>
import DatePicker from "@/components/adminPages/DatePicker.vue";
import firebase from "firebase";

export default {
  name: "UserEdit",
  components: {
    DatePicker
  },
  props: ["dataArr", "dataOb", "dbRef"],
  data() {
    return {
      ref: this.dbRef,
      userData: this.dataOb,
      usersData: this.dataArr

      // userData: {
      //   id: "",
      //   date: "11.11.11",
      //   birth: "День не указан",
      //   email: "E-mail не указан",
      //   phone: "Телефон не указан",
      //   firstname: "Имя не указано",
      //   lastname: "Фамимилия не указана",
      //   nickname: "Псевдоним не указан",
      //   city: "Город не указан",

      //   adress: "",
      //   password: "",
      //   cardNumber: "",
      //   sex: "",
      //   repassword: "",
      // },
    };
  },
  methods: {
    newDateValue(value) {
      this.userData.birth = value;
    },
    checking() {
      if (
        this.userData.password === this.userData.repassword &&
        this.userData.password !== undefined &&
        this.userData.password.toString.length < 1
      ) {
        this.onUpload();
      } else {
        alert("Пароли не совпадают");
      }
    },
    onUpload() {
      let newData = this.usersData.filter(user => {
        return user.id !== this.userData.id;
      });

      // let date = new Date();
      // let day;
      // if (date.getDate().toString().length === 1) {
      //   day = "0" + date.getDate();
      // } else {
      //   day = date.getDate();
      // }
      // let month;
      // if (date.getMonth().toString().length === 1) {
      //   month = "0" + date.getMonth();
      // } else {
      //   month = date.getMonth();
      // }
      // let year = date.getFullYear();
      // let dateCreate = `${day}.${month}.${year}`;

      // this.userData.id = Math.floor(Math.random() * 100000);
      // this.userData.date = dateCreate;
      // this.userData.mailing = false;
      this.userData.repassword = "";

      newData.unshift(this.userData);

      const baseRef = firebase.database().ref(this.ref);
      baseRef
        .set(newData)
        //   .then((this.$refs.btnSave.textContent = "Сохранено"))
        //   .then(this.$refs.btnSave.classList.remove("show"))
        .then(this.$router.push("/admin/users"));
    }
  },

  created() {
    if (this.dataArr !== undefined && this.dataArr.length > 0) {
      this.usersData = this.dataArr;
      if (this.dataOb !== undefined && Object.keys(this.dataOb).length !== 0) {
        this.userData = this.dataOb;
      } else {
        this.userData = {};
      }
    } else if (this.dataArr === undefined) {
      this.$router.push("/admin/users");
    }
  }
};
</script>

<style lang="scss" scoped>
.create {
  margin: 0 20px;
  width: 600px;
  &__item {
    padding: 15px 40px;
    input {
      width: 200px;
      padding: 5px;
      transition: width 0.4s ease-in-out;
      &::placeholder {
        padding-left: 7px;
      }
      &:focus {
        width: 40%;
        padding-left: 10px;
      }
    }
  }
  &__firstname {
    padding-top: 40px;
    input {
      margin-left: 140px;
    }
  }
  &__lastname {
    input {
      margin-left: 105px;
    }
  }

  &__nickname {
    input {
      margin-left: 87px;
    }
  }
  &__email {
    input {
      margin-left: 127px;
    }
  }
  &__adress {
    input {
      margin-left: 119px;
    }
  }
  &__password {
    input {
      margin-left: 116px;
    }
  }
  &__cardNumber {
    padding-top: 40px;
    input {
      margin-left: 73px;
    }
  }
  &__phone {
    input {
      margin-left: 108px;
    }
  }
  &__repassword {
    input {
      margin-left: 35px;
    }
  }
  &__sex {
    padding: 15px 40px;

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
      margin-left: 58px;
    }
  }
  &__city {
    .form-control {
      margin-left: 128px;
      width: 200px;
      padding: 5px;
      transition: width 0.4s ease-in-out;
      &::placeholder {
        padding-left: 7px;
      }
      &:focus {
        width: 40%;
        padding-left: 10px;
      }
    }
  }
}
.btn {
  &-save {
    margin: 40px 100px;
    /* &.show {
      color: #178817;
      border: 2px solid #55cc55;
    } */
  }
}
</style>
