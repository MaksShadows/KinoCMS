<template>
  <div>
    <div class="main-block">
      <BannersCardsTopBlocks
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
        {{ $t("banners.addBanner") }}
      </button>
    </div>
    <div class="main-block__bottom">
      <div class="main-block__seconds">
        <div class="main-block__label">{{ $t("banners.speed") }}</div>
        <select v-model="scrollSpeed" class="seconds__input">
          <option :key="number" v-for="number in 10">{{ number }} сек.</option>
        </select>
      </div>
      <button ref="btnSave" @click="save" class="btn btn-default btn-save">
        {{ $t("save") }}
      </button>
    </div>
  </div>
</template>

<script>
import BannersCardsTopBlocks from "@/components/adminPages/banners/BannersCardsTopBlocks.vue";
import firebase from "firebase";
import "firebase/database";
import "firebase/storage";
export default {
  name: "Banners",
  components: {
    BannersCardsTopBlocks
  },
  data() {
    return {
      ref: "banners/topcards/",
      images: [],
      scrollSpeed: "1 сек."
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
          imageFile: this.$refs.fileDialog.files[0]
        });
      }
    },
    save() {
      const storageRef = firebase.storage().ref(this.ref);
      const databaseRef = firebase.database().ref(this.ref);
      if (this.images.length > 0) {
        Promise.all(
          this.images.map(value => {
            if (value.imageFile !== undefined)
              return new Promise(resolve => {
                resolve(
                  storageRef
                    .child(value.image)
                    .put(value.imageFile)
                    .then(snapshot => snapshot.ref.getDownloadURL())
                    .then(url => ((value.imageUrl = url), (value.url = url)))
                );
              });
          })
        ).then(result =>
          result.map(url => {
            this.handleData(url);
          })
        );
      } else {
        storageRef.delete().catch(error => {
          console.log(error);
        });
        databaseRef.remove().catch(error => {
          console.log(error);
        });
      }
    },
    handleData(url) {
      this.images.map(value => {
        let id = Math.floor(Math.random() * 10000);
        let scrollSpeed = this.scrollSpeed;
        value.id = id;
        value.scrollSpeed = scrollSpeed;
        return {
          id: value.id,
          image: value.image,
          imageUrl: url,
          url: value.url,
          text: value.text,
          scrollSpeed: value.scrollSpeed
        };
      });
      const dataSet = firebase.database().ref(this.ref);
      dataSet.set(this.images);
    },
    onRead() {
      const baseRef = firebase.database().ref(this.ref);
      baseRef.on("value", snapshot => {
        if (snapshot.val() === null) {
          this.images = [];
        } else {
          this.images = snapshot.val();
        }
      });
    }
  },
  mounted() {
    this.onRead();
  }
};
</script>

<style lang="scss" scoped>
.main-block {
  display: flex;
  min-height: 240px;
  align-items: flex-start;
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
  .main-block__seconds {
    flex: 42% 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 30px;
  }
  .main-block__label {
    max-width: 120px;
    margin-left: 15px;
  }
}
</style>
