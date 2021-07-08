<template>
  <div>
    <Header />
    <Sidebar />
    <section class="content-wrapper">
      <router-view />
    </section>
  </div>
</template>

<script>
import Header from "./Header.vue";
import Sidebar from "./Sidebar.vue";

export default {
  name: "AdminLayout",
  components: {
    Header,
    Sidebar,
  },
};
</script>


