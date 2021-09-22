<template>
  <header>
    <div class="container">
      <div class="logo">
        <router-link to="/" class="navbar-brand d-flex">
          <h4>Cinema</h4>
        </router-link>
      </div>
      <nav>
        <div class="info">
          <div class="info__search">
            <input
              v-model="search"
              type="search"
              :placeholder="$t('users.addSearch')"
            />
            <!-- <ul v-if="search.length">
              <router-link
                class="info__search-movie"
              >
                <img :src="movie.mainImage.imageUrl" />
                <p>{{ movie.name }}</p>
              </router-link>
            </ul>
            <ul v-if="moviesData != undefined && !serchingMovie.length">
              <li class="info__search-movie">
                <p>Фильм не найден</p>
              </li>
            </ul> -->
          </div>
          <div class="info__contacts">
            <a href="#" class="info__contacts-img">
              <span class="fa-stack fa-lg">
                <i class="fa fa-circle fa-stack-2x"></i>
                <i class="fab fa-facebook-f fa-stack-1x fa-inverse fa-fw"></i>
              </span>
            </a>
            <a href="#" class="info__contacts-img">
              <span class="fa-stack fa-lg">
                <i class="fa fa-circle fa-stack-2x"></i>
                <i class="fab fa-twitter fa-stack-1x fa-inverse fa-fw"></i>
              </span>
            </a>
            <a href="#" class="info__contacts-img">
              <span class="fa-stack fa-lg">
                <i class="fa fa-circle fa-stack-2x"></i>
                <i class="fab fa-vk fa-stack-1x fa-inverse fa-fw"></i>
              </span>
            </a>
            <a href="#" class="info__contacts-img">
              <span class="fa-stack fa-lg">
                <i class="fa fa-circle fa-stack-2x"></i>
                <i
                  class="fab fa-telegram-plane fa-stack-1x fa-inverse fa-fw"
                ></i>
              </span>
            </a>
            <a href="#" class="info__contacts-img">
              <span class="fa-stack fa-lg">
                <i class="fa fa-circle fa-stack-2x"></i>
                <i class="fab fa-instagram fa-stack-1x fa-inverse fa-fw"></i>
              </span>
            </a>
            <a href="#" class="info__contacts-img">
              <span class="fa-stack fa-lg">
                <i class="fa fa-circle fa-stack-2x"></i>
                <i
                  class="fab fa-odnoklassniki fa-stack-1x fa-inverse fa-fw"
                ></i>
              </span>
            </a>
            <a href="#" class="info__contacts-img">
              <span class="fa-stack fa-lg">
                <i class="fa fa-circle fa-stack-2x"></i>
                <i
                  class="fab fa-google-plus-g fa-stack-1x fa-inverse fa-fw"
                ></i>
              </span>
            </a>
          </div>
          <div class="info__phone">
            <p>{{ mainPageData.phone1 }}</p>
            <p>{{ mainPageData.phone2 }}</p>
          </div>
        </div>
        <div class="navbar-custom-menu">
          <nav class="mt-2">
            <ul class="nav nav-pills d-flex" data-widget="treeview" role="menu">
              <router-link active-class="active" :to="{ name: 'Poster' }">
                <a href="#" class="nav-link">{{ $t("sidebar.afisha") }}</a>
              </router-link>
              <router-link active-class="active" :to="{ name: 'Schedule' }">
                <a href="#" class="nav-link">{{ $t("sidebar.shedule") }}</a>
              </router-link>
              <router-link active-class="active" :to="{ name: 'SoonFilms' }">
                <a href="#" class="nav-link">Скоро</a>
              </router-link>
              <router-link active-class="active" :to="{ name: 'Cinemas' }">
                <a href="#" class="nav-link">{{ $t("sidebar.cinemas") }}</a>
              </router-link>
              <router-link active-class="active" :to="{ name: 'SharesPages' }">
                <a href="#" class="nav-link">{{ $t("sidebar.discounts") }}</a>
              </router-link>
              <router-link active-class="active" :to="{ name: 'AboutCinema' }">
                <a href="#" class="nav-link">{{ $t("sidebar.aboutCinema") }}</a>
              </router-link>

              <li
                class="menu__item menu__item--dropdown"
                @click="toggle('ranking')"
                :class="{ open: dropDowns.ranking.open }"
              >
                <a class="nav-link menu__link menu__link--toggle">
                  <span v-if="dropDowns.ranking.open"
                    ><i class="fas fa-sort-up"></i
                  ></span>
                  <span v-else><i class="fas fa-sort-down"></i></span>
                </a>
                <ul class="dropdown-menu">
                  <router-link
                    active-class="active"
                    :to="{ name: 'NewsPages' }"
                  >
                    <a href="#" class="nav-link">{{ $t("sidebar.news") }}</a>
                  </router-link>
                  <router-link active-class="active" :to="{ name: 'CafeBar' }">
                    <a href="#" class="nav-link">{{ $t("sidebar.cafeBar") }}</a>
                  </router-link>
                  <router-link active-class="active" :to="{ name: 'VipHall' }">
                    <a href="#" class="nav-link">{{ $t("sidebar.vipHall") }}</a>
                  </router-link>
                  <router-link
                    active-class="active"
                    :to="{ name: 'ChildRoom' }"
                  >
                    <a href="#" class="nav-link">{{
                      $t("sidebar.childRoom")
                    }}</a>
                  </router-link>
                  <router-link
                    active-class="active"
                    :to="{ name: 'SharePages' }"
                  >
                    <a href="#" class="nav-link">Реклама</a>
                  </router-link>
                  <router-link
                    active-class="active"
                    :to="{ name: 'MobilePages' }"
                  >
                    <a href="#" class="nav-link">{{ $t("sidebar.mobile") }}</a>
                  </router-link>
                  <router-link
                    active-class="active"
                    :to="{ name: 'ContactsPages' }"
                  >
                    <a href="#" class="nav-link">{{
                      $t("sidebar.contacts")
                    }}</a>
                  </router-link>
                </ul>
              </li>
              <div class="languages">
                <img v-if="lang == 'ru'" src="@/assets/img/ru.png" alt="ru" />
                <img v-else src="@/assets/img/ua.png" alt="ua" />
                <select v-model="lang" @change="handleChange($event)">
                  <option value="ru">Русский</option>
                  <option value="ua">Украинский</option>
                </select>
              </div>
            </ul>
          </nav>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
