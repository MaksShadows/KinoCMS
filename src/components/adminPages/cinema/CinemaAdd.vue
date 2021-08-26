<template>
  <div class="main-block">
    <div class="create">
      <div class="create__name d-flex">
        <p>Название кинотеатра</p>
        <input
          v-model="cinemaData.name"
          type="text"
          placeholder="Название кинотеатра"
        />
      </div>
      <div class="create__description d-flex">
        <p>Описание</p>
        <textarea
          v-model="cinemaData.description"
          type="text"
          placeholder="Описание"
        ></textarea>
      </div>
      <div class="create__conditions d-flex">
        <p>Условия</p>
        <textarea
          v-model="cinemaData.conditions"
          type="text"
          placeholder="Условия"
        ></textarea>
      </div>
      <div class="create__main-img d-flex">
        <p>Логотип</p>
        <CinemaAddLogoImage
          :sourceRef="mainImageRef"
          :sourceData="mainImageData"
          @mainImageChanged="mainImageFile"
        />
      </div>
      <div class="create__main-img d-flex">
        <p>Фото верхнего баннера</p>
        <CinemaAddBannerImage
          :sourceRef="topBannerRef"
          :sourceData="topBannerData"
          @topBannerChanged="topBannerFile"
        />
      </div>
      <div class="create__gallery">
        <p>Галерея картинок</p>
        <div class="d-flex">
          <p>Размер: 1000х190</p>
          <div class="create__gallery-img d-flex flex-wrap">
            <CinemaAddGallery
              v-for="(block, index) in galleryData"
              :key="block.name"
              :data="block"
              :sourceRef="galleryRef"
              @remove="galleryData.splice(index, 1)"
              class="gallery__block"
            />
            <button
              @click="openFileDialog()"
              class="btn btn-default gallery__block-add"
            >
              <input
                ref="fileDialog"
                @change="addImage"
                style="display: none"
                type="file"
              />
              Добавить<br />фото
            </button>
          </div>
        </div>
      </div>
      <div class="create__hall-list">
        <h5>Список Залов</h5>
        <div class="title title-main">
          <div class="title__name">Название</div>
          <div class="title__date">Дата создания</div>
        </div>
        <HallList
          v-for="(hall, index) in hallData"
          :key="hall.id"
          :data="hall"
          :dataArrS="dataSource"
          :dataObS="cinemaData"
          :dataImgS="mainImageData"
          :dataBannerS="topBannerData"
          :dataGalleryS="galleryData"
          :hallDataS="hallData"
          @remove="hallData.splice(index, 1)"
        />
        <router-link
          class="btn btn-default hall-list-add"
          tag="button"
          :to="{
            name: 'HallAdd',
            params: {
              way: 'add-hall',
              dataArrS: dataSource,
              dataObS: cinemaData,
              dataImgS: mainImageData,
              dataBannerS: topBannerData,
              dataGalleryS: galleryData,
              hallDataS: hallData
            }
          }"
        >
          <span></span>
          Создать Зал
        </router-link>
      </div>
      <div class="create__seo d-flex">
        <p>SEO блок:</p>
        <div class="create__seo-info">
          <div class="create__seo-info-block d-flex">
            <p>URL:</p>
            <input v-model="cinemaData.SEO.url" type="text" placeholder="URL" />
          </div>
          <div class="create__seo-info-block d-flex">
            <p>Title:</p>
            <input
              v-model="cinemaData.SEO.title"
              type="text"
              placeholder="Title"
            />
          </div>
          <div class="create__seo-info-block d-flex">
            <p>Keywords:</p>
            <input
              v-model="cinemaData.SEO.keyword"
              type="text"
              placeholder="word"
            />
          </div>
          <div class="create__seo-info-block d-flex">
            <p>Description:</p>
            <input
              v-model="cinemaData.SEO.description"
              type="text"
              placeholder="Description"
            />
          </div>
        </div>
      </div>
    </div>
    <button
      class="btn btn-default btn-save"
      ref="btnSave"
      @click="mainImagePromise"
    >
      Сохранить
    </button>
  </div>
</template>

<script>
import CinemaAddLogoImage from "@/components/adminPages/cinema/CinemaAddLogoImage.vue";
import CinemaAddBannerImage from "@/components/adminPages/cinema/CinemaAddBannerImage.vue";
import CinemaAddGallery from "@/components/adminPages/cinema/CinemaAddGallery.vue";
import HallList from "@/components/adminPages/cinema/HallList.vue";
import firebase from "firebase";
import "firebase/database";
import "firebase/storage";

