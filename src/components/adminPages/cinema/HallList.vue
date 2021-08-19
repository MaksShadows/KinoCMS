<template>
  <div class="title">
    <div class="title__name">{{ dataSource.number }}</div>
    <div class="title__date">{{ dataSource.date }}</div>
    <router-link
      class="title__edit"
      tag="div"
      :to="{
        name: 'HallAdd',
        params: {
          way: 'add-hall',
          dataArrS: cinemaDataArr,
          dataObS: cinemaDataOb,
          dataImgS: mainImageData,
          dataBannerS: topBannerData,
          dataGalleryS: galleryData,
          hallDataS: hallDataArr,
          hallDataObS: dataSource
        }
      }"
    >
      <div class="icon fas fa-pen"></div>
    </router-link>
    <div @click="$emit('remove')" class="title__remove fas fa-trash"></div>
  </div>
</template>

<script>
export default {
  name: "HallList",
  props: [
    "data",
    "dataArrS",
    "dataObS",
    "dataImgS",
    "dataBannerS",
    "dataGalleryS",
    "hallDataS"
  ],
  data() {
    return {
      dataSource: this.data,

      cinemaDataArr: this.dataArrS,
      cinemaDataOb: this.dataObS,
      mainImageData: this.dataImgS,
      topBannerData: this.dataBannerS,
      galleryData: this.dataGalleryS,
      hallDataArr: this.hallDataS
    };
  }
};
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  justify-content: center;

  &__date,
  &__name {
    border: 1px solid #9a9a9a;
    background: #ececec;
    width: 40%;
    height: 40px;
    padding-left: 10px;
    align-items: center;
    display: flex;
  }
  &__edit,
  &__remove {
    margin-left: 20px;
    align-items: center;
    display: flex;
  }
}
</style>
