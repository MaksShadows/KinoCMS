<template>
  <div class="header-main">
    <div class="log log-in log-out container">
      <div class="log-info" v-if="name">
        <router-link to="/user">
          <i class="nav-img fas fa-user-cog fa-2x" v-if="admin"></i>
          <i class="fas fa-user fa-2x" v-else></i>
        </router-link>
        <h6>{{ name }}</h6>
        <i class="fas fa-power-off fa-2x" @click="logout"></i>
      </div>
      <router-link class="btn btn-default" to="/login" v-if="!name">
        Вход
      </router-link>
      <router-link class="btn btn-default" to="/registr" v-if="!name">
        Регистрация
      </router-link>
      <router-link class="btn btn-default" to="/admin/statistic" v-if="name">
        Админка
      </router-link>
    </div>
    <div class="banner-top">
      <Carusel :data="banner.topcards" :interval="5000" />
    </div>
    <div class="back-banner">
      <Header />
      <div class="container">
        <div class="gallery-slider">
          <Slider
            :gallery="
              moviesData.current[moviesData.current.length - 1].galleryImages
            "
          />
          <div class="gallery-slider-name newest">
            <router-link
              tag="h3"
              :to="{
                name: 'PosterMovie',
                params: {
                  way: 'poster-movie',
                  movieData: moviesData.current[moviesData.current.length - 1]
                }
              }"
            >
              {{ moviesData.current[moviesData.current.length - 1].name }}
            </router-link>
          </div>
        </div>

        <div class="movies">
          <h3>{{ $t("soonSoon") }}</h3>
          <div class="movies__list">
            <PosterList
              v-for="movie in moviesData.current"
              :key="movie.id"
              :movieData="movie"
            />
          </div>

          <h3>{{ $t("soonShawn") }}</h3>
          <div class="movies__list">
            <PosterList
              v-for="movie in moviesData.new"
              :key="movie.id"
              :movieData="movie"
            />
          </div>
        </div>

        <div class="gallery-slider">
          <h3>{{ $t("newsandshares") }}</h3>
          <Slider :gallery="banner.newscards" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Slider from "@/components/mainPages/home/SliderMain.vue";
import Header from "@/components/mainPages/Header.vue";
import Carusel from "@/components/mainPages/home/Carusel.vue";
import PosterList from "@/components/mainPages/poster/PosterList.vue";
import firebase from "firebase";

export default {
  name: "Home",
  components: { Carusel, Header, Slider, PosterList },
  data() {
    return {
      moviesData: {},
      banner: null
    };
  },
  methods: {
    async logout() {
      await this.$store.dispatch("logout");
      this.$router.push("/login");
    }
  },
  computed: {
    name() {
      if (this.$store.getters.info) {
        console.log(this.$store.getters.info.nickname);
        return this.$store.getters.info.nickname;
      } else return null;
    },
    admin() {
      if (this.$store.getters.info) {
        console.log(this.$store.getters.info.email);
        if (this.$store.getters.info.email === "admin@ukr.net") {
          return true;
        } else return false;
      } else return null;
    }
  },

  // async created() {
  created() {
    const baseRef = firebase.database().ref("movies");
    baseRef.on("value", snapshot => {
      if (snapshot.val() !== null) {
        this.moviesData = snapshot.val();
      }
    });
    // this.banner = (
    //   await firebase.database().ref("banners").once("value")
    // ).val();
    const bannerRef = firebase.database().ref("banners");
    bannerRef.on("value", snapshot => {
      if (snapshot.val() !== null) {
        this.banner = snapshot.val();
      }
    });
    // console.log(this.$state);
  }
};
</script>

<style lang="scss" scoped>
.header-main {
  margin-bottom: 40px;
  background: #adadad33;

  .log {
    background: transparent;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    min-height: 51px;

    &-info {
      display: flex;
      align-items: center;
      h6 {
        margin: 15px 25px;
      }
    }
    i {
      color: #000000bd;
      cursor: pointer;
    }
    .btn {
      margin-left: 15px;
    }
  }

  .banner-top {
    height: 100px;
    width: 100%;
  }
}
.back-banner {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
}

.container {
  background: #ffffffda;
}
.gallery-slider {
  position: relative;

  &-name {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    h3 {
      color: #ffffffda;
    }
    &.newest {
      cursor: pointer;
    }
  }
}

.movies {
  &__list {
    width: 80%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  h3 {
    padding: 20px 10px;
    display: flex;
    justify-content: center;
  }
}

.gallery-slider h3 {
  /* padding: 20px 10px; */
  display: flex;
  justify-content: center;
}
</style>
