<template>
  <div class="main-block">
    <div class="create">
      <div class="create__number d-flex">
        <p>{{ $t("cinemaHall.hallNumber") }}</p>
        <input
          v-model="hallData.number"
          type="text"
          :placeholder="$t('cinemaHall.hallNumber')"
        />
      </div>
      <div class="create__description d-flex">
        <p>{{ $t("cinemaHall.hallDescription") }}</p>
        <textarea
          v-model="hallData.description"
          type="text"
          :placeholder="$t('description')"
        ></textarea>
      </div>
      <div class="create__main-img d-flex">
        <p>{{ $t("cinemaHall.hallSchema") }}</p>
        <HallAddPlanImage
          :sourceData="hallData.plan"
          @mainImageChanged="mainImageFile"
        />
      </div>
      <div class="create__main-img d-flex">
        <p>{{ $t("cinemaHall.topBanner") }}</p>
        <HallAddBannerImage
          :sourceData="hallData.banner"
          @topBannerChanged="topBannerFile"
        />
      </div>
      <div class="create__gallery">
        <p>{{ $t("imageGallery") }}</p>
        <div class="d-flex">
          <p>{{ $t("banners.size") }}: 1000х190</p>
          <div class="create__gallery-img d-flex flex-wrap">
            <HallAddGallery
              v-for="(block, index) in galleryData"
              :key="block.name"
              :data="block"
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
              {{ $t("add") }}
            </button>
          </div>
        </div>
      </div>
      <div class="create__seo d-flex">
        <p>SEO блок:</p>
        <div class="create__seo-info">
          <div class="create__seo-info-block d-flex">
            <p>URL:</p>
            <input v-model="hallData.SEO.url" type="text" placeholder="URL" />
          </div>
          <div class="create__seo-info-block d-flex">
            <p>Title:</p>
            <input
              v-model="hallData.SEO.title"
              type="text"
              placeholder="Title"
            />
          </div>
          <div class="create__seo-info-block d-flex">
            <p>Keywords:</p>
            <input
              v-model="hallData.SEO.keyword"
              type="text"
              placeholder="word"
            />
          </div>
          <div class="create__seo-info-block d-flex">
            <p>Description:</p>
            <input
              v-model="hallData.SEO.description"
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
      {{ $t("save") }}
    </button>
    <router-link
      class="btn btn-default btn-save"
      tag="button"
      :to="{
        name: 'CinemaAdd',
        params: {
          way: 'add-cinema',
          dataArr: cinemaDataArr,
          dataOb: cinemaDataOb,
          dataImg: mainImageData,
          dataBanner: topBannerData,
          dataGallery: galleryImgData,
          dataHall: dataSource,

          dbRef: 'cinema',
          dbMainImageRef: 'cinema/main',
          dbTopBannerRef: 'cinema/banner',
          dbGalleryRef: 'cinema/gallery'
        }
      }"
    >
      {{ $t("backToBaseVersion") }}
    </router-link>
  </div>
</template>

<script>
import HallAddPlanImage from "@/components/adminPages/cinema/HallAddPlanImage.vue";
import HallAddBannerImage from "@/components/adminPages/cinema/HallAddBannerImage.vue";
import HallAddGallery from "@/components/adminPages/cinema/HallAddGallery.vue";
import firebase from "firebase";
import "firebase/database";
import "firebase/storage";

