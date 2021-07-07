<template>
  <div class="posts">
    <Banners/>
    <Films/>
    <Cinemas/>
    <News/>
    <Promo/>
    <Pages/>
    <Users/>
    <Sends/>
  </div>
</template>

<script>
import Banners from "../components/Banners.vue";
import Films from "../components/Films.vue";
import Сinemas from "../components/Cinemas.vue";
import News from "../components/News.vue";
import Promo from "../components/Promo.vue";
import Pages from "../components/Pages.vue";
import Users from "../components/Users.vue";
import Sends from "../components/Sends.vue";
export default {
name: "Posts",
  components:{
    Banners,
    Films,
    Сinemas,
    News,
    Promo,
    Pages,
    Users,
    Sends
  }
}
</script>

<style lang="scss" scoped>
.posts{
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  padding: 0 24px 48px;
}
</style>