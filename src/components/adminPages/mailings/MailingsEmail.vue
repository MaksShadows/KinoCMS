<template>
  <div>
    <div class="mailings__choose d-flex">
      <p>Выбрать пользователей для рассылки</p>
      <input
        type="radio"
        id="allForEmail"
        value="all"
        v-model="select"
      />
      <label for="allForEmail">Все пользователи</label>
      <input
        type="radio"
        id="selectForEmail"
        value="select"
        v-model="select"
      />
      <label for="selectForEmail">Выборочно</label>


    </div>
    <div class="mailings__file">
      <div class="mailings__file-info">
        <input
          type="file"
          ref="fileDialog"
          @change="addFile"
          style="display: none"
        />
        <p>
          Файл:
          <button
            class="btn btn-default"
          >
            Удалить
          </button>
        </p>
        <p>
          Загрузить файл:
          <button  class="btn btn-default">
            Добавить
          </button>
        </p>
        <p>Количество писем: </p>
      </div>
      <div class="mailings-start">
        <button
          class="btn btn-default"
        >
          Начать рассылку
        </button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "MailingsSms",
  data() {
    return {
      select: false,

    };
  },
  methods: {

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
  // &__file-info {
  //   /* justify-content: space-between; */
  // }
  &-start {
    display: flex;
    justify-content: center;
    margin: 40px 20px;
  }
}
</style>