// import Carusel from "@/components/mainPages/home/Carusel.vue";
import firebase from "firebase";

export default {
  name: "Header",
  // components: { Carusel },
  data: () => ({
    links: [
      { title: "Афиша", url: "/poster" },
      { title: "Расписание", url: "/schedule" },
      { title: "Скоро", url: "/poster" },
      { title: "Кинотеатры", url: "/cinema" },
      { title: "Акции", url: "/shares" },
      { title: "О кинотеатре", url: "/about" }
    ],
    linksMore: [
      { title: "Новости", url: "/news" },
      { title: "Реклама", url: "/ad" },
      { title: "Кафе", url: "/kafe" },
      { title: "Приложения", url: "/app" },
      { title: "Контакты", url: "/contacts" }
    ],

    dropDowns: {
      ranking: { open: false }
    },
    lang: localStorage.getItem("lang") || "ru",
    mainPageData: {},
    banners: [],
    moviesData: {},
    search: ""
  }),
  watch: {
    $route(to, from) {
      // обрабатываем изменение параметров маршрута...
      console.log(to, from);
      console.log(this.$route.path);
    }
  },
  methods: {
    toggle(dropdownName) {
      //alert(dropdownName)
      this.dropDowns[dropdownName].open = !this.dropDowns[dropdownName].open;
      // console.log(this.$route);
    },
    handleChange(event) {
      localStorage.setItem("lang", event.target.value);
      this.$i18n.locale = event.target.value;
      this.$router.push({
        params: { lang: event.target.value }
      });
    },
    close() {
      for (let dd in this.dropDowns) {
        this.dropDowns[dd].open = false;
      }
    }
  },
  // computed: {
  //   serchingMovie() {
  //     const allMovies = this.moviesData.current.concat(this.moviesData.new);
  //     return allMovies.filter((movie) => {
  //       return movie.name.toLowerCase().includes(this.search.toLowerCase());
  //       // if (movie.name.length) {
  //       //   return movie.name.toLowerCase().includes(this.search.toLowerCase());
  //       // } else {
  //       //   return [{ name: "Фильм не найден" }];
  //       // }
  //     });
  //   },
  // },
  ready() {
    var self = this;
    window.addEventListener(
      "click",
      function(e) {
        if (!e.target.parentNode.classList.contains("menu__link--toggle")) {
          self.close();
        }
      },
      false
    );
  },
  created() {
    const baseRef = firebase.database().ref("pages/main");
    baseRef.on("value", snapshot => {
      if (snapshot.val() !== null) {
        this.mainPageData = snapshot.val();
      }
    });
    const moviesRef = firebase.database().ref("movies");
    moviesRef.on("value", snapshot => {
      if (snapshot.val() !== null) {
        this.moviesData = snapshot.val();
      }
    });
    const bannersRef = firebase.database().ref("banners/topcards");
    bannersRef.on("value", snapshot => {
      if (snapshot.val() !== null) {
        this.banners = snapshot.val();
      }
    });
  }
};
</script>

