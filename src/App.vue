<template>
  <div id="app">
   <AdminLayout/>
  </div>
</template>

<script>
import AdminLayout from "@/components/adminPages/AdminLayout.vue";

export default {
  name: "App",
  components: {
    AdminLayout,
  },

};
</script>

<style lang="scss">
@import "~admin-lte/dist/css/adminlte.min.css";
</style>
