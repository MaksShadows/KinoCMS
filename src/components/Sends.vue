<template>
  <div class="banners">
    <h1>SMS</h1>
    <h1>Email</h1>


  </div>
</template>

<script>
export default {
  name: "Sends"
}
</script>

<style lang="scss" scoped>
  .banners{
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 97%;
    padding: 0 10px;
  }
  h1{
      color: #343f44;
      font-size: 28px;

    }
</style>