<style lang="scss" scoped>
header {
  margin-bottom: 40px;
  box-shadow: 0px 0px 10px 10px #ffffffda;
  background-color: #ffffffda;

  .container {
    display: flex;
    justify-content: space-between;
  }
}
.logo {
  height: 86px;

  h4 {
    margin: 0;
    padding: 15px 0 0 10px;
    color: #000;
  }
  .brand-image {
    width: 130px;
  }
  &:hover {
    opacity: 0.7;
  }
}

nav {
  .info {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__contacts {
      margin-left: 30px;

      &-img:nth-child(1) {
        color: #205a9b;
      }
      &-img:nth-child(2) {
        color: #00acf4;
      }
      &-img:nth-child(3) {
        color: #25668c;
      }
      &-img:nth-child(4) {
        color: #3a9dbf;
      }
      &-img:nth-child(5) {
        color: #d92e7f;
      }
      &-img:nth-child(6) {
        color: #fc9002;
      }
      &-img:nth-child(7) {
        color: #de2c02;
      }

      &-img:hover {
        color: #8080808a;
      }
    }

    &__phone {
      margin-left: 30px;
    }

    &__search {
      width: 200px;
      max-width: 200px;
      position: relative;

      input {
        width: 100%;
        &:focus {
          outline: none;
        }
      }
      ul {
        width: 100%;
        margin: 0;
        padding: 0;
        position: absolute;
        z-index: 10;
        top: 30px;
        box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
        border-radius: 4px;
        background: #ffffffda;

        .info__search-movie {
          display: flex;
          align-items: center;
          margin: 5px 0 5px 5px;
          cursor: pointer;
          color: #000;
          &:hover {
            background: #fff;
            color: #6c757d;
          }

          img {
            width: 30px;
            height: 45px;
          }
          p {
            margin: 0 0 0 5px;
          }
        }
      }
    }
  }

  a.nav-link {
    color: #000;
    &:hover {
      background: #fff;
    }
    &:not(.active):hover {
      color: #6c757d;
    }
  }

  .active {
    background: #e4e3e3;
  }

  ul {
    list-style: none;
  }

  .menu__item {
    position: relative;
  }

  .menu__link {
    /* position: relative; */
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      /* position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%); */
      cursor: pointer;
    }
  }

  .open .dropdown-menu {
    display: block;
  }

  .dropdown-menu {
    font-size: 0.9rem;
    position: absolute;
    min-width: 130px;
    top: 2.2rem;
    left: -6rem;
    display: none;
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    background: #ffffffda;

    .active {
      background: #e4e3e3;
    }
  }
  .languages img {
    width: 30px;
    margin-right: 10px;
  }
}
</style>
