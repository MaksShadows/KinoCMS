<template>
  <div>
    <div class="main-block">
      <BannersCardsNewsBlocks
        v-for="(block, index) in images"
        :key="block.id"
        :data="block"
        :sourceRef="ref"
        @remove="removeBlock(index)"
        class="card__block"
      />
      <button @click="openFileDialog()" class="btn btn-default card__block-add">
        <input
          ref="fileDialog"
          @change="addImage"
          style="display: none"
          type="file"
        />
        Добавить<br />фото
      </button>
    </div>
    <div class="main-block__bottom">
       <div class="option__item">
        <select v-model="scrollSpeed" class="option__input form-control">
          <option :key="number" v-for="number in 10">{{ number }} сек.</option>
        </select>
      </div>
      <button ref="btnSave" @click="save" class="btn btn-default btn-save">
        Сохранить
      </button>
    </div>
  </div>
</template>

<script>
import BannersCardsNewsBlocks from "@/components/adminPages/banners/BannersCardsNewsBlocks.vue";
import firebase from "firebase";
import "firebase/database";
import "firebase/storage";

export default {
  name: "BannersCardsNews",
  components: {
    BannersCardsNewsBlocks,
  },
  data() {
    return {
      ref: "banners/",
      images: [],
      scrollSpeed: "1 сек.",
    };
  },
  methods: {
    removeBlock(index) {
      this.images.splice(index, 1);

    },
    openFileDialog() {
      this.$refs.fileDialog.click();

    },
    addImage() {
      const file = this.$refs.fileDialog.files[0];
      if (file !== undefined) {
        this.images.push({
          image: null,
          imageFile: this.$refs.fileDialog.files[0],
        });
      }
    },
   save() {
      this.$refs.btnSave.classList.add("show");
      this.$refs.btnSave.textContent = "Сохраняется";

      const storageRef = firebase.storage().ref(this.ref);

      if (this.images.length > 0) {
          storageRef
        .put(this.images)
        .then((snapshot) => snapshot.ref.getDownloadURL())
        .then((url) => (this.images = url));
      } else {
        storageRef.delete().catch((error) => {
          console.log(error);
        });

      }
    },


  },

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
      margin: 40px 0;
    }
  }
   .option__item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-right: 30px;
  }
  .option__input {
    max-width: 120px;
    margin-left: 15px;
    margin-bottom: 10px;
  }
}
</style>