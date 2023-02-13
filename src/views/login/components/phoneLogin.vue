<template>
  <el-form ref="form" :model="form">
    <el-form-item props="accountName">
      <el-input
        v-model="form.accountName"
        placeholder="请输入您的手机号码"
      ></el-input>
    </el-form-item>
    <el-form-item props="code" class="display_flex">
      <el-input v-model="form.code" placeholder="请输入验证码"></el-input>
      <el-button type="primary" @click="handleGetCode">{{
        isSend ? countTime : "获取验证码"
      }}</el-button>
    </el-form-item>
    <el-form-item props="userAgreement" class="display_flex">
      <el-checkbox v-model="form.userAgreement" />
      <p>确定阅读并同意<span>《用户协议》</span> 吗？</p>
    </el-form-item>
    <el-form-item props="code">
      <el-button class="btn" type="primary" @click="handleGetCode"
        >登录</el-button
      >
      <p class="btn_flex">
        <el-button type="text" @click="handleGetCode">找回密码</el-button>
        <el-button type="text" @click="handleJumpRegister">立即注册</el-button>
      </p>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      countTime: 60,
      form: {
        userName: '',
        password: '',
        code: '',
        userAgreement: false
      }
    }
  },
  methods: {
    handleGetCode() {},
    handleJumpRegister() {
      this.$router.push({
        name: 'register'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form {
  .el-form-item {
    margin-bottom: 20px;
    .btn {
      width: 100%;
    }
    .btn_flex {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .el-button {
        color: #0065b3;
      }
    }
  }
  .display_flex {
    :deep .el-form-item__content {
      display: flex;
      align-items: center;
      line-height: 1;
      .el-button,
      p {
        margin-left: 10px;
      }
      p {
        font-size: 12px;
        font-weight: 400 !important;
        color: #000000;
        span {
          cursor: pointer;
          color: #0071c4;
        }
      }
    }
  }
}
</style>
