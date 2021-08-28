<template>
  <div class="movies">
    <div class="movies__title">
      <h3>{{ $t("movies.moviesList") }}</h3>
      <div class="movies__blocks">
        <MoviesCurrent />
      </div>
    </div>
    <div class="movies__blocks">
      <h3>{{ $t("movies.soonMoviesList") }}</h3>
      <MoviesNew />
    </div>
  </div>
</template>

<script>
import MoviesCurrent from "@/components/adminPages/movies/MoviesCurrent.vue";
import MoviesNew from "@/components/adminPages/movies/MoviesNew.vue";

export default {
  name: "Movies",
  components: {
    MoviesCurrent,
    MoviesNew
  }
};
</script>

<style lang="scss" scoped>
h3 {
  padding: 20px 10px;
  display: flex;
  justify-content: center;
}
</style>
