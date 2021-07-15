<template>
  <div class="container">
    <div class="cards-top">
      <h3>На главной верх</h3>
      <div class="cards-body">
        <!-- <div class="cards-body__items">
          <div class="cards-body__item">Размер: 1000х190</div>
          <div class="custom-control custom-switch">
            <input
              v-model="isEnabled"
              type="checkbox"
              class="custom-control-input"
              id="mainPageTopSwitch"
            />
            <label class="custom-control-label" for="mainPageTopSwitch"></label>
          </div>
        </div> -->
        <p>Размер: 1000х190</p>
        <div class="cards-body__blocks">
          <BannersTopCard />

        </div>
      </div>
    </div>

    <div class="cards-back">
      <h3>Сквозной банер на заднем фоне</h3>
      <div class="cards-body">
        <p>Размер: 2000х3000</p>
        <div class="cards-body__blocks">
          <BannersCardsBack />
        </div>
      </div>
    </div>

    <div class="cards-news">
      <h3>На главной Новости Акции</h3>
      <div class="cards-body">
        <p>Размер: 1000х190</p>
        <div class="cards-body__blocks">
          <BannersCardsNews />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BannersTopCard from "@/components/adminPages/banners/BannersTopCard.vue";
import BannersCardsBack from "@/components/adminPages/banners/BannersCardsBack.vue";
import BannersCardsNews from "@/components/adminPages/banners/BannersCardsNews.vue";

export default {
  name: "Banners",
  components: {
    BannersTopCard,
    BannersCardsBack,
    BannersCardsNews,
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding-bottom: 50px;
}
h3 {
  padding: 20px 10px;
  display: flex;
  justify-content: center;
}
p {
  padding: 5px 20px;
  margin: 0;
}

.cards-body {
  border: 1px solid #000;
  border-radius: 10px;

  &__items {
    display: flex;
    justify-content: space-between;
    padding: 20px;
  }
  &__blocks {
    display: flex;
    justify-content: start;
  }
}
</style>
