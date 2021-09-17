<template>
  <div class="main-block container">
    <PosterList v-for="movie in allMovies" :key="movie.id" :movieData="movie" />
  </div>
</template>

<script>
import PosterList from "@/components/mainPages/soon/PosterList.vue";
import firebase from "firebase";

export default {
  name: "SoonFilms",
  components: {
    PosterList
  },
  data() {
    return {
      moviesData: {},
      ticketsData: []
    };
  },
  computed: {
    allMovies() {
      return this.moviesData.new;
    }
  },
  created() {
    const moviesRef = firebase.database().ref("movies");
    moviesRef.on("value", snapshot => {
      if (snapshot.val() !== null) {
        this.moviesData = snapshot.val();
      }
    });
    // .then(() => {
    //   this.allMovies();
    // });
  }
};
</script>

<style lang="scss" scoped>
.main-block {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
