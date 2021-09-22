<template>
  <div class="container">
    <div class="filter d-flex">
      <select class="filter__item filter__cinema" v-model="cinemas">
        <option :value="null">-- Кинотеатр --</option>
        <option
          v-for="cinema in cinemaData"
          :key="cinema.id"
          :value="cinema.id"
        >
          {{ cinema.name }}
        </option>
      </select>

      <select class="filter__item filter__hall" v-model="hall">
        <option :value="null">-- Зал --</option>
        <option value="Зал1 (Красний)">Зал1 (Красний)</option>
        <option value="Зал2 (Синий)">Зал2 (Синий)</option>
        <!-- <option v-for="hall in sortedHalls" :key="hall.id" :value="hall.id">
          {{ hall.number }}
        </option> -->
      </select>

      <select class="filter__item filter__movies" v-model="movie">
        <option :value="null">-- Фильмы --</option>
        <option v-for="movie in sortedMovies" :key="movie.id" :value="movie.id">
          {{ movie.name }}
        </option>
      </select>

      <DatePicker
        class="filter__item filter__date"
        v-model="date"
        :date="date"
        type="date"
        format="DD MMMM"
        @dateChange="newDateValue"
      />
    </div>
    <div>
      <div class="movies__list">
        <PosterList
          v-for="movie in filteredMovies"
          :key="movie.id"
          :movieData="movie"
        />
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from "@/components/adminPages/DatePicker.vue";
import PosterList from "@/components/mainPages/poster/PosterList.vue";
import firebase from "firebase";

export default {
  name: "Schedule",
  components: {
    DatePicker,
    PosterList
  },

  data() {
    return {
      ticketsData: [],
      // ticketCinema: [],
      // ticketMovie: {},
      // ticketHall: [],
      cinemaData: [],
      moviesData: [],

      cinemas: null,
      hall: null,
      movie: null,
      date: null
    };
  },
  watch: {
    cinemas() {
      this.hall = null;
    },
    movie() {
      this.cinemas = null;
      this.hall = null;
    }
  },
  computed: {
    filteredMovies() {
      let sortedMovie = [];

      if (this.cinemas && !this.hall) {
        let movie = this.ticketsData.filter(ticket => {
          let currentCinema = ticket.cinema.filter(cinema => {
            return cinema.id === this.cinemas;
          });
          if (currentCinema.length > 0) {
            return ticket.cinema;
          }
        });
        sortedMovie = movie.map(ticket => {
          return ticket.movie;
        });
      } else if (this.cinemas && this.hall) {
        let movie = this.ticketsData.filter(ticket => {
          let currentHall = ticket.hall.filter(hall => {
            return hall.id === this.hall;
          });
          if (currentHall.length > 0) {
            return ticket.hall;
          }
        });
        sortedMovie = movie.map(ticket => {
          return ticket.movie;
        });
      } else if (this.movie) {
        let movie = this.ticketsData.filter(ticket => {
          return ticket.movie.id === this.movie;
        });
        console.log(movie);
        sortedMovie = movie.map(ticket => {
          return ticket.movie;
        });
      }
      return sortedMovie;
    },
    sortedHalls() {
      let halls;
      if (this.cinemas) {
        let cinema = this.cinemaData.filter(cinema => {
          return cinema.id === this.cinemas;
        });
        halls = cinema[0].hallList;
        return halls;
      } else return halls;
    },
    sortedMovies() {
      let movie = this.ticketsData.map(ticket => {
        return ticket.movie;
      });
      return movie;
    }
  },
  methods: {
    newDateValue(value) {
      this.date = value;
    }
  },
  created() {
    const ticketsRef = firebase.database().ref("tickets");
    ticketsRef.on("value", snapshot => {
      if (snapshot.val() !== null) {
        this.ticketsData = snapshot.val();
        // this.ticketsData.map((ticket) => {
        // this.ticketCinema = ticket.cinema;
        // console.log(this.ticketCinema);
        // this.ticketHall = ticket.hall;
        // console.log(this.ticketHall);
        // this.ticketMovie = ticket.movie;
        //   this.date = ticket.date;
        // });
      }
    });
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
};
</script>

<style lang="scss" scoped>
.filter {
  margin-bottom: 30px;
  &__item {
    width: 200px;
    margin: 10px 20px;
    /* padding: 5px; */
    text-align-last: center;
  }
}
.movies {
  &__list {
    width: 80%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
}
</style>
