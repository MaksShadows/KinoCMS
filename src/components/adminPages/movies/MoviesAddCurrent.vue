<template>
  <div class="main-block">
    <div class="create">
      <div class="create__name d-flex">
        <p>Название фильма</p>
        <input
          v-model="movieData.name"
          type="text"
          placeholder="Название фильма"
        />
      </div>
      <div class="create__description d-flex">
        <p>Описание</p>
        <textarea
          v-model="movieData.description"
          type="text"
          placeholder="Описание"
        ></textarea>
      </div>
      <div class="create__main-img d-flex">
        <p>Главная картинка</p>
        <MoviesAddCurrentImage
          :sourceRef="mainImageRef"
          :sourceData="mainImageData"
          @mainImageChanged="mainImageFile"
        />
      </div>
      <div class="create__gallery">
        <p>Галерея картинок</p>
        <div class="d-flex">
          <p>Размер: 1000х190</p>
          <div class="create__gallery-img d-flex flex-wrap">
            <MoviesAddCurrentGallery
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
      <div class="create__trailer d-flex">
        <p>Ссылка на трейлер</p>
        <input
          v-model="movieData.trailer"
          type="text"
          placeholder="Ссылка на видео в YouTube"
        />
      </div>
      <div class="create__movie-type d-flex">
        <p>Тип кино</p>
        <input type="radio" id="3d" value="3D" v-model="movieData.type" />
        <label for="3d">3D</label>
        <input type="radio" id="2d" value="2D" v-model="movieData.type" />
        <label for="2d">2D</label>
        <input type="radio" id="imax" value="IMAX" v-model="movieData.type" />
        <label for="imax">IMAX</label>
      </div>
      <div class="create__seo d-flex">
        <p>SEO блок:</p>
        <div class="create__seo-info">
          <div class="create__seo-info-block d-flex">
            <p>URL:</p>
            <input v-model="movieData.SEO.url" type="text" placeholder="URL" />
          </div>
          <div class="create__seo-info-block d-flex">
            <p>Title:</p>
            <input
              v-model="movieData.SEO.title"
              type="text"
              placeholder="Title"
            />
          </div>
          <div class="create__seo-info-block d-flex">
            <p>Keywords:</p>
            <input
              v-model="movieData.SEO.keyword"
              type="text"
              placeholder="word"
            />
          </div>
          <div class="create__seo-info-block d-flex">
            <p>Description:</p>
            <input
              v-model="movieData.SEO.description"
              type="text"
              placeholder="Description"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="buttons">
      <button
        class="btn btn-default btn-save"
        ref="btnSave"
        @click="mainImagePromise"
      >
        Сохранить
      </button>

    </div>
  </div>
</template>

<script>
 import MoviesAddCurrentImage from "@/components/adminPages/movies/MoviesAddCurrentImage.vue";
import MoviesAddCurrentGallery from "@/components/adminPages/movies/MoviesAddCurrentGallery.vue";
import firebase from "firebase";



