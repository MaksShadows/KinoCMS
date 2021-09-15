<template>
  <div class="slider_case">
    <v-slider v-bind="options">
      <div class="item" v-for="img in gallery" :key="img.id">
        <img class="item-img" :src="img.imageUrl" />
      </div>
    </v-slider>
  </div>
</template>

<script>
import Slider from "@/components/mainPages/home/Slider.vue";

export default {
  name: "SliderMain",
  components: {
    "v-slider": Slider
  },
  props: {
    // Галлерея картинок
    gallery: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      options: {
        items: 1,
        margin: 20,
        nav: true,
        dots: true,
        loop: true,
        timing: "cubic-bezier(0, 0.72, 0.64, 1.06)",
        offset: 1,
        prevNav: "<i class='fas fa-chevron-left fa-2x'></i>",
        nextNav: "<i class='fas fa-chevron-right fa-2x'></i>",
        sibling: false,
        responsive: {
          0: {
            items: 1
          },
          768: {
            items: 3
          },
          999: {
            items: 5
          }
        }
      }
    };
  }
};
</script>

<style lang="scss" scoped>
/* * {
  margin: 0;
  padding: 0;
  border: 0;
  max-height: 99999999px;
  -webkit-font-smoothing: antialiased;

  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
} */

.slider_case {
  width: 100%;
  max-width: 1000px;
  min-width: 480px;
  padding: 50px 15px;
  margin: 0 auto;
  position: relative;

  font-family: "Roboto", Arial, sans-serif;
  font-size: 14px;
  /* margin-bottom: 40px; */
}

.item {
  &-img {
    width: 100%;
    height: 460px;
  }

  /* &-img {
    background: #00800b;
    text-align: center;
    padding: 100px 0;
    color: #fff;
    font-size: 26px;
    font-style: italic;
    font-weight: 300;

      &.active {
    background: #ff3f4d;
  }

  &.super {
    background: #04a0c5;
  }
  } */
}
</style>
