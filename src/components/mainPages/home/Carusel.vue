<template>
  <div class="carusel-wrapper">
    <div
      class="carusel"
      :style="{ 'margin-left': '-' + 100 * currentSlideIndex + 'vw' }"
    >
      <CaruselItem v-for="item in data" :key="item.id" :dataItem="item" />
    </div>
  </div>
</template>

<script>
import CaruselItem from "@/components/mainPages/home/CaruselItem.vue";

export default {
  name: "Carusel",
  props: {
    data: {
      type: Array,
      default: () => []
    },
    interval: {
      type: Number,
      default: 5000
    }
  },
  components: { CaruselItem },
  data() {
    return {
      currentSlideIndex: 0
    };
  },
  methods: {
    // prevSlide() {
    //   if (this.currentSlideIndex > 0) {
    //     this.currentSlideIndex--;
    //   }
    // },
    nextSlide() {
      if (this.currentSlideIndex >= this.data.length - 1) {
        this.currentSlideIndex = 0;
      } else {
        this.currentSlideIndex++;
      }
    }
  },
  mounted() {
    if (this.interval > 0) {
      setInterval(() => {
        this.nextSlide();
      }, this.interval);
    }
  }
};
</script>

<style lang="scss" scoped>
.carusel {
  display: flex;
  transition: all 0.5s;

  &-wrapper {
    max-height: 190px;
    overflow: hidden;
  }
}
</style>
