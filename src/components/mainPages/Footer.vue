<template>
  <footer class="container">
    <span class="line"></span>
    <div class="links">
      <div class="maker">
        Разработка сайтов: <br />
        AVADA-MEDIA
      </div>
      <div class="links__nav">
        <ul
          class="nav nav-pills links__nav-main"
          data-widget="treeview"
          role="menu"
        >
          <router-link
            v-for="link in links"
            :key="link.url"
            tag="li"
            active-class="active"
            :to="link.url"
          >
            <a href="#" class="nav-link">{{ link.title }}</a>
          </router-link>
        </ul>

        <ul
          class="nav nav-pills links__nav-about"
          data-widget="treeview"
          role="menu"
        >
          <router-link
            v-for="link in linksAbout"
            :key="link.url"
            tag="li"
            active-class="active"
            :to="link.url"
          >
            <a href="#" class="nav-link">{{ link.title }}</a>
          </router-link>
        </ul>
      </div>

      <div class="links__contacts">
        <a href="#" class="links__contacts-img">
          <span class="fa-stack fa-lg">
            <i class="fa fa-circle fa-stack-2x"></i>
            <i class="fab fa-facebook-f fa-stack-1x fa-inverse fa-fw"></i>
          </span>
        </a>
        <a href="#" class="links__contacts-img">
          <span class="fa-stack fa-lg">
            <i class="fa fa-circle fa-stack-2x"></i>
            <i class="fab fa-twitter fa-stack-1x fa-inverse fa-fw"></i>
          </span>
        </a>
        <a href="#" class="links__contacts-img">
          <span class="fa-stack fa-lg">
            <i class="fa fa-circle fa-stack-2x"></i>
            <i class="fab fa-vk fa-stack-1x fa-inverse fa-fw"></i>
          </span>
        </a>
        <a href="#" class="links__contacts-img">
          <span class="fa-stack fa-lg">
            <i class="fa fa-circle fa-stack-2x"></i>
            <i class="fab fa-telegram-plane fa-stack-1x fa-inverse fa-fw"></i>
          </span>
        </a>
        <a href="#" class="links__contacts-img">
          <span class="fa-stack fa-lg">
            <i class="fa fa-circle fa-stack-2x"></i>
            <i class="fab fa-instagram fa-stack-1x fa-inverse fa-fw"></i>
          </span>
        </a>
        <a href="#" class="links__contacts-img">
          <span class="fa-stack fa-lg">
            <i class="fa fa-circle fa-stack-2x"></i>
            <i class="fab fa-odnoklassniki fa-stack-1x fa-inverse fa-fw"></i>
          </span>
        </a>
        <a href="#" class="links__contacts-img">
          <span class="fa-stack fa-lg">
            <i class="fa fa-circle fa-stack-2x"></i>
            <i class="fab fa-google-plus-g fa-stack-1x fa-inverse fa-fw"></i>
          </span>
        </a>
      </div>
    </div>
    <div class="bottom">©KinoCMS 2021, All rights reserved</div>
  </footer>
</template>

<script>
export default {
  data: () => ({
    links: [
      { title: "Афиша", url: "/poster" },
      { title: "Расписание", url: "/schedule" },
      { title: "Скоро", url: "/movies" },
      { title: "Кинотеатры", url: "/cinema" },
      { title: "Акции", url: "/shares" },
      { title: "О кинотеатре", url: "/about" }
    ],
    linksAbout: [
      { title: "Новости", url: "/statistic" },
      { title: "Реклама", url: "/banners" },
      { title: "Кафе", url: "/movies" },
      { title: "Приложения", url: "/cinema" },
      { title: "Контакты", url: "/shares" }
    ]
  })
};
</script>
<style lang="scss" scoped>
footer {
  .line {
    height: 2px;
    margin: 20px 0;
    width: 100%;
    background: #000;
    display: inline-block;
  }

  .links {
    display: flex;
    justify-content: space-between;

    &__maker {
      width: 30%;
    }

    &__nav {
      width: 40%;
      display: flex;
      justify-content: space-evenly;

      &-main,
      &-about {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;

        li:first-child {
          font-weight: bold;
        }

        a.nav-link {
          &:hover {
            background: #e4e3e3;
          }
          &:not(.active):hover {
            color: #000;
          }
        }
      }
    }

    &__contacts {
      /* margin: 10px; */
      width: 30%;
      flex-wrap: wrap;

      &-img {
        /* margin: 3px 7px; */
        .fa-stack {
          margin: 7px 3px;
        }
      }

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
  }

  .bottom {
    margin: 20px 0;
    text-align: center;
  }
}
</style>
