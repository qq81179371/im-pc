<template>
  <layoutHader ref="layoutHader" />
  <div class="router_content">
    <!-- <div class="lf">
      <routeMenu />
    </div> -->
    <div class="rg">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import layoutHader from './header.vue'
// import routeMenu from './routeMenu.vue'

export default {
  components: {
    layoutHader
    // routeMenu
  }
}
</script>

<style lang="scss" scoped>
.router_content {
  display: flex;
  .lf {
    min-height: calc(100vh - 100px);
    background: #304156;
    width: 300px;
    flex-shrink: 0;
  }
  .rg {
    // padding: 30px;
    flex: 1;
    overflow: auto;
  }
}
</style>
