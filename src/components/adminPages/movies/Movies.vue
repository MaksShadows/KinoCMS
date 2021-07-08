<template>
  <div class="movies">
    <div class="movies__title">
      <h3>Список текущих фильмов</h3>
      <div class="movies__blocks">
      </div>
    </div>
    <div class="movies__blocks">
      <h3>Список фильмов которые покажут скоро</h3>

    </div>
  </div>
</template>

<script>


export default {
  name: "Movies",
  
};
</script>

<style lang="scss" scoped>
h3 {
  padding: 20px 10px;
  display: flex;
  justify-content: center;
}
</style>