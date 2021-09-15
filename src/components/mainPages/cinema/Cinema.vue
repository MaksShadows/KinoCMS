<template>
  <div class="container cinema">
    <div class="cinema__content">
      <h2>Наши Кинотеатры</h2>
      <div class="cinema__content-preview">
        <CinemaBlocks
          v-for="cinema in cinemaData"
          :key="cinema.id"
          :data="cinema"
        />
      </div>
    </div>
    <div class="ad">kfdghkndfkjbn dfkbjnf</div>
  </div>
</template>

<script>
import CinemaBlocks from "@/components/mainPages/cinema/CinemaBlocks.vue";
import firebase from "firebase";

export default {
  name: "Cinema",
  components: { CinemaBlocks },
  data() {
    return {
      cinemaData: []
    };
  },

  created() {
    const baseRef = firebase.database().ref("cinema");
    baseRef.on("value", snapshot => {
      if (snapshot.val() !== null) {
        this.cinemaData = snapshot.val();
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.cinema {
  display: flex;

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;

    h2 {
      margin: 0 0 40px 0;
    }

    &-preview {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
  }
}
.ad {
  margin-top: 40px;
}
</style>
