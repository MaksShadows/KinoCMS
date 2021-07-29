<template>
  <div class="bannerOnBackground">
    <div class="banner-content-wrap">
      <div class="banner-content">
        <div class="banner-tabs-nav">
          <div class="radio icheck-nephritis">
            <input
              type="radio"
              id="nephritis1"
              name="nephritis"
              :value="1"
            />
            <label for="nephritis1">Фото на фон</label>
          </div>
          <div class="radio icheck-nephritis">
            <input
              type="radio"
              id="nephritis2"
              name="nephritis"
              :value="2"
            />
            <label for="nephritis2">Просто фон</label>
          </div>
        </div>

        <div class="banner-tabs-content">
          <div class="tab-1">
            <img
              v-if="picture !== null"
              ref="filePreview"
              :src="picture"
              class="preview"
            />
            <input
              type="file"
              ref="fileDialog"
              @change="addImage"
              style="display: none"
              accept="image/*"
            />
            <button
              v-if="picture === null"
              @click="openFileDialog"
              class="btn btn-primary"
            >
              Добавить
            </button>
            <button
              v-if="picture !== null"
              @click="deleteImage"
              class="btn btn-danger"
            >
              Удалить
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import "firebase/storage";
export default {
  name: "BannersCardsBack",
  data() {
    return {
      imageData: null,
      picture: null,
      imageRef: "banners/",
    };
  },
  methods: {
    openFileDialog() {
      this.$refs.fileDialog.click();
    },
    addImage() {
      const file = this.$refs.fileDialog.files[0];
      this.previewImage(file);
    },
    previewImage(file) {
      const preview = this.$refs.filePreview;
      const reader = new FileReader();
      reader.onload = (e) => {
        preview.src = e.target.result;
      };
      reader.readAsDataURL(file);
      this.imageData = file;
      this.onUpload();
    },
    onUpload() {
      this.picture = null;
      const storageRef = firebase
        .storage()
        .ref(this.imageRef)
        .child("card");
      storageRef
        .put(this.imageData)
        .then((snapshot) => snapshot.ref.getDownloadURL())
        .then((url) => (this.picture = url));
    },
    deleteImage() {
      this.picture = null;
      this.$refs.filePreview.src = null;
      const storageRef = firebase
        .storage()
        .ref(this.imageRef)
        .child("card");
      storageRef.delete().catch((error) => {
        console.log(error);
      });
    },
    onDownload() {
      this.picture = null;
      const storageRef = firebase
        .storage()
        .ref(this.imageRef)
        .child("cars");
      storageRef.getDownloadURL().then(
        (url) => (this.picture = url),
        (error) => console.log(error)
      );
    },
  },
  mounted() {
    this.onDownload();
  },
};
</script>

<style lang="scss" scoped>
.bannerOnBackground {
  margin: 120px 0;
}
.size {
  margin-bottom: 40px;
}
.banner-content {
  display: flex;
  justify-content: space-between;
  min-height: 200px;
}
.radio {
  margin: 20px 0;
}
.banner-tabs-nav {
  border-right: 2px solid #fff;
  padding-right: 60px;
}
.banner-tabs-content {
  width: 85%;
  margin-left: 40px;
}
.tab-1__image {
  width: 240px;
  max-width: 240px;
  height: 180px;
  display: inline-block;
  margin: 0 40px 10px 0;
}
.btn {
  margin: 0 10px;
}
.preview {
  width: 200px;
  height: 300px;
  background: #adbcc9;
}
</style>