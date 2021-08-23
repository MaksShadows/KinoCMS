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
      <div class="create__gallery">
        <PagesContactsGallery
          v-for="(block, index) in galleryData"
          :key="block.id"
          :data="block"
          :gallery="galleryData"
          @remove="galleryData.splice(index, 1)"
          class="gallery__block"
        />
        <button
          @click="addGalleryBlock()"
          class="btn btn-default gallery__block-add"
        >
          <span></span>
          Добавить еще кинотеатр
        </button>
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
      @click="galleryPromise"
    >
      Сохранить
    </button>
  </div>
</template>

<script>
import PagesContactsGallery from "@/components/adminPages/pages/PagesContactsGallery.vue";
import firebase from "firebase";

export default {
  name: "PagesAddContacts",
  components: {
    PagesContactsGallery
  },
  props: ["dataOb", "dbRef"],
  data() {
    return {
      ref: this.dbRef,

      galleryData: [],

      pageData: {
        id: "",
        status: false,
        date: "",
        galleryCinema: [],
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
    addGalleryBlock() {
      this.galleryData.push({
        id: Math.floor(Math.random() * 10000),
        status: false,
        name: "",
        adress: "",
        map: ""
      });
      console.log(this.galleryData);
    },

    galleryPromise() {
      this.$refs.btnSave.classList.add("show");
      this.$refs.btnSave.textContent = "Сохраняется";
      const storageGalleryRef = firebase.storage().ref(this.galleryRef);

      if (this.galleryData.length > 0) {
        let galleryImage = this.galleryData.filter(ob => {
          return ob.mainImage.id === undefined;
        });

        Promise.all(
          galleryImage.map(value => {
            if (value.mainImage !== undefined)
              return new Promise(resolve => {
                resolve(
                  storageGalleryRef
                    .child(value.mainImage.name)
                    .put(value.mainImage.file)
                    .then(snapshot => snapshot.ref.getDownloadURL())
                    .then(
                      url =>
                        (value = {
                          id: value.id,
                          status: value.status,
                          name: value.name,
                          adress: value.adress,
                          map: value.map,
                          mainImage: {
                            id: Math.floor(Math.random() * 10000),
                            name: value.mainImage.name,
                            imageUrl: url
                          }
                        })
                    )
                );
              });
          })
        ).then(gallery => this.onUpload(gallery));
      } else {
        alert("Выберете картинки для галереи");
        this.$refs.btnSave.textContent = "Сохранить";
        this.$refs.btnSave.classList.remove("show");
      }
    },

    onUpload(gallery) {
      let oldGallery = this.galleryData.filter(ob => {
        return ob.mainImage.id !== undefined;
      });

      let newGallery = oldGallery.concat(gallery);

      let date = new Date();
      let day;
      if (date.getDate().toString().length === 1) {
        day = "0" + date.getDate();
      }
      let month;
      if (date.getMonth().toString().length === 1) {
        month = "0" + date.getMonth();
      }
      let year = date.getFullYear();
      let dateCreate = `${day}.${month}.${year}`;

      this.pageData.id = Math.floor(Math.random() * 10000);
      this.pageData.date = dateCreate;
      this.pageData.galleryCinema = newGallery;

      const baseRef = firebase.database().ref(this.ref);
      baseRef
        .set(this.pageData)
        .then((this.$refs.btnSave.textContent = "Сохранено"))
        .then(this.$refs.btnSave.classList.remove("show"))
        .then(this.$router.push("/admin/pages"));
    }
  },

  created() {
    if (this.dataOb !== undefined && Object.keys(this.dataOb).length !== 0) {
      this.pageData = this.dataOb;
      if (this.dataOb.galleryCinema.length !== 0) {
        this.galleryData = this.dataOb.galleryCinema;
      }
    } else if (this.dataOb === undefined) {
      this.$router.push("/admin/pages");
    }
  }
};
</script>

<style lang="scss" scoped>
.main-block {
}
.create {
  &__status {
    padding: 20px 18%;
    display: flex;
    justify-content: center;
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

  &__link {
    padding: 20px 40px;
    input {
      width: 40%;
      margin-left: 45px;
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
    margin: 20px auto;
    width: 285px;
    position: relative;
    display: flex;
    justify-content: center;

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
  &-save {
    margin: 0 0 20px 20px;
    &.show {
      color: #178817;
      border: 2px solid #55cc55;
    }
  }
}
</style>
