<template>
  <div class="statistic">
    <div class="row statistic__top">
      <div class="col-md-4"></div>

      <div class="col-md-3"></div>

     
    </div>
  </div>
</template>

<script>

export default {
  name: "Statistic",



};
</script>

<style lang="scss" scoped>
.statistic {
  padding: 7px;
  &__top {
    margin-top: 40px;
  }
}
.users-number {
  color: #fdfcfd;
  font-weight: 700;
}
.nav-img {
  opacity: 1;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.7;
  }
}
</style>