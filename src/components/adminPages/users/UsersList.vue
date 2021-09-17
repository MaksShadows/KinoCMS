<template>
  <div class="title">
    <div class="title__item">{{ user.id }}</div>
    <div class="title__item">{{ user.date }}</div>
    <div class="title__item">{{ user.birth }}</div>
    <div class="title__item">{{ user.email }}</div>
    <div class="title__item">{{ user.phone }}</div>
    <div class="title__item">{{ user.firstname }} {{ user.lastname }}</div>
    <div class="title__item">{{ user.nickname }}</div>
    <div class="title__item">{{ user.city }}</div>

    <router-link
      class="title__edit"
      tag="div"
      :to="{
        name: 'UsersEdit',
        params: {
          way: 'users-edit',
          dataOb: user,
          dataArr: usersArr,
          dbRef: ref
        }
      }"
    >
      <div class="icon fas fa-pen"></div>
    </router-link>
    <div @click="$emit('remove')" class="icon title__remove fas fa-trash"></div>
  </div>
</template>

<script>
export default {
  name: "SharesList",
  props: ["data", "dataArr", "dbRef"],
  data() {
    return {
      user: this.data,
      usersArr: this.dataArr,

      ref: this.dbRef
    };
  }
};
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  justify-content: center;
  margin-left: 60px;

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

  &__edit,
  &__remove {
    margin-left: 20px;
    align-items: center;
    display: flex;
  }

  .icon {
  }
}
</style>
