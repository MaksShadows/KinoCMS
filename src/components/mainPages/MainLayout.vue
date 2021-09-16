<template>
  <div>
    <Header v-if="this.$route.path != '/home'" style="margin-top: 20px" />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/mainPages/Header.vue";
import Footer from "@/components/mainPages/Footer.vue";

export default {
  name: "App",
  components: {
    Header,
    Footer
  },
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch("fetchInfo");
    }
  }
};
</script>
