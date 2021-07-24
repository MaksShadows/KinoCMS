<template>
  <!-- nav -->
  <nav class="navbar navbar-expand navbar-light navbar-dark">
    <div class="container">
      <router-link to="/" class="navbar-brand d-flex">
        <h4>KinoCMS</h4>
      </router-link>
      <!-- Right navbar links -->
      <ul class="navbar-nav ml-auto">
        <router-link tag="li" to="/admin-statistic" class="nav-item">
          <a href="#" class="navbar-admin">
            <i class="nav-img fas fa-user-cog fa-2x"></i>
            <span>Администратор</span>
          </a>
        </router-link>
        <router-link tag="li" to="/" class="nav-item">
          <a href="#" class="navbar-logout">
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
};
</script>

<style lang="scss" scoped>
nav {
  height: 86px;
  border-bottom: 1px solid #000;
  .brand-image {
    width: 130px;
    opacity: 1;
    &:hover {
      opacity: 0.7;
    }
  }
  h4 {
    margin: 0;
    padding: 15px 0 0 10px;
  }
}
.nav-item {
  margin-left: 25px;
  .navbar-admin {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
      color: #000;
    }
  }
  .nav-img {
    opacity: 1;
    transition: opacity 0.3s ease;
    color: #000;
    &:hover {
      opacity: 0.5;
    }
  }
}
</style>