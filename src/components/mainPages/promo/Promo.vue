<template>
  <div class="page">
    <h4 class="page__title">{{ $t("sidebar.discounts") }}</h4>
    <div class="promotions">
      <div class="promotion__item">
        <router-link :to="{ name: 'Promo1' }">
          <img src="@/assets/shares2.jpg" alt="" />
          <p class="date">20.08.2021</p>
          <p class="description">Только сегодня!!!Скидка на покупку</p>
        </router-link>
      </div>
    </div>
    <div class="promotions">
      <div class="promotion__item">
        <router-link :to="{ name: 'Promo2' }">
          <img src="@/assets/shares1.jpg" alt="" />
          <p class="date">29.08.2021</p>
          <p class="description">Только сегодня!!!Билет 2+1</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Promo"
};
</script>

<style scoped>
.page {
  padding: 60px 20px 180px;
  display: flex;
  justify-content: center;
}
.page__title {
  color: black;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
}
.promotions {
  padding-left: 100px;
  padding-top: 80px;
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
