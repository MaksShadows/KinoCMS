<template>
  <!-- nav -->
  <nav class="navbar navbar-expand navbar-light navbar-dark">
    <div class="container">
      <!-- Right navbar links -->
      <ul class="navbar-nav ml-auto">
        <router-link tag="li" to="/admin-statistic" class="nav-item">
          <a href="#" class="nav-link">
            <i class="nav-img fas fa-user-cog fa-2x"></i>
            <span>Администратор</span>
          </a>
        </router-link>
        <div class="languages">
          <img v-if="lang == 'ru'" src="@/assets/img/ru.png" alt="ru" />
          <img v-else src="@/assets/img/ua.png" alt="ua" />
          <select v-model="lang" @change="handleChange($event)">
            <option value="ru">Русский</option>
            <option value="ua">Украинский</option>
          </select>
        </div>
        <router-link tag="li" to="/" class="nav-item">
          <a href="#" class="nav-link">
            <i class="nav-img fas fa-power-off fa-2x"></i>
          </a>
        </router-link>
      </ul>
    </div>
  </nav>
  <!-- /nav -->
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      lang: localStorage.getItem("lang") || "ru"
    };
  },
  methods: {
    handleChange(event) {
      localStorage.setItem("lang", event.target.value);
      this.$i18n.locale = event.target.value;
      this.$router.push({
        params: { lang: event.target.value }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.languages img {
  width: 30px;
  margin-right: 10px;
}
.navbar-expand .navbar-nav {
  flex-direction: row;
  align-items: center;
}
</style>
