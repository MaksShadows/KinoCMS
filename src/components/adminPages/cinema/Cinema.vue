<template>
  <div class="cinema">
    <div class="cinema__title">
      <h3>{{ $t("cinemas.cinemasList") }}</h3>
      <div class="cinema__blocks">
        <CinemaBlocks
          v-for="(cinema, index) in dataCinema"
          :key="cinema.id"
          :data="cinema"
          :dataCinema="dataCinema"
          @remove="deleteCinema(index)"
        />
        <router-link
          class="cinema-add"
          tag="div"
          :to="{
            name: 'CinemaAdd',
            params: {
              way: 'add-cinema',
              dataArr: dataCinema,
              dataOb: cinemaUpDate,

              dbRef: 'cinema',
              dbMainImageRef: 'cinema/main',
              dbTopBannerRef: 'cinema/banner',
              dbGalleryRef: 'cinema/gallery'
            }
          }"
        >
          <span></span>
          <div class="text">{{ $t("add") }}</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import CinemaBlocks from "@/components/adminPages/cinema/CinemaBlocks.vue";
import firebase from "firebase";
import "firebase/database";
import "firebase/storage";

export default {
  name: "Movies",
  components: {
    CinemaBlocks
  },
  data() {
    return {
      ref: "cinema",
      // dataCinema: null,
      dataCinema: [],
      cinemaUpDate: {}
    };
  },
  methods: {
    deleteCinema(index) {
      if (this.dataCinema.length > 1) {
        this.dataCinema.splice(index, 1);
        const baseRef = firebase.database().ref(this.ref);
        baseRef.set(this.dataCinema);
      } else {
        alert("Должен оставаться минимум один кинотеатр!");
      }
    },
    onRead() {
      const baseRef = firebase.database().ref(this.ref);
      baseRef.on("value", snapshot => {
        if (snapshot.val() !== null) {
          this.dataCinema = snapshot.val();
        }
      });
    }
  },
  created() {
    this.onRead();
  }
};
</script>

<style lang="scss" scoped>
h3 {
  padding: 20px 10px;
  display: flex;
  justify-content: center;
}
.cinema__blocks {
  display: flex;
  min-height: 240px;
  align-items: flex-start;
  padding: 0 10px 0 40px;
  flex-wrap: wrap;

  .cinema-add {
    margin: 10px 30px 20px 0;
    max-width: 300px;

    .text {
      text-align: center;
      font-size: 1.3em;
      font-weight: bold;
    }

    span {
      width: 300px;
      height: 200px;
      display: inline-block;
      position: relative;
    }
    span::after,
    span::before {
      content: " ";
      position: absolute;
      display: block;
      background-color: #72bb53;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    span::after {
      width: 80px;
      height: 8px;
    }
    span::before {
      width: 8px;
      height: 80px;
    }
  }
}
</style>
