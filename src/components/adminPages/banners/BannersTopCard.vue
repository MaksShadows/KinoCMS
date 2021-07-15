<template>
  <div>
    <div class="main-block">

      <button @click="openModal()"   class="btn btn-default card__block-add">
        <input
          ref="fileDialog"
          style="display: none"
          type="file"
        />
        Добавить<br />фото
      </button>
    </div>
    <div class="main-block__bottom">
      <button class="btn btn-default btn-save">
        Сохранить
      </button>
    </div>
  </div>
</template>

<script>


export default {
  name: "BannersTopCard",

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
     removeBlock(index) {
      this.dataBlocks.splice(index, 1);
    },
  }

};
</script>

<style lang="scss" scoped>
.main-block {
  display: flex;
  min-height: 240px;
  align-items: start;
  padding: 0 10px 0 40px;
  flex-wrap: wrap;

  &__bottom {
    flex-wrap: wrap;

    .btn-save {
      margin: 0 0 20px 20px;
      &.show {
        color: #178817;
        border: 2px solid #55cc55;
      }
    }
  }
  .btn {
    width: 165px;
    height: 45px;
    margin-left: 20px;

    &.card__block-add {
      height: 90px;
      margin: 50px 0 40px 0;
    }
  }
}
</style>