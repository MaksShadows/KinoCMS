<template>
  <div class="main-block">
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
      class="btn btn-default"
    >
      Добавить
    </button>
       <button
      v-if="picture !== null"
      @click="deleteImage"
      class="btn btn-default info-block__remove"
    >
      Удалить
    </button>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "BannersCardsBack",
  data() {
    return {
      imageData: null,
      picture: null,
      uploadValue: 0,
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
        const storageRef = firebase.storage().ref(`${this.imageData.name}`).put(this.imageData)
        storageRef.on(`state_changed`,
          snapshot => {
            this.uploadValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100},
          error => {
            console.log(error.message)},
          () => {
            this.uploadValue=100;
            storageRef.snapshot.ref.getDownloadURL().then((url) => {
              this.picture = url
            })
          })
    },
    deleteImage() {
      this.picture = null;
      this.$refs.filePreview.src = null;
    },
  },

};
</script>

<style lang="scss" scoped>
.main-block {
  display: flex;
  align-items: center;
  height: 320px;
  padding: 0 40px;
  .btn {
    width: 165px;
    height: 45px;
    margin-left: 20px;
  }
}
.preview {
  width: 200px;
  height: 300px;
  background: #adbcc9;
}
</style>