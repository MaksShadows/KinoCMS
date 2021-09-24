<template>
  <div class="about__shares">
    <h2>Только сегодня скидка !!!</h2>
    <div class="about__item">
      <img src="@/assets/reklame1.jpg" alt="" />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus
        facilis pariatur sapiente, praesentium neque nihil, iusto totam
        architecto nobis aliquam deserunt deleniti. Quam cupiditate, veritatis
        voluptatibus ad nesciunt atque reprehenderit ex explicabo aperiam quod
        voluptas! Consectetur, mollitia voluptates? Quisquam blanditiis nulla
        optio ab, unde dicta eaque dignissimos recusandae quam quidem incidunt
        doloremque perspiciatis ullam soluta autem perferendis error nostrum
        excepturi!
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Shares3"
};
</script>

<style scoped>
.about__shares {
  padding-top: 35px;
}
.about__shares img {
  max-width: 400px;
}
h2 {
  padding-left: 115px;
}
p {
  max-width: 500px;
}
.about__item {
  display: flex;
  justify-content: flex-start;
  gap: 50px;
  padding-left: 115px;
  padding-top: 40px;
  padding-bottom: 35px;
}
</style>
