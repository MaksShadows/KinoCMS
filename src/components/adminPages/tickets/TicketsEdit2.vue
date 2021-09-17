<template>
  <div class="main-block">
    <div class="create">
      <div class="create__item create__movie d-flex">
        <p>Фильм</p>
        <select v-model="ticket.movie" class="form-control">
          <!-- <option value="">Веберите фильм</option> -->
          <option v-for="movie in moviesData" :key="movie.id" :value="movie.id">
            {{ movie.name }}
          </option>
        </select>
      </div>

      <div class="create__item create__cinema">
        <p>Кинотеатр</p>
        <div
          class="create__cinema-block"
          v-for="cinema in cinemaData"
          :key="cinema.id"
        >
          <div class="create__cinema-block-inner">
            <label :for="cinema.id">{{ cinema.name }}</label>
            <input
              type="checkbox"
              :id="cinema.id"
              :value="cinema.id"
              v-model="ticket.cinema"
            />
          </div>

          <div
            class="create__cinema-block-hall"
            v-if="ticket.cinema.find(item => item.id == cinema.id)"
          >
            <div
              class="create__cinema-block-hall-inner"
              v-for="hall in cinema.hallList"
              :key="hall.id"
            >
              <input
                type="checkbox"
                :id="hall.id"
                :value="hall.id"
                v-model="ticket.hall"
              />
              <label :for="hall.id">{{ hall.number }}</label>
            </div>
          </div>
        </div>
      </div>

      <div class="create__item create__date d-flex">
        <p>В кино с</p>
        <DatePicker
          class="create__date-title"
          :date="ticket.date"
          @dateChange="newDateValue"
        />
      </div>
      <div class="create__status">
        <div class="custom-control custom-switch custom-switch-on-success">
          <input
            v-model="ticket.status"
            type="checkbox"
            class="custom-control-input"
            id="customSwitch3"
          />
          <label
            class="custom-control-label"
            for="customSwitch3"
            v-if="ticket.status"
          >
            Уже в кино
          </label>
          <label class="custom-control-label" for="customSwitch3" v-else
            >Скоро в кино
          </label>
        </div>
      </div>
      <div class="create__item create__price d-flex">
        <p>Цена</p>
        <input v-model="ticket.price" type="text" placeholder="Цена" />
      </div>
    </div>
    <button class="btn btn-default btn-save" ref="btnSave" @click="onUpload">
      Сохранить
    </button>
  </div>
</template>

<script>
import DatePicker from "@/components/adminPages/DatePicker.vue";
import firebase from "firebase";

export default {
  name: "TicketsEdit",
  components: {
    DatePicker
  },
  props: {
    ticket: {
      type: Object,
      default: () => {
        return {
          movie: {},
          cinema: [],
          hall: [],
          date: "",
          time: "20:00",
          price: "",
          status: false
        };
      }
    },
    ticketsData: {
      type: Array,
      default: () => []
    },
    ref: {
      type: String,
      default: "tickets"
    }
  },
  data() {
    return {
      cinemaData: [],
      moviesData: []

      // ticket: {
      //   movie: {},
      //   cinema: [],
      //   hall: [],
      //   date: "",
      //   time: "20:00",
      //   price: "",
      //   status: false,
      // },
    };
  },
  methods: {
    newDateValue(value) {
      this.ticket.date = value;
    },

    onUpload() {
      let newData = this.ticketsData.filter(ticket => {
        return ticket.id !== this.ticket.id;
      });
      this.ticket.id = Math.floor(Math.random() * 10000);
      newData.push(this.ticket);

      // const baseRef = firebase.database().ref(this.ref);
      // baseRef
      //   .set(newData)
      //   .then((this.$refs.btnSave.textContent = "Сохранено"))
      //   .then(this.$refs.btnSave.classList.add("show"));

      // .then(this.$router.push("/admin/"+this.ref));
    }
  },

  created() {
    const cinemaRef = firebase.database().ref("cinema");
    cinemaRef.on("value", snapshot => {
      if (snapshot.val() !== null) {
        this.cinemaData = snapshot.val();
      }
    });
    const moviesRef = firebase.database().ref("movies");
    moviesRef.on("value", snapshot => {
      if (snapshot.val() !== null) {
        this.moviesData = snapshot.val().current.concat(snapshot.val().new);
      }
    });
  }
  //   created() {
  //     if (this.dataArr !== undefined && this.dataArr.length > 0) {
  //       this.usersData = this.dataArr;
  //       if (this.dataOb !== undefined && Object.keys(this.dataOb).length !== 0) {
  //         this.userData = this.dataOb;
  //       } else {
  //         this.userData = {};
  //       }
  //     } else if (this.dataArr === undefined) {
  //       this.$router.push("/admin-users");
  //     }
  //   },
};
</script>

<style lang="scss" scoped>
.main-block {
}
.create {
  &__item {
    padding: 20px 40px;
    min-width: 600px;
    width: 100%;
    p {
      width: 20%;
      margin: 5px;
    }
    /* input {
      width: 80%;
      margin-left: 35px;
      padding: 5px;
      &::placeholder {
        padding-left: 7px;
      }
      &:focus {
        padding-left: 10px;
      }
    } */
  }

  &__movie {
    select {
      width: 50%;
    }
  }
  &__cinema {
    display: flex;
    p {
      margin-right: 10%;
    }

    &-block {
      width: 80%;
      &-inner {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        margin-right: 20px;
        label {
          margin: 5px 10px;
        }
      }
      &-hall {
        &-inner {
          display: flex;
          align-items: center;
          padding-left: 30px;
          label {
            margin: 5px 10px;
            font-weight: normal;
          }
        }
      }
    }
  }
  &__hall {
  }
  &__date {
    &-title {
    }
  }
  &__time {
  }
  &__status {
    padding: 20px 10%;
    label {
      margin: 5px 10px;
      font-weight: normal;
    }
  }
  &__price {
    input {
      width: 20%;
      padding: 5px;
      &::placeholder {
        padding-left: 7px;
      }
      &:focus {
        padding-left: 10px;
      }
    }
  }
}
.btn {
  &.gallery__block-add {
    width: 130px;
    height: 80px;
    margin: 25px 70px;
  }
  &-save {
    margin: 0 0 20px 20px;
    &.show {
      color: #178817;
      border: 2px solid #55cc55;
    }
  }
}
</style>
