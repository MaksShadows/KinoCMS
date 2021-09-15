<template>
  <div class="carusel-item">
    <img :src="dataItem.imageUrl" />
  </div>
</template>

<script>
export default {
  name: "CaruselItem",
  props: {
    dataItem: {
      type: Object,
      default: () => {}
    }
  }
};
</script>

<style lang="scss" scoped>
.carusel-item {
  img {
    width: 100vw;
    height: 100px;
  }
}
</style>
