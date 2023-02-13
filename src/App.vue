<template>
  <el-config-provider :locale="locale">
    <slot name="app"></slot>
  </el-config-provider>

  <router-view></router-view>
</template>

<script>
// 引入vue方法
import { ElConfigProvider } from 'element-plus'
// 中文包
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

export default {
  name: 'App',
  components: {
    [ElConfigProvider.name]: ElConfigProvider
  },
  setup() {
    const locale = zhCn
    return {
      locale
    }
  }
}
</script>
