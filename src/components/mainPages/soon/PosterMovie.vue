<template>
  <div class="poster container">
    <div class="trailer">
      <iframe
        width="100%"
        height="640"
        :src="'https://www.youtube.com/embed/' + movieData.trailer"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>

    <div class="filter d-flex">
      <select class="filter__item filter__cinema" v-model="cinemas">
        <option :value="null">-- Кинотеатр --</option>
        <option
          v-for="cinema in sortedSchedule"
          :key="cinema.id"
          :value="cinema.id"
        >
          {{ cinema.name }}
        </option>
      </select>
    </div>

    <div class="filtter">
      {{ cinemaSchedule }}
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "PosterMovie",
  props: {
    movieData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      cinemas: null,
      ticketsData: [],

      rus: {
        days: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
        months: [
          "Января",
          "Февраля",
          "Марта",
          "Апреля",
          "Мая",
          "Июня",
          "Июля",
          "Августа",
          "Сетября",
          "Октября",
          "Ноября",
          "Декабря"
        ]
      }
    };
  },
  computed: {
    cinemaSchedule() {
      console.log(this.ticketsData);

      console.log(this.movieData.id);

      let movie = this.ticketsData.filter(ticket => {
        console.log(ticket.movie.id);
        console.log(this.movieData.id);
        return ticket.movie.id === this.movieData.id;
      });
      console.log(movie);
      return movie[0].cinema;
      // return this.ticketData[0].cinema;
    },
    sortedSchedule() {
      let movie = this.ticketsData.map(ticket => {
        return ticket.movie;
      });
      return movie;
    }
  },
  created() {
    const ticketsRef = firebase.database().ref("tickets");
    ticketsRef.on("value", snapshot => {
      if (snapshot.val() !== null) {
        this.ticketsData = snapshot.val();
      }
    });
    // .then(console.log("ok"));
  }
};
</script>

<style lang="scss" scoped>
.trailer {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
