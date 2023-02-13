<template>
  <div class="wrap" v-if="!isSuccess">
    <h4>
      <span>注册</span>
      <p>本机序列号为：XXXXXXXXXXXXX</p>
    </h4>
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item props="accountName">
        <el-input
          v-model="form.accountName"
          placeholder="请输入您的手机号码"
        ></el-input>
      </el-form-item>
      <el-form-item props="code" class="display_flex">
        <el-input v-model="form.code" placeholder="请输入验证码"></el-input>
        <el-button type="primary" :disabled="isSend" @click="handleGetCode">{{
          isSend ? countTime : "获取验证码"
        }}</el-button>
      </el-form-item>
      <el-form-item props="passwordText">
        <el-input
          type="password"
          v-model="form.passwordText"
          placeholder="请创建密码"
        ></el-input>
      </el-form-item>
      <el-form-item props="userAgreement" class="display_flex">
        <el-checkbox v-model="form.userAgreement" />
        <p>确定阅读并同意<span>《用户协议》</span> 吗？</p>
      </el-form-item>
      <el-form-item props="code">
        <el-button class="btn" type="primary" @click="handleSubmit">
          提交
        </el-button>
        <p class="btn_flex">
          已有账号？
          <el-button type="text" @click="handleJumpLogin">前往登录</el-button>
        </p>
      </el-form-item>
    </el-form>
  </div>
  <div class="success" v-else>
    <i class="el-icon-success"></i>
    <p>恭喜注册成功</p>
    <el-button class="btn" type="primary" @click="handleJumpLogin">
      前往登录
    </el-button>
  </div>
</template>

<script>
import { getAccountCode, submitAccountRegister } from '@/api/login'

export default {
  data() {
    return {
      isSuccess: false,
      isSend: false,
      form: {
        accountName: '',
        passwordText: '',
        code: '',
        userAgreement: false
      },
      rules: {
        accountName: [
          {
            required: true,
            message: '请输入您的账号',
            trigger: 'blur'
          }
        ],
        passwordText: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ],
        codeVerify: [
          {
            validator: (rule, value, callback) => {
              if (value) {
                callback()
              } else {
                callback(new Error('请先进行验证'))
              }
            },
            trigger: 'change'
          }
        ],
        userAgreement: [
          {
            validator: (rule, value, callback) => {
              console.log(value)
              if (value) {
                callback()
              } else {
                callback(new Error('请先同意用户协议'))
              }
            },
            trigger: 'blur'
          }
        ]
      },
      countTime: 0
    }
  },
  methods: {
    async handleGetCode() {
      if (this.form.accountName) {
        await getAccountCode({ accountName: this.form.accountName })
        this.$message({
          message: '发送成功',
          type: 'success'
        })
        this.isSend = true
        this.countTime = 60
        const timer = setInterval(() => {
          if (this.countTime <= 0) {
            clearInterval(timer)
          } else {
            this.countTime -= 1
            this.isSend = false
          }
        }, 1000)
      } else {
        this.$message({
          message: '请输入手机号',
          type: 'warning'
        })
      }
    },
    handleSubmit() {},
    handleJumpLogin() {
      this.$router.push({
        name: 'login'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  margin-top: 40px;
  h4 {
    margin-bottom: 14px;
    span {
      font-size: 16px;
      font-weight: 700;
      color: #2d2d2d;
    }
    p {
      margin-top: 4px;
      font-size: 12px;
      font-weight: 400;
      color: #2d2d2d;
    }
  }
  .el-form {
    .el-form-item {
      margin-bottom: 20px;
      .btn {
        width: 100%;
      }
      .btn_flex {
        font-size: 14px;
        font-weight: 400;
        color: #2d2d2d;
        text-align: center;
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
}
.success {
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  i {
    font-size: 60px;
    color: #11a032;
    margin-bottom: 20px;
  }
  p {
    font-size: 40px;
    font-family: PingFang SC, PingFang SC-Regular;
    font-weight: 400;
    text-align: center;
    color: #2d2d2d;
  }
  .btn {
    width: 100%;
    margin-top: 130px;
  }
}
</style>