export default {
  name: "CinemaAdd",
  components: {
    CinemaAddLogoImage,
    CinemaAddBannerImage,
    CinemaAddGallery,
    HallList
  },
  props: [
    "dataArr",
    "dataOb",
    "dataImg",
    "dataBanner",
    "dataGallery",
    "dataHall",

    "dbRef",
    "dbMainImageRef",
    "dbTopBannerRef",
    "dbGalleryRef"
  ],
  data() {
    return {
      cinemaDataArr: this.dataArr,
      cinemaDataOb: this.dataOb,
      mainImageData: this.dataImg,
      topBannerData: this.dataBanner,
      galleryDataArr: this.dataGallery,
      hallDataArr: this.dataHall,

      dataSource: [],
      galleryData: [],
      hallData: [],

      ref: this.dbRef,
      mainImageRef: this.dbMainImageRef,
      topBannerRef: this.dbTopBannerRef,
      galleryRef: this.dbGalleryRef,

      cinemaData: {
        id: "",
        name: "",
        description: "",
        conditions: "",
        mainImage: {},
        topBanner: {},
        galleryImages: [],
        hallList: [],
        SEO: {
          url: "",
          title: "",
          keyword: "",
          description: ""
        }
      }
    };
  },
  methods: {
    openFileDialog() {
      this.$refs.fileDialog.click();
    },
    addImage() {
      const file = this.$refs.fileDialog.files[0];
      if (file !== undefined) {
        this.galleryData.push({
          name: file.name,
          imageFile: file
        });
      }
    },
    mainImageFile(file) {
      if (file !== undefined) {
        this.mainImageData = file;
      }
    },
    topBannerFile(file) {
      if (file !== undefined) {
        this.topBannerData = file;
      }
    },

    mainImagePromise() {
      this.$refs.btnSave.classList.add("show");
      this.$refs.btnSave.textContent = "Сохраняется";
      const storageImageRef = firebase.storage().ref(this.mainImageRef);

      if (this.mainImageData.name !== undefined) {
        new Promise(resolve => {
          resolve(
            storageImageRef
              .child(this.mainImageData.name)
              .put(this.mainImageData)
              .then(snapshot => snapshot.ref.getDownloadURL())
              .then(url => ({
                name: this.mainImageData.name,
                imageUrl: url
              }))
          );
        }).then(mainImg => this.topBannerPromise(mainImg));
      } else {
        if (Object.keys(this.cinemaData.mainImage).length !== 0) {
          this.topBannerPromise(this.cinemaData.mainImage);
        } else {
          alert("Укажите логотип");
          this.$refs.btnSave.textContent = "Сохранить";
          this.$refs.btnSave.classList.remove("show");
        }
      }
    },

    topBannerPromise(mainImg) {
      const storageImageRef = firebase.storage().ref(this.topBannerRef);

      if (this.topBannerData.name !== undefined) {
        new Promise(resolve => {
          resolve(
            storageImageRef
              .child(this.topBannerData.name)
              .put(this.topBannerData)
              .then(snapshot => snapshot.ref.getDownloadURL())
              .then(url => ({
                name: this.topBannerData.name,
                imageUrl: url
              }))
          );
        }).then(topBanner => this.galleryPromise(mainImg, topBanner));
      } else {
        if (Object.keys(this.cinemaData.topBanner).length !== 0) {
          this.galleryPromise(mainImg, this.cinemaData.topBanner);
        } else {
          alert("Укажите баннер");
          this.$refs.btnSave.textContent = "Сохранить";
          this.$refs.btnSave.classList.remove("show");
        }
      }
    },

    galleryPromise(mainImg, topBanner) {
      const storageGalleryRef = firebase.storage().ref(this.galleryRef);

      if (this.galleryData.length > 0) {
        let galleryImage = this.galleryData.filter(image => {
          return image.id === undefined;
        });
        Promise.all(
          galleryImage.map(value => {
            if (value.imageFile !== undefined)
              return new Promise(resolve => {
                resolve(
                  storageGalleryRef
                    .child(value.name)
                    .put(value.imageFile)
                    .then(snapshot => snapshot.ref.getDownloadURL())
                    .then(
                      url =>
                        (value = {
                          id: Math.floor(Math.random() * 10000),
                          name: value.name,
                          imageUrl: url
                        })
                    )
                );
              });
          })
        ).then(gallery => this.saveData(mainImg, topBanner, gallery));
      } else {
        alert("Выберете картинки для галереи");
        this.$refs.btnSave.textContent = "Сохранить";
        this.$refs.btnSave.classList.remove("show");
      }
    },

    saveData(mainImg, topBanner, gallery) {
      let dataEdit = this.dataSource.find(cinema => {
        return cinema.id === this.cinemaData.id;
      });
      if (dataEdit !== undefined) {
        let oldGallery = this.galleryData.filter(image => {
          return image.id !== undefined;
        });
        let newGallery = oldGallery.concat(gallery);
        this.onUpload(mainImg, topBanner, newGallery);
      } else {
        this.onUpload(mainImg, topBanner, gallery);
      }
    },
    onUpload(mainImg, topBanner, gallery) {
      let newData = this.dataSource.filter(cinema => {
        return cinema.id !== this.cinemaData.id;
      });
      this.cinemaData.id = Math.floor(Math.random() * 10000);
      this.cinemaData.mainImage = mainImg;
      this.cinemaData.topBanner = topBanner;
      this.cinemaData.galleryImages = gallery;
      this.cinemaData.hallList = this.hallData;
      newData.push(this.cinemaData);

      const baseRef = firebase.database().ref(this.ref);
      baseRef
        .set(newData)
        .then((this.$refs.btnSave.textContent = "Сохранено"))
        .then(this.$refs.btnSave.classList.remove("show"))
        .then(this.$router.push("/admin/cinema"));
    }
  },

  created() {
    // console.log(this.cinemaDataArr);
    // console.log(this.cinemaDataOb);
    // console.log(this.mainImageData);
    // console.log(this.topBannerData);
    // console.log(this.hallData);
    // console.log(this.hallDataArr);
    // console.log(this.cinemaData.hallList);

    // if (JSON.stringify(this.dataObject)[2]) {
    //   console.log("Не пуст");
    // } else {
    //   console.log("пуст");
    // }
    // (Object.keys(this.dataObject).length !== 0)
    // if (this.dataObject !== undefined) {
    //   this.movieData = this.dataObject;
    //   console.log(this.movieData);
    // }else {
    //   this.$router.push("/admin/cinema");
    // }

    if (this.cinemaDataArr === null) {
      this.dataSource = [];
    } else if (
      this.cinemaDataArr !== undefined &&
      this.cinemaDataArr.length > 0
    ) {
      this.dataSource = this.cinemaDataArr;
      // console.log(this.dataSource);
      if (
        this.cinemaDataOb !== undefined &&
        Object.keys(this.cinemaDataOb).length !== 0
      ) {
        this.cinemaData = this.cinemaDataOb;
        if (this.cinemaDataOb.galleryImages.length !== 0) {
          this.galleryData = this.cinemaDataOb.galleryImages;
        } else {
          this.galleryData = this.galleryDataArr;
        }

        if (this.hallDataArr !== undefined && this.hallDataArr.length > 0) {
          this.hallData = this.hallDataArr;
        }
        // this.mainImageData = this.mainImageData;
        // this.topBannerData = this.topBannerData;
        // console.log(this.mainImageData);
        // console.log(this.movieData);
      }
    } else {
      this.$router.push("/admin/cinema");
    }
  }
};
</script>

