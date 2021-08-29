<template>
  <div>
    <div class="mailings__choose d-flex">
      <p>{{ $t("mail.mailUsers") }}</p>
      <input
        type="radio"
        id="all"
        value="all"
        v-model="select"
        @click="selectUsers(true)"
      />
      <label for="all">{{ $t("mail.mailAllUsers") }}</label>
      <input
        type="radio"
        id="select"
        value="select"
        v-model="select"
        @click="selectUsers(false)"
      />
      <label for="select">{{ $t("mail.mailAllUser") }}</label>

      <router-link
        :disabled="select !== 'select'"
        class="users-choose btn btn-default"
        tag="button"
        :to="{
          name: 'MailingsChoose',
          params: {
            way: 'users-choose',
            usersData: usersData,
            message: text,
            mailingsData: mailingsData,
            ref: ref
          }
        }"
      >
        {{ $t("mail.mailChoseuser") }}
      </router-link>
    </div>
    <div class="mailings__text">
      <div class="mailings__text-info d-flex">
        <p>Текст SMS</p>
        <p>{{ $t("mail.mailSumb") }}: {{ textLength }}</p>
        <p>{{ $t("mail.mailNum") }} SMS: {{ smsLength }}</p>
      </div>
      <textarea v-model="text" :placeholder="$t('mail.mailDesc')"></textarea>
    </div>
    <div class="mailings-start">
      <button
        :disabled="textLength < 1"
        class="btn btn-default"
        @click="startMeiling()"
      >
        {{ $t("sendSMS") }}
      </button>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "MailingsSms",
  props: ["usersData", "message"],
  data() {
    return {
      select: false,
      text: "",

      mailingsData: [],
      ref: "mailings"
    };
  },
  methods: {
    selectUsers(boolean) {
      this.usersData.map(user => {
        user.mailing = boolean;
      });
    },
    startMeiling() {
      let mailUsers = this.usersData
        .filter(user => user.mailing)
        .map(user => {
          return { id: user.id, telephone: user.phone, email: user.email };
        });

      let mailing = {};
      mailing.text = this.text;
      mailing.users = mailUsers;
      this.mailingsData.push(mailing);

      const baseRef = firebase.database().ref(this.ref);
      baseRef.set(this.mailingsData).then((this.text = ""), (this.select = ""));
    }
  },
  computed: {
    textLength() {
      return this.text.toString().length;
    },
    smsLength() {
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
  &__text {
    width: 620px;

    &-info {
      justify-content: space-between;
    }
    textarea {
      width: 400px;
      height: 100px;
    }
  }

  &-start {
    display: flex;
    justify-content: center;
    margin: 40px 20px;
  }
}
</style>