export default {
  name: "MoviesAddCurrent",
  components: {
    MoviesAddCurrentImage,
    MoviesAddCurrentGallery,
  },
  props: [
    "dataArr",
    "dataOb",
    "dataImg",
    "dbRef",
    "dbMainImageRef",
    "dbGalleryRef",
  ],
  data() {
    return {
      dataArray: this.dataArr,
      dataObject: this.dataOb,
      dataImage: this.dataImg,

      ref: this.dbRef,
      mainImageRef: this.dbMainImageRef,
      galleryRef: this.dbGalleryRef,

      dataSource: [],

      galleryData: [],
      mainImageData: null,
      movieData: {
        id: "",
        name: "",
        description: "",
        mainImage: {},
        galleryImages: [],
        trailer: "",
        type: "",
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
          name: null,
          imageFile: file,
        });
      }
    },
    mainImageFile(file) {
      //   console.log(file);
      if (file === null) {
        //   const storageRef = firebase
        //     .storage()
        //     .ref(this.mainImageRef)
        //     .child("mainImage");
        //   storageRef.delete().catch((error) => {
        //     console.log(error);
        //   });
        //
        //   const databaseRef = firebase.database().ref();
        //   databaseRef.remove().catch((error) => {
        //     console.log(error);
        //   });
        // },
      } else {
        this.mainImageData = file;
      }
    },
    mainImagePromise() {
      this.$refs.btnSave.classList.add("show");
      this.$refs.btnSave.textContent = "Сохраняется";
      const storageImageRef = firebase.storage().ref(this.mainImageRef);

      if (this.mainImageData.name !== undefined) {
        new Promise((resolve) => {
          resolve(
            storageImageRef
              .child(this.mainImageData.name)
              .put(this.mainImageData)
              .then((snapshot) => snapshot.ref.getDownloadURL())
              .then((url) => ({
                name: this.mainImageData.name,
                imageUrl: url,
              }))
          );
        }).then((mainImg) => this.galleryPromise(mainImg));
      } else {
        this.galleryPromise(this.movieData.mainImage);
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
      }
    },

    saveData(mainImg, gallery) {
      let dataEdit = this.dataSource.find((movie) => {
        return movie.id === this.movieData.id;
      });
      if (dataEdit !== undefined) {
        let oldGallery = this.galleryData.filter((image) => {
          return image.id !== undefined;
        });
        let newGallery = oldGallery.concat(gallery);
        this.onUpload(mainImg, newGallery);
      } else {
        this.onUpload(mainImg, gallery);
      }
    },
    onUpload(mainImg, gallery) {
      let newData = this.dataSource.filter((movie) => {
        return movie.id !== this.movieData.id;
      });
      this.movieData.id = Math.floor(Math.random() * 10000);
      this.movieData.mainImage = mainImg;
      this.movieData.galleryImages = gallery;
      newData.push(this.movieData);

      const baseRef = firebase.database().ref(this.ref);
      baseRef
        .set(newData)
        .then((this.$refs.btnSave.textContent = "Сохранено"))
        .then(this.$refs.btnSave.classList.remove("show"))
        .then(this.$router.push("/admin/movies"));
    },

    restore() {
      const baseRef = firebase.database().ref(this.ref);
      baseRef.on("value", (snapshot) => {
        if (snapshot.val() !== null) {
          const dbMovieData = snapshot.val().find((movie) => {
            return movie.id === this.movieData.id;
          });
          this.movieData = dbMovieData;
        }
      });
    },
  },

  created() {
   if (this.dataArray !== undefined && this.dataArray.length > 0) {
      this.dataSource = this.dataArray;
      if (
        this.dataObject !== undefined &&
        Object.keys(this.dataObject).length !== 0
      ) {
        this.movieData = this.dataObject;
        this.galleryData = this.dataObject.galleryImages;
        this.mainImageData = this.dataImg;

    } else {
      this.$router.push("/admin/movies");
    }
  }
  },
};
</script>

<style lang="scss" scoped>

.create {
  &__name {
    padding: 20px 40px;
    input {
      width: 200px;
      margin-left: 20px;
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
      margin-left: 77px;
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
  &__trailer {
    padding: 20px 40px;
    input {
      width: 40%;
      margin-left: 20px;
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
  &__movie-type {
    padding: 20px 40px;
    input {
      margin: 7px 7px 7px 63px;
    }
    label {
      font-weight: normal;
    }
  }
  &__seo {
    padding: 20px 40px;
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
.buttons {
  display: flex;
  justify-content: center;
}
.btn {
  &.gallery__block-add {
    width: 130px;
    height: 80px;
    margin: 20px;
  }
  &-save {
    margin: 0 0 20px 20px;
    &.show {
      color: #178817;
      border: 2px solid #55cc55;
    }
  }
  &-restore {
    margin: 0 0 20px 20px;
  }
}
</style>