<template>
  <div>
    <div class="main-block">
      <div
        v-for="(block, index) in images"
        :key="block.id"
        :data="block"
        class="info-block"
      >
        <div
          @click="removeBlock(index)"
          class="btn btn-default info-block__close"
        >
          <svg class="info-block__close-img" viewBox="0 0 8 8">
            <path
              d="M1.406 0l-1.406 1.406.688.719 1.781 1.781-1.781 1.781-.688.719 1.406 1.406.719-.688 1.781-1.781 1.781 1.781.719.688 1.406-1.406-.688-.719-1.781-1.781 1.781-1.781.688-.719-1.406-1.406-.719.688-1.781 1.781-1.781-1.781-.719-.688z"
              id="x"
              fill="rgba(0,0,0,0.7)"
            ></path>
          </svg>
        </div>
        <img ref="filePreview" class="info-block__image" />
        <div class="input-column">
          <div class="input-label">Url:</div>
          <input
            v-model="dataSource.url"
            type="text"
            class="form-control info-block__input"
            placeholder="Url"
          />
        </div>
        <div class="input-column">
          <div class="input-label">Текст:</div>
          <input
            v-model="dataSource.text"
            type="text"
            class="form-control info-block__input"
            placeholder="Текст"
          />
        </div>
      </div>

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
import firebase from "firebase";

export default {
  name: "Banners",
  data() {
    return {
      ref: "banners/topcards/",
      images: [],
      dataSource: "",
      scrollSpeed: "1 сек.",
    };
  },
  methods: {
    previewImage(file) {
      const preview = this.$refs.filePreview;
      const reader = new FileReader();
      reader.onload = function (e) {
        preview.src = e.target.result;
      };
      reader.readAsDataURL(file);

      this.dataSource.image = file.name;
      this.dataSource.imageFile = file;
    },
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
        Promise.all(
          this.images.map((value) => {
            if (value.imageFile !== undefined)
              return new Promise((resolve) => {
                resolve(
                  storageRef
                    .child(value.image)
                    .put(value.imageFile)
                    .then((snapshot) => snapshot.ref.getDownloadURL())
                    .then((url) => (value.imageUrl = url))
                );
              });
          })
        ).then((result) => result.map(() => {}));
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
      margin: 50px 0 40px 0;
    }
  }
  .info-block {
    position: relative;
    margin: 10px 30px 20px 0;
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

      /* &__add {
      margin-top: 20px;
    } */
    }
  }
  .input-column {
    margin-top: 10px;
  }

  .info-block__input {
    flex: 140px 0 0;
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
</style>