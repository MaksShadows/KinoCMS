<template>
  <div class="info-block">
    <router-link
      class="info-block__image"
      tag="img"
      :src="movieData.mainImage.imageUrl"
      :to="{
        name: 'PosterMovie',
        params: {
          way: 'poster-movie',
          movieData: movieData
        }
      }"
    >
    </router-link>
    <div class="info-block__name">{{ movieData.name }}</div>
    <button class="info-block__buy btn btn-default">Купить билет</button>
  </div>
</template>

<script>
// import firebase from "firebase";

export default {
  name: "PosterList",
  props: {
    movieData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      // ticketData: [],
    };
  }
  // created() {
  //   const ticketsRef = firebase.database().ref("tickets");
  //   ticketsRef.on("value", (snapshot) => {
  //     if (snapshot.val() !== null) {
  //       this.ticketsData = snapshot.val();
  //     }
  //   });
  // },
};
</script>

<style lang="scss" scoped>
.info-block {
  max-width: 190px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 55px 30px 0;

  &__image {
    width: 100%;
    max-width: 170px;
    height: 230px;
  }
  &__name {
    max-width: 140px;
    text-align: center;
  }
}
</style>
