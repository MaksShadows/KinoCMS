<template>
  <div class="cinema">
    <div class="cinema__title">
      <h3>Список кинотеатров</h3>
      <div class="cinema__blocks">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Movies",
};
</script>

<style lang="scss" scoped>
h3 {
  padding: 20px 10px;
  display: flex;
  justify-content: center;
}
.cinema__blocks {
  display: flex;
  min-height: 240px;
  align-items: start;
  padding: 0 10px 0 40px;
  flex-wrap: wrap;
  .cinema-add {
    margin: 10px 30px 20px 0;
    max-width: 300px;
    .text {
      text-align: center;
      font-size: 1.3em;
      font-weight: bold;
    }
    span {
      width: 300px;
      height: 200px;
      display: inline-block;
      position: relative;
    }
    span::after,
    span::before {
      content: " ";
      position: absolute;
      display: block;
      background-color: #72bb53;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    span::after {
      width: 80px;
      height: 8px;
    }
    span::before {
      width: 8px;
      height: 80px;
    }
  }
}
</style>