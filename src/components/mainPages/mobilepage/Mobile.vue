<template>
  <div class="about__cinema">
      <img src="@/assets/mobile1.jpg" alt="" />
    <h2>{{ $t("sidebar.mobile") }}</h2>
    <div class="about__cinema-item">
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum
        architecto laborum, quia illum eaque dolore exercitationem rem
        repudiandae in dicta! Nihil voluptatem quibusdam quae cupiditate?
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi quas
        porro explicabo culpa eaque. Provident veritatis a atque ea numquam.
      </p>
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
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit nesciunt
        nihil iure quo explicabo repellat.
      </p>
    </div>
    <h2>ФотоГалерея</h2>
    <div class="equipment">
      <img src="@/assets/mobile1.jpg" alt="" />
      <img src="@/assets/mobile1.jpg" alt="" />
    </div>
    <div class="about__cinema-item">
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum
        architecto laborum, quia illum eaque dolore exercitationem rem
        repudiandae in dicta! Nihil voluptatem quibusdam quae cupiditate?
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi quas
        porro explicabo culpa eaque. Provident veritatis a atque ea numquam.
      </p>
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
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit nesciunt
        nihil iure quo explicabo repellat.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "MobilePages"
};
</script>

<style scoped>
.about__cinema {
  padding: 60px 20px 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.about__cinema img {
  display: flex;
  margin: 0 auto;
}
h2 {
  padding-top: 35px;
  font-size: 24px;
  font-weight: 600;
}
.about__cinema-item {
  text-align: center;
  max-width: 1200px;
}
.equipment {
  display: flex;
  padding-top: 35px;
  gap: 50px;
}
.equipment img {
  max-width: 400px;
}
</style>
