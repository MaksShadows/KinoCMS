<template>
  <div class="title">
    <div class="title__item title__checkbox">
      <input type="checkbox" v-model="user.mailing" />
    </div>
    <div class="title__item">{{ user.id }}</div>
    <div class="title__item">{{ user.date }}</div>
    <div class="title__item">{{ user.birth }}</div>
    <div class="title__item">{{ user.email }}</div>
    <div class="title__item">{{ user.phone }}</div>
    <div class="title__item">{{ user.firstname }} {{ user.lastname }}</div>
    <div class="title__item">{{ user.nickname }}</div>
    <div class="title__item">{{ user.city }}</div>
  </div>
</template>

<script>
export default {
  name: "MailingsList",
  props: ["user", "usersData"],
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  justify-content: center;
  margin: 0 70px 0 60px;

  &__item {
    border: 1px solid #9a9a9a;
    background: #ececec;
    width: 40%;
    min-height: 40px;
    padding: 5px;
    align-items: center;
    display: flex;
    justify-content: center;
    word-break: break-all;
  }
  &__checkbox {
    width: 20%;
  }

  &__edit,
  &__remove {
    margin-left: 20px;
    align-items: center;
    display: flex;
  }
}
</style>
