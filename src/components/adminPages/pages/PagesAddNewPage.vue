<template>
  <div class="main-block">
    <div class="create">
      <div class="create__status">
        <div class="custom-control custom-switch custom-switch-on-success">
          <input
            v-model="pageData.status"
            type="checkbox"
            class="custom-control-input"
            id="customSwitch3"
          />
          <label
            class="custom-control-label"
            for="customSwitch3"
            v-if="pageData.status"
          >
            Показывать
          </label>
          <label class="custom-control-label" for="customSwitch3" v-else
            >Не показывать
          </label>
        </div>
      </div>

      <div class="create__name d-flex">
        <p>Название</p>
        <input v-model="pageData.name" type="text" placeholder="Название" />
          <p class="date-title">Дата публикации</p>
        <DatePicker
          class="date-title"
          :date="pageData.date"
          @dateChange="newDateValue"
        />
      </div>
      <div class="create__description d-flex">
        <p>Описание</p>
        <textarea
          v-model="pageData.description"
          type="text"
          placeholder="Описание"
        ></textarea>
      </div>
      <div class="create__main-img d-flex">
        <p>Главная картинка</p>
        <PagesAddImage
          :sourceData="pageData.mainImage"
          @mainImageChanged="mainImageFile"
        />
      </div>

      <div class="create__gallery">
        <p>Галерея картинок</p>
        <div class="d-flex">
          <p>Размер: 1000х190</p>
          <div class="create__gallery-img d-flex flex-wrap">
            <PagesAddGallery
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
              Добавить<br />фото
            </button>
          </div>
        </div>
      </div>
      <div class="create__seo d-flex">
        <p>SEO блок:</p>
        <div class="create__seo-info">
          <div class="create__seo-info-block d-flex">
            <p>URL:</p>
            <input v-model="pageData.SEO.url" type="text" placeholder="URL" />
          </div>
          <div class="create__seo-info-block d-flex">
            <p>Title:</p>
            <input
              v-model="pageData.SEO.title"
              type="text"
              placeholder="Title"
            />
          </div>
          <div class="create__seo-info-block d-flex">
            <p>Keywords:</p>
            <input
              v-model="pageData.SEO.keyword"
              type="text"
              placeholder="word"
            />
          </div>
          <div class="create__seo-info-block d-flex">
            <p>Description:</p>
            <input
              v-model="pageData.SEO.description"
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
import PagesAddImage from "@/components/adminPages/pages/PagesAddImage.vue";
import PagesAddGallery from "@/components/adminPages/pages/PagesAddGallery.vue";
import DatePicker from "@/components/adminPages/DatePicker.vue";

