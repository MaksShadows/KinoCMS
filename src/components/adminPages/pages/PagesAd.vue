<template>
  <div class="title">
    <div class="title__name">{{ dataSource.name }}</div>
    <div class="title__date">{{ dataSource.date }}</div>
    <div class="title__status" v-if="dataSource.status">ВКЛ</div>
    <div class="title__status" v-else>ВЫКЛ</div>
    <router-link
      class="title__edit"
      tag="div"
      :to="{
        name: 'PagesAddNew',
        params: {
          way: 'pages-add-new',
          dataOb: dataSource,

          dbRef: 'pages/ad',
          dbMainImageRef: 'pages/ad/main',
          dbGalleryRef: 'pages/ad/gallery'
        }
      }"
    >
      <div class="icon fas fa-pen"></div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "PagesAd",
  props: ["data"],
  data() {
    return {
      dataSource: this.data
    };
  }
};
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  justify-content: center;
  margin: 0 34px 0 60px;

  &__date,
  &__name,
  &__status {
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
