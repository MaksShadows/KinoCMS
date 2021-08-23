<template>
  <div class="shares-list">
    <h3>Список Страницу</h3>
    <div class="title title-main">
      <div class="title__name">Название</div>
      <div class="title__date">Дата создания</div>
      <div class="title__status">Статус</div>
    </div>
    <PagesMain :key="mainPage.id" :data="mainPage" />
    <PagesAboutCinema :key="aboutCinemaPage.id" :data="aboutCinemaPage" />
    <PagesCafe :key="cafePage.id" :data="cafePage" />
    <PagesVipHall :key="vipHallPage.id" :data="vipHallPage" />
    <PagesAd :key="adPage.id" :data="adPage" />
    <PagesKidRoom :key="kidRoomPage.id" :data="kidRoomPage" />
    <PagesContacts :key="contactsPage.id" :data="contactsPage" />

    <PagesList
      v-for="(page, index) in pagesList"
      :key="page.id"
      :data="page"
      :dataArr="pagesList"
      :dbRef="ref"
      :dbMainImageRef="mainImageRef"
      :dbGalleryRef="galleryRef"
      @remove="deletePage(index)"
    />
    <router-link
      class="btn btn-default shares-list-add"
      tag="button"
      :to="{
        name: 'PagesAddNewPage',
        params: {
          way: 'pages-add-page',
          dataArr: pagesList,
          dbRef: ref,
          dbMainImageRef: mainImageRef,
          dbGalleryRef: galleryRef
        }
      }"
    >
      <span></span>
      Создать Страницу
    </router-link>
  </div>
</template>

<script>
import PagesMain from "@/components/adminPages/pages/PagesMain.vue";
import PagesAboutCinema from "@/components/adminPages/pages/PagesAboutCinema.vue";
import PagesCafe from "@/components/adminPages/pages/PagesCafe.vue";
import PagesVipHall from "@/components/adminPages/pages/PagesVipHall.vue";
import PagesAd from "@/components/adminPages/pages/PagesAd.vue";
import PagesKidRoom from "@/components/adminPages/pages/PagesKidRoom.vue";
import PagesContacts from "@/components/adminPages/pages/PagesContacts.vue";
import PagesList from "@/components/adminPages/pages/PagesList.vue";
import firebase from "firebase";

export default {
  name: "Pages",
  components: {
    PagesMain,
    PagesAboutCinema,
    PagesCafe,
    PagesVipHall,
    PagesAd,
    PagesKidRoom,
    PagesContacts,
    PagesList
  },
  data() {
    return {
      mainPage: {},
      aboutCinemaPage: {},
      cafePage: {},
      vipHallPage: {},
      adPage: {},
      kidRoomPage: {},
      contactsPage: {},
      pagesList: [],

      ref: "pages/new",
      mainImageRef: "pages/new/main",
      galleryRef: "pages/new/gallery"
    };
  },
  methods: {
    deletePage(index) {
      this.pagesList.splice(index, 1);
      const baseRef = firebase.database().ref(this.ref);
      baseRef.set(this.pagesList);
    }
  },
  created() {
    const mainPageRef = firebase.database().ref("pages/main");
    mainPageRef.on("value", snapshot => {
      if (snapshot.val() !== null) {
        this.mainPage = snapshot.val();
      }
    });
    const aboutCinemaPageRef = firebase.database().ref("pages/aboutCinema");
    aboutCinemaPageRef.on("value", snapshot => {
      if (snapshot.val() !== null) {
        this.aboutCinemaPage = snapshot.val();
      }
    });
    const cafePageRef = firebase.database().ref("pages/cafe");
    cafePageRef.on("value", snapshot => {
      if (snapshot.val() !== null) {
        this.cafePage = snapshot.val();
      }
    });
    const vipHallPageRef = firebase.database().ref("pages/vipHall");
    vipHallPageRef.on("value", snapshot => {
      if (snapshot.val() !== null) {
        this.vipHallPage = snapshot.val();
      }
    });
    const adPageRef = firebase.database().ref("pages/ad");
    adPageRef.on("value", snapshot => {
      if (snapshot.val() !== null) {
        this.adPage = snapshot.val();
      }
    });
    const kidRoomPageRef = firebase.database().ref("pages/kidRoom");
    kidRoomPageRef.on("value", snapshot => {
      if (snapshot.val() !== null) {
        this.kidRoomPage = snapshot.val();
      }
    });
    const contactsPageRef = firebase.database().ref("pages/contacts");
    contactsPageRef.on("value", snapshot => {
      if (snapshot.val() !== null) {
        this.contactsPage = snapshot.val();
      }
    });
    const baseRef = firebase.database().ref(this.ref);
    baseRef.on("value", snapshot => {
      if (snapshot.val() !== null) {
        this.pagesList = snapshot.val();
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.shares-list {
  padding: 20px 40px;
  position: relative;

  h3 {
    padding: 20px 10px;
    display: flex;
    justify-content: center;
  }
  &-add {
    margin: 20px auto;
    width: 215px;
    position: absolute;
    top: 20px;
    right: 35px;

    span {
      width: 20px;
      height: 20px;
      display: flex;
      position: absolute;
      left: 11px;
      top: 8px;
    }
    span::after,
    span::before {
      content: " ";
      position: absolute;
      background-color: #72bb53;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    span::after {
      width: 20px;
      height: 2px;
    }
    span::before {
      width: 2px;
      height: 20px;
    }
  }

  .title {
    display: flex;
    justify-content: center;
    &-main {
      margin: 0 70px 0 60px;
    }

    &__date,
    &__name,
    &__status {
      border: 1px solid #9a9a9a;
      background: #d0d0d0;
      width: 40%;
      height: 40px;
      padding-left: 10px;
      align-items: center;
      display: flex;
    }
  }
}
</style>
