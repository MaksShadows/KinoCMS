<template>
  <div class="main-block">
    <MoviesCurrentBlocks
      v-for="(movie, index) in dataBlocks"
      :key="movie.id"
      :data="movie"
      :dataBlocks="dataBlocks"
      @remove="deleteMovie(index)"
    />
    <router-link
      class="btn btn-default btn-add"
      ref="createMovie"
      tag="button"
      :to="{
        name: 'MoviesAddCurrent',
        params: {
          way: 'add-current',
          dataArr: dataBlocks,
          dataOb: movieUpDate,
          dbRef: 'movies/current',
          dbMainImageRef: 'movies/current/main',
          dbGalleryRef: 'movies/current/gallery'
        }
      }"
    >
      Добавить фильм
    </router-link>
  </div>
</template>

<script>
import MoviesCurrentBlocks from "@/components/adminPages/movies/MoviesCurrentBlocks.vue";
import firebase from "firebase";
import "firebase/database";
import "firebase/storage";

export default {
  name: "Movies",
  components: {
    MoviesCurrentBlocks
  },
  data() {
    return {
      ref: "movies/current",
      dataBlocks: [],
      movieUpDate: {}
    };
  },
  methods: {
    deleteMovie(index) {
      this.dataBlocks.splice(index, 1);
      const baseRef = firebase.database().ref(this.ref);
      baseRef.set(this.dataBlocks);
    },
    onRead() {
      const baseRef = firebase.database().ref(this.ref);
      baseRef.on("value", snapshot => {
        if (snapshot.val() !== null) {
          this.dataBlocks = snapshot.val();
        }
      });
    }
  },
  created() {
    this.onRead();
  }
};
</script>

<style lang="scss" scoped>
.main-block {
  display: flex;
  min-height: 240px;
  align-items: start;
  padding: 0 10px 0 40px;
  flex-wrap: wrap;
}
.btn-add {
  width: 165px;
  height: 90px;
  margin: 40px 0;
}
</style>
