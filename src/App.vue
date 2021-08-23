<template>
  <div id="app">
    <AdminLayout />
    <!-- <AuthLayout /> -->
  </div>
</template>

<script>
import AdminLayout from "@/components/adminPages/AdminLayout.vue";
// import AuthLayout from "@/components/authPages/AuthLayout.vue";

export default {
  name: "App",
  components: {
    AdminLayout
    // AuthLayout,
  }
};
</script>

<style lang="scss">
@import "~admin-lte/dist/css/adminlte.min.css";
</style>
