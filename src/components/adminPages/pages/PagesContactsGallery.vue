<template>
  <div class="block">
    <div class="create">
      <div class="create__status">
        <div class="custom-control custom-switch custom-switch-on-success">
          <input
            v-model="galleryData.status"
            type="checkbox"
            class="custom-control-input"
            :id="galleryData.id"
          />
          <label
            class="custom-control-label"
            :for="galleryData.id"
            v-if="galleryData.status"
          >
            {{ $t("news.showNews") }}
          </label>
          <label class="custom-control-label" :for="galleryData.id" v-else
            >{{ $t("news.noshowNews") }}
          </label>
        </div>
        <div @click="$emit('remove')" class="btn btn-default remove">
          <!-- <svg class="remove-img" viewBox="0 0 8 8">
            <path
              d="M1.406 0l-1.406 1.406.688.719 1.781 1.781-1.781 1.781-.688.719 1.406 1.406.719-.688 1.781-1.781 1.781 1.781.719.688 1.406-1.406-.688-.719-1.781-1.781 1.781-1.781.688-.719-1.406-1.406-.719.688-1.781 1.781-1.781-1.781-.719-.688z"
              id="x"
              fill="rgba(0,0,0,0.7)"
            ></path>
          </svg> -->
          {{ $t("delete") }}
        </div>
      </div>
      <div class="create__name d-flex">
        <p>{{ $t("cinemas.cinemasName") }}</p>
        <input
          v-model="galleryData.name"
          type="text"
          :placeholder="$t('cinemas.cinemasName')"
        />
      </div>
      <div class="create__adress d-flex">
        <p>{{ $t("pages.addAdr") }}</p>
        <textarea
          v-model="galleryData.adress"
          type="text"
          :placeholder="$t('pages.addAdr')"
        ></textarea>
      </div>
      <div class="create__map d-flex">
        <p>{{ $t("pages.addCord") }}</p>
        <input
          v-model="galleryData.map"
          type="text"
          :placeholder="$t('pages.addCord')"
        />
      </div>
      <div class="create__main-img d-flex">
        <p>Главная картинка</p>
        <PagesAddImage
          :sourceData="galleryData.mainImage"
          @mainImageChanged="mainImageFile"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PagesAddImage from "@/components/adminPages/pages/PagesAddImage.vue";
// import firebase from "firebase";

export default {
  name: "PagesContactsGallery",
  components: {
    PagesAddImage
  },
  props: ["data", "gallery"],
  data() {
    return {
      galleryArr: this.gallery,
      galleryData: this.data
    };
  },
  methods: {
    mainImageFile(file) {
      if (file !== undefined) {
        this.galleryData.mainImage = {
          name: file.name,
          file: file
        };
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.block {
  border: 1px solid #000;
  border-radius: 10px;
  margin: 0 20px 30px;
}
.create {
  &__status {
    padding: 20px 18%;
    position: relative;
    display: flex;
    justify-content: flex-end;

    .remove {
      position: absolute;
      top: 15px;
      right: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 150px;
      /* width: 36px; */
      height: 36px;
      padding: 4px;

      &-img {
        width: 18px;
        height: 18px;
      }
    }
  }
  &__name {
    padding: 20px 40px;
    input {
      width: 200px;
      margin-left: 80px;
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
  &__adress {
    padding: 20px 40px;
    textarea {
      width: 40%;
      height: 100px;
      margin-left: 185px;
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
  &__map {
    padding: 20px 40px;
    input {
      width: 200px;
      margin-left: 70px;
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

  &__main-img {
    padding: 30px 40px;
  }
}
</style>
