<template>
  <!-- first block -->
  <div class="about">
    <div class="card mt-2">
      <div class="card-header text-center font-weight-bold">
        На главной верх
      </div>
      <div class="cards-body__items">
        <div class="cards-body__item">Размер: 1000х190</div>
        <div class="custom-control custom-switch">
          <!-- <input
            v-model="isEnabled"
            type="checkbox"
            class="custom-control-input"
            id="mainPageTopSwitch"
            change="stateChanged"
          />
          <label class="custom-control-label" for="mainPageTopSwitch"></label> -->
        <Switcher class="banners-switcher" @stateChanged="showToggle" />

        </div>
      </div>

      <div class="card-group p-3" v-show="showTopSliderConfig" >
        <BannersCardsTop />
      </div>
    </div>

    <!-- second block -->
    <div class="card mt-2">
      <div class="card-header text-center font-weight-bold">
        Сквозной баннер на заднем фоне
      </div>
      <div class="row p-3">
        <div class="col-md-6 text-muted">Pазмер 2000x3000</div>
      </div>

      <div class="card-group p-3">
        <BannersCardsBack />
      </div>
    </div>

    <!-- third block -->
    <div class="card mt-2" >
      <div class="card-header text-center font-weight-bold">
        На главной новости и акции
      </div>

      <div class="cards-body__items">
        <div class="cards-body__item">Размер: 1000х190</div>
        <div class="custom-control custom-switch">
          <!-- <input
            v-model="isEnabled"
            type="checkbox"
            class="custom-control-input"
            id="mainPageTopSwitch"
          />
          <label class="custom-control-label" for="mainPageTopSwitch"></label> -->
           <Switcher class="banners-switcher" @stateChanged="showToggle" />
        </div>
      </div>

      <div class="card-group p-3" v-show="showTopSliderConfig">
        <BannersCardsNews />
      </div>
    </div>
  </div>
</template>

<script>
import BannersCardsTop from "@/components/adminPages/banners/BannersCardsTop.vue";
import BannersCardsBack from "@/components/adminPages/banners/BannersCardsBack.vue";
import BannersCardsNews from "@/components/adminPages/banners/BannersCardsNews.vue";
import Switcher from "@/components/adminPages/banners/Switcher.vue";

export default {
  name: "Banners",
  components: {
    BannersCardsTop,
    BannersCardsBack,
    BannersCardsNews,
    Switcher,
  },

  data() {
    return {
      isEnabled: false,
    showTopSliderConfig: null,
     status: null
    }
  },
   methods: {
        stateChanged() {
            this.$emit('stateChanged', this.status)
        },

         showToggle(status) {
      this.showTopSliderConfig = status;
    },

    }
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
