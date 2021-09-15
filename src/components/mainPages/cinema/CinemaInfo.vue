<template>
  <div class="cinema__description">
    <!-- <div
      class="cinema__description-banner"
      :style="{ 'background-image': 'url(' + data.topBanner.imageUrl + ')' }"
    ></div> -->
    <div class="cinema__description-banner">
      <img :src="data.topBanner.imageUrl" />
    </div>
    <div class="container cinema__description-info">
      <div class="aside">
        <div class="ad">Ad</div>
        <div class="hall-list"></div>
      </div>
      <div class="cinema__about">
        <div class="cinema__about-name">
          <h3>{{ data.name }}</h3>
          <img :src="data.mainImage.imageUrl" />
          <div class="schedule">Расписание</div>
        </div>
        <div class="cinema__about-description">
          <p>{{ data.description }}</p>
        </div>
        <div class="condition">
          <h3>Условия</h3>
          <p>{{ data.conditions }}</p>
        </div>
        <div class="gallery">
          <h3>ФОТОГАЛЕРЕЯ</h3>
          <div class="gallery-slider">
            <Slider :gallery="data.galleryImages" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Slider from "@/components/mainPages/home/SliderMain.vue";
// import firebase from "firebase";

export default {
  name: "Cinema",
  components: { Slider },
  props: ["data"],
  data() {
    return {
      //   cinemaData: [],
    };
  },

  created() {
    //     const baseRef = firebase.database().ref("cinema");
    //     baseRef.on("value", (snapshot) => {
    //       if (snapshot.val() !== null) {
    //         this.cinemaData = snapshot.val();
    //       }
    //     });
    if (this.data == undefined) {
      this.$router.push("/cinema");
    }
  }
};
</script>

<style lang="scss" scoped>
.cinema__description {
  &-banner {
    width: 100%;
    /* height: 500px; */
    /* background: fixed center/cover no-repeat; */
    margin-bottom: 40px;

    img {
      height: 460px;
      width: 100vw;
    }
  }
  &-info {
    display: flex;
    justify-content: space-between;

    .cinema__about {
      width: 80%;

      &-name {
        display: flex;

        img {
          width: 200px;
          margin: 0 30px;
        }
      }
    }
  }
}
.ad {
}
</style>
