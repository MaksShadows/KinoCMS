<template>
  <div>
    <div class="mailings__choose d-flex">
      <p>Выбрать пользователей для рассылки</p>
      <input
        type="radio"
        id="all"
        value="all"
        v-model="select"
      />
      <label for="all">Все пользователи</label>
      <input
        type="radio"
        id="select"
        value="select"
        v-model="select"
      />
      <label for="select">Выборочно</label>


    </div>
    <div class="mailings__text">
      <div class="mailings__text-info d-flex">
        <p>Текст SMS</p>
        <p>Символов: {{ textLength }}</p>
        <p>Количество SMS: {{ smsLength }}</p>
      </div>
      <textarea v-model="text" placeholder="Введите текст"></textarea>
    </div>
    <div class="mailings-start">
      <button
        :disabled="textLength < 1"
        class="btn btn-default"
      >
        Начать рассылку
      </button>
    </div>
  </div>
</template>

<script>

export default {
  name: "MailingsSms",
  props: ["usersData", "message"],
  data() {
    return {
      select: false,
      text: "",
    };
  },
  methods: {

  },
  computed: {
    textLength() {
      return this.text.toString().length;
    },
    smsLength() {
      let mailUsers = this.usersData.filter((sms) => {
        return sms.mailing;
      });
      return mailUsers.length;
    },
  },

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