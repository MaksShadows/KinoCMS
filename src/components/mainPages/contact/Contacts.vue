<template>
  <div class="cinema__page">
    <h1>{{ $t("sidebar.contacts") }}</h1>
    <div class="cinemas">
      <div class="cinema">
        <div class="cinema__left">
          <p>МультиПлекс</p>
          <img src="@/assets/multipl.jpg" alt="" />
        </div>
        <div class="cinema__right">
          <p>Контакты</p>
          <p>Адресс:</p>
          <p>ТРЦ Lavine</p>
          <p>Киев</p>
        </div>
      </div>
      <div class="cinema">
        <div class="cinema__left">
          <p>Портал</p>
          <img src="@/assets/portal.png" alt="" />
        </div>
        <div class="cinema__right">
          <p>Контакты</p>
          <p>Адресс:</p>
          <p>вулиця Соборна, 1а,</p>
          <p>Кропивницький</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContactsPages"
};
</script>

<style scoped>
h1 {
  text-align: center;
}
.cinemas {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
}
.cinema__left img {
  max-width: 200px;
}
.cinema__page {
  background: white;
  padding: 100px 0 180px 220px;
}
.cinema {
  display: flex;
  border: 1px solid;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 20px;
  max-width: 650px;
}
.movie__advertisement {
  position: absolute;
  left: 10px;
  top: 100px;
  height: 100%;
  background: #49807d38;
}
</style>
