<template>
  <div id="app">
    <AdminLayout />

    <component :is="layout"></component>
  </div>
</template>

<script>
import AdminLayout from "@/components/adminPages/AdminLayout.vue";
import MainLayout from "@/components/mainPages/MainLayout.vue";
import AuthLayout from "@/components/authPages/AuthLayout.vue";

export default {
  name: "App",
  components: {
    AdminLayout,
    MainLayout,
    AuthLayout
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || "main") + "-layout";
    }
  }
};
</script>

<style lang="scss">
@import "~admin-lte/dist/css/adminlte.min.css";
</style>