<style lang="scss" scoped>
.create {
  &__name {
    padding: 20px 40px;
    input {
      width: 200px;
      margin-left: 30px;
      padding: 5px;
      transition: width 0.4s ease-in-out;
      &::placeholder {
        padding-left: 7px;
      }
      &:focus {
        width: 50%;
        padding-left: 10px;
      }
    }
  }
  &__description {
    padding: 20px 40px;
    textarea {
      width: 40%;
      height: 100px;
      margin-left: 114px;
      padding: 5px;
      transition: width 0.4s ease-in-out;
      &::placeholder {
        padding-left: 7px;
      }
      &:focus {
        width: 70%;
        padding-left: 10px;
      }
    }
  }
  &__conditions {
    padding: 20px 40px;
    textarea {
      width: 40%;
      height: 100px;
      margin-left: 127px;
      padding: 5px;
      transition: width 0.4s ease-in-out;
      &::placeholder {
        padding-left: 7px;
      }
      &:focus {
        width: 70%;
        padding-left: 10px;
      }
    }
  }
  &__main-img {
    padding: 20px 40px;
  }
  &__gallery {
    padding: 20px 40px;
  }
  &__hall-list {
    padding: 20px 40px;

    h5 {
      padding: 20px 10px;
      display: flex;
      justify-content: center;
    }
    .hall-list-add {
      margin: 20px auto;
      width: 180px;
      position: relative;

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
        margin: 0 35px 0 -35px;
      }

      &__date,
      &__name {
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
  &__seo {
    padding: 25px 40px;
    &-info {
      width: 70%;
      margin-left: 20px;
      &-block {
        padding: 10px 40px;

        &:nth-child(1) input {
          margin-left: 80px;
        }
        &:nth-child(2) input {
          margin-left: 78px;
        }
        &:nth-child(3) input {
          margin-left: 40px;
        }
        &:nth-child(4) input {
          margin-left: 28px;
        }

        input {
          width: 200px;
          padding: 5px;
          transition: width 0.4s ease-in-out;
          &::placeholder {
            padding-left: 7px;
          }
          &:focus {
            width: 50%;
            padding-left: 10px;
          }
        }
      }
    }
  }
}
.btn {
  &.gallery__block-add {
    width: 130px;
    height: 80px;
    margin: 25px 70px;
  }
  &-save {
    margin: 0 0 20px 20px;
    &.show {
      color: #178817;
      border: 2px solid #55cc55;
    }
  }
}
</style>
