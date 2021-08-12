<template>
  <div class="info-block">
    <div @click="$emit('remove')" class="btn btn-default info-block__close">
      <svg class="info-block__close-img" viewBox="0 0 8 8">
        <path
          d="M1.406 0l-1.406 1.406.688.719 1.781 1.781-1.781 1.781-.688.719 1.406 1.406.719-.688 1.781-1.781 1.781 1.781.719.688 1.406-1.406-.688-.719-1.781-1.781 1.781-1.781.688-.719-1.406-1.406-.719.688-1.781 1.781-1.781-1.781-.719-.688z"
          id="x"
          fill="rgba(0,0,0,0.7)"
        ></path>
      </svg>
    </div>
    <router-link
      class="info-block__image"
      tag="img"
      :src="movieData.mainImage.imageUrl"
      :to="{
        name: 'MoviesAddCurrent',
        params: {
          way: 'add-current',
          dataArr: movieDataArr,
          dataOb: movieData,
          dataImg: movieData.mainImage.imageUrl,
          dbRef: 'movies/current',
          dbMainImageRef: 'movies/current/main',
          dbGalleryRef: 'movies/current/gallery',
        },
      }"
    >
    </router-link>
    <div class="info-block__image-name">{{ movieData.name }}</div>
  </div>
</template>

<script>
export default {
  name: "MoviesCurrentBlocks",
  props: ["data", "dataBlocks"],
  data() {
    return {
      movieData: this.data,
      movieDataArr: this.dataBlocks,
    };
  },
};
</script>

<style lang="scss" scoped>
.info-block {
  position: relative;
  margin: 10px 30px 20px 0;
  max-width: 300px;

  &__image {
    width: 235px;
    height: 300px;
    background: #a0a6ac;
    border-radius: 0.25rem;
    background-size: cover;

    &-name {
      width: 100%;
      max-width: 235px;
      text-align: center;
      margin-top: 10px;
      font-size: 1.3em;
    }
  }

  &__close {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    padding: 3px;

    &-img {
      width: 13px;
      height: 13px;
    }
  }
}
</style>