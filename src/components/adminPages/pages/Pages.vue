<template>
  <div class="shares-list">
    <h3>Список Страницу</h3>
    <div class="title title-main">
      <div class="title__name">Название</div>
      <div class="title__date">Дата создания</div>
      <div class="title__status">Статус</div>
    </div>
    <router-link
      class="btn btn-default shares-list-add"
      tag="button"
    >
      <span></span>
      Создать Страницу
    </router-link>
  </div>
</template>

<script>

export default {
  name: "Pages",
 
}
</script>

<style lang="scss" scoped>
.shares-list {
  padding: 20px 40px;
  position: relative;

  h3 {
    padding: 20px 10px;
    display: flex;
    justify-content: center;
  }
  &-add {
    margin: 20px auto;
    width: 215px;
    position: absolute;
    top: 20px;
    right: 35px;

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

    &__date,
    &__name,
    &__status {
      border: 1px solid #9a9a9a;
      background: #d0d0d0;
      width: 40%;
      height: 40px;
      padding-left: 10px;
      align-items: center;
      display: flex;
    }
  }
}
</style>