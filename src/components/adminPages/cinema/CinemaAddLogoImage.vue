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
  name: "CinemaAddLogoImage",
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
      this.imageData = undefined;
      this.$emit("mainImageChanged", undefined);
    }
  },
  mounted() {
    if (this.imageData !== undefined) {
      if (this.imageData.name !== undefined) {
        const reader = new FileReader();
        reader.readAsDataURL(this.imageData);
        reader.onload = e => {
          this.imageData = e.target.result;
        };
        this.$emit("topBannerChanged", this.imageData);
      } else {
        this.$refs.filePreview.src = this.imageData;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.main-block {
  display: flex;
  align-items: center;
  min-height: 120px;
  padding: 0 40px 0 153px;

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
