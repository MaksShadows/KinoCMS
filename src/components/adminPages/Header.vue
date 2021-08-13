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
  name: "Header"
};
</script>

<style lang="scss" scoped></style>
