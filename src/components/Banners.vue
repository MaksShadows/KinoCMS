<template>
  <div class="banners">
    <h1>На главной верх</h1>
    <h1>Сквозной банер на заднем фоне</h1>
    <h1>На главной Новости Акции</h1>

  </div>
</template>

<script>
export default {
  name: "Banners"
}
</script>

<style lang="scss" scoped>
  .banners{
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 97%;
    padding: 0 10px;
     h1{
      color: #343f44;
      font-size: 28px;
    }
  }

</style>