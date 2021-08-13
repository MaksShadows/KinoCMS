<template>
  <div class="main-block flex-wrap">
    <img
      v-if="imageData !== null"
      ref="filePreview"
      :src="imageData"
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
      v-if="imageData === null"
      @click="openFileDialog"
      class="btn btn-default"
    >
      Добавить
    </button>

    <button
      v-if="imageData !== null"
      @click="deleteImage"
      class="btn btn-default info-block__remove"
    >
      Удалить
    </button>
  </div>
</template>

<script>
export default {
  name: "MoviesAddCurrentImage",
  props: ["sourceRef", "sourceData"],
  data() {
    return {
      imageRef: this.sourceRef,
      imageData: this.sourceData
    };
  },

  methods: {
    openFileDialog() {
      const event = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true
      });
      this.$refs.fileDialog.dispatchEvent(event);
    },

    addImage() {
      const file = this.$refs.fileDialog.files[0];
      this.previewImage(file);
    },

    previewImage(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = e => {
        this.imageData = e.target.result;
      };
      this.$emit("mainImageChanged", file);
    },

    deleteImage() {
      this.imageData = null;
      this.$emit("mainImageChanged", null);
    }
  }
};
</script>

<style lang="scss" scoped>
.main-block {
  display: flex;
  align-items: center;
  min-height: 120px;
  padding: 0 40px;

  .btn {
    width: 130px;
    height: 45px;
    margin: 20px;
  }
}

.preview {
  width: 135px;
  height: 180px;
  background: #adbcc9;
}
</style>