export default {
  name: "HallAdd",
  components: {
    HallAddPlanImage,
    HallAddBannerImage,
    HallAddGallery
  },
  props: [
    "dataArrS",
    "dataObS",
    "dataImgS",
    "dataBannerS",
    "dataGalleryS",
    "hallDataS",
    "hallDataObS"
  ],
  data() {
    return {
      cinemaDataArr: this.dataArrS,
      cinemaDataOb: this.dataObS,
      mainImageData: this.dataImgS,
      topBannerData: this.dataBannerS,
      galleryImgData: this.dataGalleryS,
      hallDataArr: this.hallDataS,
      hallDataOb: this.hallDataObS,

      dataSource: [],
      galleryData: [],
      planImage: "",
      bannerImage: "",

      hallData: {
        id: "",
        number: "",
        description: "",
        // plan: {},
        // banner: {},
        // gallery: [],
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
        this.planImage = file;
      }
    },
    topBannerFile(file) {
      if (file !== undefined) {
        this.bannerImage = file;
      }
    },

    mainImagePromise() {
      this.$refs.btnSave.classList.add("show");
      this.$refs.btnSave.textContent = "Сохраняется";
      const storageImageRef = firebase.storage().ref("cinema/hall/plan");

      if (this.planImage.name !== undefined) {
        new Promise(resolve => {
          resolve(
            storageImageRef
              .child(this.planImage.name)
              .put(this.planImage)
              .then(snapshot => snapshot.ref.getDownloadURL())
              .then(url => ({
                name: this.planImage.name,
                imageUrl: url
              }))
          );
        }).then(planImg => this.topBannerPromise(planImg));
      } else {
        if (this.hallData.plan !== undefined) {
          this.topBannerPromise(this.hallData.plan);
        } else {
          alert("Укажите план зала");
          this.$refs.btnSave.textContent = "Сохранить";
          this.$refs.btnSave.classList.remove("show");
        }
      }
    },

    topBannerPromise(planImg) {
      const storageImageRef = firebase.storage().ref("cinema/hall/banner");

      if (this.bannerImage.name !== undefined) {
        new Promise(resolve => {
          resolve(
            storageImageRef
              .child(this.bannerImage.name)
              .put(this.bannerImage)
              .then(snapshot => snapshot.ref.getDownloadURL())
              .then(url => ({
                name: this.bannerImage.name,
                imageUrl: url
              }))
          );
        }).then(topBanner => this.galleryPromise(planImg, topBanner));
      } else {
        if (this.hallData.banner !== undefined) {
          this.galleryPromise(planImg, this.hallData.banner);
        } else {
          alert("Укажите банер зала");
          this.$refs.btnSave.textContent = "Сохранить";
          this.$refs.btnSave.classList.remove("show");
        }
      }
    },

    galleryPromise(planImg, topBanner) {
      const storageGalleryRef = firebase.storage().ref("cinema/hall/gallery");

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
        ).then(gallery => this.saveData(planImg, topBanner, gallery));
      } else {
        alert("Выберете картинки для галереи");
        this.$refs.btnSave.textContent = "Сохранить";
        this.$refs.btnSave.classList.remove("show");
      }
    },

    saveData(planImg, topBanner, gallery) {
      let dataEdit = this.dataSource.find(hall => {
        return hall.id === this.hallData.id;
      });
      if (dataEdit !== undefined) {
        let oldGallery = this.galleryData.filter(image => {
          return image.id !== undefined;
        });
        let newGallery = oldGallery.concat(gallery);
        this.onUpload(planImg, topBanner, newGallery);
      } else {
        this.onUpload(planImg, topBanner, gallery);
      }
    },
    onUpload(planImg, topBanner, gallery) {
      let newData = this.dataSource.filter(hall => {
        return hall.id !== this.hallData.id;
      });
      let date = new Date();
      let day;
      if (date.getDate().toString().length === 1) {
        day = "0" + date.getDate();
      } else {
        day = date.getDate();
      }
      let month;
      if (date.getMonth().toString().length === 1) {
        month = "0" + date.getMonth();
      } else {
        month = date.getMonth();
      }
      let year = date.getFullYear();
      let dateCreate = `${day}.${month}.${year}`;

      this.hallData.date = dateCreate;
      this.hallData.id = Math.floor(Math.random() * 10000);
      this.hallData.plan = planImg;
      this.hallData.banner = topBanner;
      this.hallData.gallery = gallery;
      newData.push(this.hallData);
      this.dataSource = newData;

      this.$refs.btnSave.textContent = "Сохранено";
      this.$refs.btnSave.classList.remove("show");
      this.$refs.btnSave.classList.add("hide");
    }
  },
  created() {
    if (this.cinemaDataArr !== undefined && this.cinemaDataArr.length > 0) {
      if (this.hallDataArr !== undefined && this.hallDataArr.length > 0) {
        this.dataSource = this.hallDataArr;

        if (
          this.hallDataOb !== undefined &&
          Object.keys(this.hallDataOb).length !== 0
        ) {
          this.hallData = this.hallDataOb;
          this.galleryData = this.hallDataOb.gallery;
        }
      }
    } else {
      this.$router.push("/admin/cinema");
    }
  }
};
</script>

<style lang="scss" scoped>
.create {
  &__number {
    padding: 20px 40px;
    input {
      width: 200px;
      margin-left: 100px;
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
      margin-left: 78px;
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
    &.hide {
      display: none;
    }
  }
}
</style>
