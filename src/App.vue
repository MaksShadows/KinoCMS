<template>
  <div id="app">
    <SideBar/>
    <router-view />
  </div>
</template>
<script>
import SideBar from "@/components/SideBar";
export default {
  name:'App',
  components:{
    SideBar
  }
}
</script>
<style lang="scss">
#app {
  font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
}

</style>
