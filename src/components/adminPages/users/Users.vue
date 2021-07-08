<template>
  <div class="users-list">
    <h3>Пользователи</h3>
    <router-link
      class="btn btn-default users-list-add"
      tag="button"
    >
      <span></span>
      Добавить пользоватля
    </router-link>

    <input
      v-model="search"
      class="users-list-search"
      type="search"
      placeholder="Поиск"
    />

    <div class="pages">
      <button
        class="btn btn-default"
      >
        Previous
      </button>
      <button
        class="btn btn-default"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>


export default {
  name: "Users",

};
</script>

<style lang="scss" scoped>
.users-list {
  padding: 20px 40px;
  position: relative;

  h3 {
    padding: 20px 10px;
    display: flex;
    justify-content: center;
  }
  &-search {
    width: 225px;
    height: 37px;
    position: absolute;
    top: 20px;
    right: 210px;
    margin: 20px 5px;
    padding: 6px;
    background-color: #f8f9fa;
    border-color: #ddd;
  }
  &-add {
    margin: 20px auto;
    width: 225px;
    position: absolute;
    top: 20px;
    right: 35px;
    padding: 6px 0 6px 30px;

    span {
      width: 20px;
      height: 20px;
      display: flex;
      position: absolute;
      left: 11px;
      top: 8px;
    }
    span::after,
    span::before {
      content: " ";
      position: absolute;
      background-color: #72bb53;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    span::after {
      width: 20px;
      height: 2px;
    }
    span::before {
      width: 2px;
      height: 20px;
    }
  }

  .title {
    display: flex;
    justify-content: center;
    &-main {
      margin: 0 70px 0 60px;
    }

    &__item {
      border: 1px solid #9a9a9a;
      background: #d0d0d0;
      width: 40%;
      min-height: 40px;
      padding: 5px;
      align-items: center;
      display: flex;
      justify-content: center;
      word-break: break-all;
    }
  }

  .pages {
    display: flex;
    justify-content: center;
    align-items: center;

    button {
      margin: 30px 10px;
    }

  }
}
</style>