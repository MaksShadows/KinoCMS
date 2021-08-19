<template>
  <div>
    <div class="mailings__choose d-flex">
      <p>Выбрать пользователей для рассылки</p>
      <input
        type="radio"
        id="allForEmail"
        value="all"
        v-model="select"
        @click="selectUsers(true)"
      />
      <label for="allForEmail">Все пользователи</label>
      <input
        type="radio"
        id="selectForEmail"
        value="select"
        v-model="select"
        @click="selectUsers(false)"
      />
      <label for="selectForEmail">Выборочно</label>

      <router-link
        :disabled="select !== 'select'"
        class="users-choose btn btn-default"
        tag="button"
        :to="{
          name: 'MailingsChoose',
          params: {
            way: 'users-choose',
            usersData: usersData,
            message: file,
            mailingsData: mailingsData,
            ref: ref
          }
        }"
      >
        Выбрать пользователей
      </router-link>
    </div>
    <div class="mailings__file">
      <div class="mailings__file-info">
        <input
          type="file"
          ref="fileDialog"
          @change="addFile"
          style="display: none"
        />
        <p v-if="file !== undefined">
          Файл: {{ file.name }}
          <button
            v-if="file !== undefined"
            @click="deleteFile()"
            class="btn btn-default"
          >
            Удалить
          </button>
        </p>
        <p v-if="file === undefined">
          Загрузить файл:
          <button @click="openFileDialog" class="btn btn-default">
            Добавить
          </button>
        </p>
        <p>Количество писем: {{ emailLength }}</p>
      </div>
      <div class="mailings-start">
        <button
          class="btn btn-default"
          :disabled="send !== true"
          @click="uploadFile()"
        >
          Начать рассылку
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "MailingsSms",
  props: ["usersData"],
  data() {
    return {
      select: false,
      file: undefined,
      send: false,

      mailingsData: [],
      ref: "mailings"
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

    addFile() {
      this.file = this.$refs.fileDialog.files[0];

      const storageImageRef = firebase.storage().ref(this.ref);
      new Promise(resolve => {
        resolve(
          storageImageRef
            .child(this.file.name)
            .put(this.file)
            .then(snapshot => snapshot.ref.getDownloadURL())
            .then(url => ({
              name: this.file.name,
              fileUrl: url
            }))
        );
      })
        .then(file => (this.file = file))
        .then((this.send = true));
    },
    deleteFile() {
      const storageImageRef = firebase.storage().ref(this.ref);
      storageImageRef
        .child(this.file.name)
        .delete()
        .then((this.send = false))
        .then((this.file = undefined));
    },
    selectUsers(boolean) {
      this.usersData.map(user => {
        user.mailing = boolean;
      });
    },
    uploadFile() {
      if (this.file !== undefined) {
        this.startMeiling(this.file);
      } else {
        alert("Выберети файл для рассылки");
      }
    },
    startMeiling(file) {
      let mailUsers = this.usersData
        .filter(user => user.mailing)
        .map(user => {
          return { id: user.id, telephone: user.phone, email: user.email };
        });

      let mailing = {};
      mailing.file = file;
      mailing.users = mailUsers;
      this.mailingsData.push(mailing);

      const baseRef = firebase.database().ref(this.ref);
      baseRef
        .set(this.mailingsData)
        .then((this.file = undefined), (this.select = ""));
    }
  },
  computed: {
    emailLength() {
      let mailUsers = this.usersData.filter(sms => {
        return sms.mailing;
      });
      return mailUsers.length;
    }
  },
  created() {
    const baseRef = firebase.database().ref(this.ref);
    baseRef.on("value", snapshot => {
      if (snapshot.val() !== null) {
        this.mailingsData = snapshot.val();
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.mailings {
  &__choose {
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 20px;

    input {
      margin: 7px 20px;
    }
    p,
    label {
      margin: 0px;
    }
    .users-choose {
      margin-left: 20px;
    }
  }
  &__file-info {
    /* justify-content: space-between; */
  }
  &-start {
    display: flex;
    justify-content: center;
    margin: 40px 20px;
  }
}
</style>
