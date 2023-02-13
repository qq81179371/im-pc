<template>
  <div class="login_wrap">
    <div class="content">
      <div class="header">
        <svg-icon class="icon" name="logo" />
        <p>智能客服服务系统</p>
      </div>
      <router-view></router-view>
    </div>
    <p class="ad">欢迎进入智能客服系统</p>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.login_wrap {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background: #fff;
  min-height: 100vh;
  .content {
    padding: 50px 100px 0px;
    width: 600px;
    height: 700px;
    border-radius: 20px;
    box-shadow: 0px 0px 30px 0px rgba(0, 113, 196, 0.2);
    .header {
      display: flex;
      flex-direction: column;
      align-items: center;
      .icon {
        color: #0065b3;
        font-size: 60px;
        margin-bottom: 20px;
      }
      p {
        font-size: 40px;
        font-weight: 700;
        color: #0065b3;
      }
    }
  }
  .ad {
    margin-top: 60px;
    font-size: 30px;
    font-weight: 400;
    color: #2d2d2d;
  }
}
</style>