import firebase from "firebase";
export default {
  name: "PagesAddNewPage",
  components: {
    PagesAddImage,
    PagesAddGallery,
    DatePicker
  },
  props: ["dataArr", "dataOb", "dbRef", "dbMainImageRef", "dbGalleryRef"],
  data() {
    return {
      ref: this.dbRef,
      mainImageRef: this.dbMainImageRef,
      galleryRef: this.dbGalleryRef,

      dataSource: [],
      galleryData: [],
      pageData: {
        id: "",
        name: "",
        status: false,
        date: "",
        description: "",
        // mainImage: {},
        galleryImages: [],
        link: "",
        SEO: {
          url: "",
          title: "",
          keyword: "",
          description: "",
        },
      },
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
          imageFile: file,
        });
      }
    },
    mainImageFile(file) {
      if (file !== undefined) {
        this.pageData.mainImage = file;
      }
    },
     newDateValue(value) {
      this.pageData.date = value;
    },

    mainImagePromise() {
      this.$refs.btnSave.classList.add("show");
      this.$refs.btnSave.textContent = "Сохраняется";
      const storageImageRef = firebase.storage().ref(this.mainImageRef);
      if (
        this.pageData.mainImage !== undefined &&
        this.pageData.mainImage.imageUrl === undefined
      ) {
        new Promise((resolve) => {
          resolve(
            storageImageRef
              .child(this.pageData.mainImage.name)
              .put(this.pageData.mainImage)
              .then((snapshot) => snapshot.ref.getDownloadURL())
              .then((url) => ({
                name: this.pageData.mainImage.name,
                imageUrl: url,
              }))
          );
        }).then((mainImg) => this.galleryPromise(mainImg));
      } else if (
        this.pageData.mainImage !== undefined &&
        this.pageData.mainImage.imageUrl !== undefined
      ) {
        // if (Object.keys(this.pageData.mainImage).length !== 0) {
        this.galleryPromise(this.pageData.mainImage);
        //   console.log(this.pageData.mainImage, "3");
      } else {
        alert("Укажите главную картинку");
        this.$refs.btnSave.textContent = "Сохранить";
        this.$refs.btnSave.classList.remove("show");
      }
    },
    galleryPromise(mainImg) {
      const storageGalleryRef = firebase.storage().ref(this.galleryRef);
      if (this.galleryData.length > 0) {
        let galleryImage = this.galleryData.filter((image) => {
          return image.id === undefined;
        });
        Promise.all(
          galleryImage.map((value) => {
            if (value.imageFile !== undefined)
              return new Promise((resolve) => {
                resolve(
                  storageGalleryRef
                    .child(value.name)
                    .put(value.imageFile)
                    .then((snapshot) => snapshot.ref.getDownloadURL())
                    .then(
                      (url) =>
                        (value = {
                          id: Math.floor(Math.random() * 10000),
                          name: value.name,
                          imageUrl: url,
                        })
                    )
                );
              });
          })
        ).then((gallery) => this.saveData(mainImg, gallery));
      } else {
        alert("Выберете картинки для галереи");
        this.$refs.btnSave.textContent = "Сохранить";
        this.$refs.btnSave.classList.remove("show");
      }
    },
    saveData(mainImg, gallery) {
      let dataEdit = this.dataSource.find(news => news.id === this.pageData.id);
      if (dataEdit !== undefined) {
        let oldGallery = this.galleryData.filter(
          image => image.id !== undefined
        );
        let newGallery = oldGallery.concat(gallery);
        this.onUpload(mainImg, newGallery);
      } else {
        this.onUpload(mainImg, gallery);
      }
    },
  onUpload(mainImg, gallery) {
      let newData = this.dataSource.filter(news => {
        return news.id !== this.pageData.id;
      });
      this.pageData.id = Math.floor(Math.random() * 10000);
      this.pageData.mainImage = mainImg;
      this.pageData.galleryImages = gallery;
      newData.push(this.pageData);
      const baseRef = firebase.database().ref(this.ref);
      baseRef
        .set(newData)
        .then((this.$refs.btnSave.textContent = "Сохранено"))
        .then(this.$refs.btnSave.classList.remove("show"))
        .then(this.$router.push("/admin/pages"));
    }
  },

  created() {
    if (this.dataArr !== undefined && this.dataArr.length > 0) {
      this.dataSource = this.dataArr;
      if (this.dataOb !== undefined && Object.keys(this.dataOb).length !== 0) {
        this.pageData = this.dataOb;
        if (this.dataOb.galleryImages.length !== 0) {
          this.galleryData = this.dataOb.galleryImages;
        }
      }
    } else if (this.dataArr === undefined) {
      this.$router.push("/admin/pages");
    }
  },
};
</script>

<style lang="scss" scoped>

.create {
  &__status {
    padding: 20px 18%;
  }
  &__name {
    padding: 20px 40px;
    input {
      width: 200px;
      margin-left: 97px;
      padding: 5px;
      transition: width 0.4s ease-in-out;
      &::placeholder {
        padding-left: 7px;
      }
      &:focus {
        width: 40%;
        padding-left: 10px;
      }
    }
    .date-title {
      margin-left: 35px;
    }
  }
  &__description {
    padding: 20px 40px;
    textarea {
      width: 40%;
      height: 100px;
      margin-left: 96px;
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
      margin-left: 60px;
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