<template>
  <el-tabs v-model="activeName" @tab-click="handleClick" stretch>
    <el-tab-pane label="账号登录" name="first">
      <accountLogin ref="accountLogin" />
    </el-tab-pane>
    <el-tab-pane label="手机登录" name="second">
      <phoneLogin ref="phoneLogin" />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import accountLogin from './components/accountLogin.vue'
import phoneLogin from './components/phoneLogin.vue'

export default {
  components: {
    phoneLogin,
    accountLogin
  },
  data() {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick() {}
  }
}
</script>

<style lang="scss" scoped>
.el-tabs {
  margin-top: 50px;
  :deep .el-tabs__nav-wrap::after {
    display: none;
  }
  :deep .el-tabs__header {
    margin: 0 0 20px;
  }
}
</style>
