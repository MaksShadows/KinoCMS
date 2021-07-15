<template>
  <div class="main-block">
    <img
      ref="filePreview"
      :src="picture"
      class="preview"
    />
    <input
      type="file"
      ref="fileDialog"
      style="display: none"
    />

    <button
      @click="openModal()"
      class="btn btn-default"
    >
      Добавить
    </button>

    <button
      class="btn btn-default info-block__remove"
    >
      Удалить
    </button>
  </div>
</template>

<script>


export default {
  name: "BannersCardsBack",

  data() {
    return {

    };
  },

  methods: {
    openModal() {
          this.$refs.fileDialog.click();

    },
    addImage() {

    },
     removeBlock() {
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