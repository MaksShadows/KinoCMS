<template>
  <div class="info-block">
    <div @click="$emit('remove')" class="btn btn-default info-block__close">
      <svg class="info-block__close-img" viewBox="0 0 8 8">
        <path
          d="M1.406 0l-1.406 1.406.688.719 1.781 1.781-1.781 1.781-.688.719 1.406 1.406.719-.688 1.781-1.781 1.781 1.781.719.688 1.406-1.406-.688-.719-1.781-1.781 1.781-1.781.688-.719-1.406-1.406-.719.688-1.781 1.781-1.781-1.781-.719-.688z"
          id="x"
          fill="rgba(0,0,0,0.7)"
        ></path>
      </svg>
    </div>
    <img ref="filePreview" class="info-block__image" />
  </div>
</template>

<script>
export default {
  name: "NewsAddGallery",
  props: ["data"],
  data() {
    return {
      dataSource: this.data
    };
  },
  methods: {
    previewImage(file) {
      const preview = this.$refs.filePreview;
      const reader = new FileReader();
      reader.onload = function(e) {
        preview.src = e.target.result;
      };
      reader.readAsDataURL(file);

      this.dataSource.name = file.name;
      this.dataSource.imageFile = file;
    }
  },
  mounted() {
    if (
      this.dataSource.imageUrl !== null &&
      this.dataSource.imageUrl !== undefined
    ) {
      this.$refs.filePreview.src = this.dataSource.imageUrl;
    } else {
      this.previewImage(this.dataSource.imageFile);
    }
  }
};
</script>

<style lang="scss" scoped>
.info-block {
  position: relative;
  margin: 20px;
  max-width: 300px;

  &__image {
    width: 235px;
    height: 84px;
    background: #a0a6ac;
    border-radius: 0.25rem;
    background-size: cover;
  }

  &__close {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    padding: 3px;

    &-img {
      width: 13px;
      height: 13px;
    }
  }
}
</style>
