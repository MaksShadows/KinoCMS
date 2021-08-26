<template>
  <div class="main-block">
    <div class="create">
      <div class="create__status">
        <div class="custom-control custom-switch custom-switch-on-success">
          <input
            v-model="mainPageData.status"
            type="checkbox"
            class="custom-control-input"
            id="customSwitch3"
          />
          <label
            class="custom-control-label"
            for="customSwitch3"
            v-if="mainPageData.status"
          >
            Показывать
          </label>
          <label class="custom-control-label" for="customSwitch3" v-else
            >Не показывать
          </label>
        </div>
      </div>

      <div class="create__phone d-flex">
        <p>Телефон</p>
        <input
          v-model="mainPageData.phone1"
          type="text"
          placeholder="777 85 98"
        />
        <input
          v-model="mainPageData.phone2"
          type="text"
          placeholder="777 85 98"
        />
      </div>
      <div class="create__description d-flex">
        <p>SEO текст</p>
        <textarea
          v-model="mainPageData.SEOBlock"
          type="text"
          placeholder="Текст"
        ></textarea>
      </div>

      <div class="create__seo d-flex">
        <p>SEO блок:</p>
        <div class="create__seo-info">
          <div class="create__seo-info-block d-flex">
            <p>URL:</p>
            <input
              v-model="mainPageData.SEO.url"
              type="text"
              placeholder="URL"
            />
          </div>
          <div class="create__seo-info-block d-flex">
            <p>Title:</p>
            <input
              v-model="mainPageData.SEO.title"
              type="text"
              placeholder="Title"
            />
          </div>
          <div class="create__seo-info-block d-flex">
            <p>Keywords:</p>
            <input
              v-model="mainPageData.SEO.keyword"
              type="text"
              placeholder="word"
            />
          </div>
          <div class="create__seo-info-block d-flex">
            <p>Description:</p>
            <input
              v-model="mainPageData.SEO.description"
              type="text"
              placeholder="Description"
            />
          </div>
        </div>
      </div>
    </div>
    <button class="btn btn-default btn-save" ref="btnSave" @click="onUpload">
      Сохранить
    </button>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "PagesAddMain",
  props: ["dataOb", "dbRef"],
  data() {
    return {
      ref: this.dbRef,

      mainPageData: {
        id: "",
        phone1: "",
        phone2: "",
        date: "",
        status: false,
        SEOBlock: "",
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
    onUpload() {
      this.$refs.btnSave.classList.add("show");
      this.$refs.btnSave.textContent = "Сохраняется";

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

      this.mainPageData.date = dateCreate;
      this.mainPageData.id = Math.floor(Math.random() * 10000);

      const baseRef = firebase.database().ref(this.ref);
      baseRef
        .set(this.mainPageData)
        .then((this.$refs.btnSave.textContent = "Сохранено"))
        .then(this.$refs.btnSave.classList.remove("show"))
        .then(this.$router.push("/admin/pages"));
    }
  },

  created() {
    if (this.dataOb !== undefined && Object.keys(this.dataOb).length !== 0) {
      this.mainPageData = this.dataOb;
    }
  }
};
</script>

<style lang="scss" scoped>
.create {
  &__status {
    padding: 20px 18%;
  }
  &__phone {
    padding: 20px 40px;
    input {
      width: 200px;
      margin-left: 35px;
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
  &-save {
    margin: 0 0 20px 20px;
    &.show {
      color: #178817;
      border: 2px solid #55cc55;
    }
  }
}
</style>
