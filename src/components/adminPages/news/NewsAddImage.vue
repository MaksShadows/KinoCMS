<template>
  <div class="main-block flex-wrap">
    <img
      v-if="imageData !== undefined"
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
      v-if="imageData === undefined"
      @click="openFileDialog"
      class="btn btn-default"
    >
      Добавить
    </button>

    <button
      v-if="imageData !== undefined"
      @click="deleteImage"
      class="btn btn-default info-block__remove"
    >
      Удалить
    </button>
  </div>
</template>

<script>
export default {
  name: "NewsAddImage",
  props: ["sourceData"],
  data() {
    return {
      imageData: this.sourceData,
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
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        this.imageData = e.target.result;
      };
      this.$emit("mainImageChanged", file);
    },

    deleteImage() {
      this.imageData = undefined;
      this.$emit("mainImageChanged", undefined);
    },
  },
  mounted() {
    if (this.imageData !== undefined) {
      if (
        this.imageData.imageUrl !== null &&
        this.imageData.imageUrl !== undefined
      ) {
        this.$refs.filePreview.src = this.imageData.imageUrl;
      } else {
        this.previewImage(this.imageData.imageFile);
      }
    }
  },
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
  width: 160px;
  height: 170px;
  background: #adbcc9;
}
</style>