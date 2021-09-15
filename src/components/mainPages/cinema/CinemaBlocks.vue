<template>
  <div class="info-block">
    <router-link
      class="info-block__image"
      tag="img"
      :src="data.mainImage.imageUrl"
      :to="{
        name: 'CinemaInfo',
        params: {
          way: 'cinema-info',
          data: data
        }
      }"
    >
    </router-link>
    <div class="info-block__image-name">{{ data.name }}</div>
  </div>
</template>

<script>
export default {
  name: "CinemaBlocks",
  props: ["data"],
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.info-block {
  margin: 10px 70px 20px 0;
  max-width: 450px;

  &__image {
    width: 430px;
    height: 300px;
    background: #a0a6ac;
    border-radius: 0.25rem;
    background-size: cover;

    &-name {
      width: 100%;
      text-align: center;
      margin-top: 10px;
      font-size: 1.3em;
      font-weight: bold;
    }
  }
}
</style>
