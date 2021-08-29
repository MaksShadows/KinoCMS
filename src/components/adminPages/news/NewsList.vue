<template>
  <div class="title">
    <div class="title__name">{{ dataSource.name }}</div>
    <div class="title__date">{{ dataSource.date }}</div>
    <div class="title__status" v-if="dataSource.status">ВКЛ</div>
    <div class="title__status" v-else>{{ $t("news.table.off") }}</div>
    <router-link
      class="title__edit"
      tag="div"
      :to="{
        name: 'NewsAdd',
        params: {
          way: 'news-add',
          dataOb: dataSource,
          dataArr: newsData,

          dbRef: ref,
          dbMainImageRef: mainImageRef,
          dbGalleryRef: galleryRef
        }
      }"
    >
      <div class="icon fas fa-pen"></div>
    </router-link>
    <div @click="$emit('remove')" class="icon title__remove fas fa-trash"></div>
  </div>
</template>

<script>
export default {
  name: "NewsList",
  props: ["data", "dataArr", "dbRef", "dbMainImageRef", "dbGalleryRef"],
  data() {
    return {
      dataSource: this.data,
      newsData: this.dataArr,

      ref: this.dbRef,
      mainImageRef: this.dbMainImageRef,
      galleryRef: this.dbGalleryRef
    };
  }
};
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  justify-content: center;
  margin-left: 60px;

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
