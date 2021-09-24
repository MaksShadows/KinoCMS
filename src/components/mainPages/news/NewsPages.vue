<template>
  <div class="page">
    <h1>{{ $t("sidebar.news") }}</h1>
    <div class="promotions">
      <div class="promotion__item">
        <router-link :to="{ name: 'News1' }">
          <img src="@/assets/news.jpg" alt="" />
          <p class="date">20.08.2021</p>
          <p class="description">Только сегодня!!!</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewsPages"
};
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
}
h1 {
  color: #000;
}
.promotions {
  padding-left: 100px;
  padding-top: 60px;
}
.promotion__item {
  display: flex;
  flex-direction: column;
  margin-right: 30px;
}
.promotion__item img {
  max-width: 300px;
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 10px;
}
.promotion__item a {
  font-weight: 500;
}
.promotion__item .date {
  background: aqua;
  width: 100px;
  text-align: center;
  border-radius: 15px;
  font-weight: 500;
  margin: 5px;
}
.promotion__item .description {
  color: #000;
  width: 300px;
}
h1 {
  text-align: center;
}
.advertisement {
  position: absolute;
  right: 10px;
  top: 60px;
  color: black;
  background: #d7e3e2;
  height: 100%;
}
</style>
