<template>
  <div class="bannerOnBackground">
    <div class="banner-content-wrap">
      <div class="banner-content">
        <div class="banner-tabs-nav">
          <div class="radio icheck-nephritis">
            <input
              v-model="currentTabs"
              type="radio"
              id="nephritis1"
              name="nephritis"
              :value="1"
            />
            <label for="nephritis1">Фото на фон</label>
          </div>
          <div class="radio icheck-nephritis">
            <input
              v-model="currentTabs"
              type="radio"
              id="nephritis2"
              name="nephritis"
              :value="2"
            />
            <label for="nephritis2">Просто фон</label>
          </div>
        </div>

        <div class="banner-tabs-content">
          <div class="tab-1">
            <!-- <img  class="tab-1__image" alt="tab_image"> -->
            <input type="file" style="display: none" />
            <label for="photoOnBackground" class="btn btn-primary"
              >Добавить</label
            >
            <button class="btn btn-danger">Удалить</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import firebase from 'firebase'
export default {
  name: "BannersCardsBack",

  data() {
    return {
      photoOnBackground: "",
      Background: "",
    };
  },
  methods: {},
  created() {},
};
</script>


<style scoped>
.bannerOnBackground {
  margin: 120px 0;
}
.size {
  margin-bottom: 40px;
}
.banner-content {
  display: flex;
  justify-content: space-between;
  min-height: 200px;
}
.radio {
  margin: 20px 0;
}
.banner-tabs-nav {
  border-right: 2px solid #fff;
  padding-right: 60px;
}
.banner-tabs-content {
  width: 85%;
  margin-left: 40px;
}
.tab-1__image {
  width: 240px;
  max-width: 240px;
  height: 180px;
  display: inline-block;
  margin: 0 40px 10px 0;
}
.btn {
  margin: 0 10px;
}
</style>