<template>
  <header class="layout_header">
    <div class="logo">
      <svg-icon class="icon" name="logo" />
      <span>智能客服服务系统</span>
    </div>
    <div class="user_info">
      <img :src="userInfo.headUrl" @click="handleInfoShow" v-img alt="" />
      <div class="name">
        <h4>{{ userInfo.nickName }}</h4>
        <p>{{ userInfo.accountName }}</p>
      </div>
      <div @click="handleLogout">
        <span>退出账号</span>
      </div>
    </div>
  </header>
  <userInfo ref="userInfo"/>
</template>

<script>
import userInfo from './userInfo.vue'

export default {
  components: {
    userInfo
  },
  data() {
    return {
      userInfo: JSON.parse(localStorage.getItem('token'))
    }
  },
  methods: {
    handleLogout() {
      localStorage.removeItem('token')
      this.$router.replace({
        path: '/login'
      })
    },
    handleInfoShow() {
      this.$refs.userInfo.show()
    }
  }
}
</script>

<style lang="scss" scoped>
.layout_header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100px;
  background: #0071c4;
  padding: 0 20px;
  .logo {
    display: flex;
    align-items: center;
    .icon {
      font-size: 60px;
      color: #fff;
      margin-right: 20px;
    }
    span {
      font-size: 40px;
      font-weight: 700;
      color: #ffffff;
    }
  }
  .user_info {
    margin-top: 15px;
    display: flex;
    align-items: center;
    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      object-fit: cover;
      margin-right: 10px;
    }
    .name {
      height: 50px;
      margin-right: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      h4 {
        font-size: 16px;
        font-weight: 700;
        color: #ffffff;
      }
      p {
        font-size: 12px;
        font-weight: 400;
        color: #ffffff;
      }
    }
    span {
      cursor: pointer;
      font-size: 12px;
      font-weight: 400;
      text-decoration: underline;
      color: #ffffff;
    }
  }
}
</style>
