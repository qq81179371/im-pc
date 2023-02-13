<template>
  <el-menu
    class="menu"
    unique-opened
    background-color="#304156"
    active-text-color="#0071c4"
    router
    :default-active="$route.name"
    text-color="#ffffff"
  >
    <el-menu-item index="/home" route="">
      <i class="el-icon-menu"></i>
      <template #title>首页</template>
    </el-menu-item>
    <el-submenu v-for="(item, index) in menu" :key="index" :index="item.name">
      <template #title>
        <i class="el-icon-menu"></i>
        <span>{{ item.label }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item
          v-for="(sitem, sindex) in item.child"
          :index="sitem.name"
          :key="sindex"
        >
          {{ sitem.label }}
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      menu: [
        {
          label: '客服中心',
          name: 'customerService',
          child: [
            {
              label: '国内客服中心',
              name: 'chat'
            },
            {
              label: '国内问题列表',
              name: 'qa_list'
            },
            {
              label: '海外客服中心',
              name: '2'
            },
            {
              label: '海外问题列表',
              name: 'foreign_qa_list'
            },
            {
              label: '客服评分',
              name: 'service_rate'
            },
            {
              label: '客服服务统计',
              name: '3'
            },
            {
              label: '客服服务字段管理',
              name: 'service_key'
            }
          ]
        },
        {
          label: '售后管理中心',
          name: 'afterSale',
          child: [
            {
              label: '注册用户管理',
              name: 'user_manage'
            },
            {
              label: '单页内容管理',
              name: 'single_page'
            },
            {
              label: '广告管理',
              name: 'ad_manage'
            },
            {
              label: '驱动管理',
              name: 'drive_manage'
            },
            {
              label: '说明书管理',
              name: 'manual_manage'
            },
            {
              label: '产品订单管理',
              name: 'order_manage'
            },
            {
              label: '密钥库管理',
              name: 'key_manage'
            },
            {
              label: '设备信息管理',
              name: 'device_manage'
            }
          ]
        },
        {
          label: '系统管理',
          name: 'system',
          child: [
            {
              label: '地区数据管理',
              name: 'address'
            },
            {
              label: '密钥刷新设置',
              name: 'system_config'
            },
            {
              label: '升级包管理',
              name: 'upgrade'
            },
            {
              label: '系统角色管理',
              name: 'role_manage'
            },
            {
              label: '管理员账号',
              name: 'admin_manage'
            }
          ]
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
