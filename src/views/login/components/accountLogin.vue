<template>
  <el-form ref="form" :model="form" :rules="rules">
    <el-form-item prop="accountName">
      <el-input
        v-model="form.accountName"
        placeholder="请输入您的账号"
      ></el-input>
    </el-form-item>
    <el-form-item prop="passwordText">
      <el-input
        type="password"
        v-model="form.passwordText"
        placeholder="请输入密码"
      ></el-input>
    </el-form-item>
    <!-- <el-form-item prop="code" class="display_flex">
      <el-input v-model="form.code" placeholder="请输入动态验证码"></el-input>
      <el-button type="primary" @click="handleGetCode">动态验证码</el-button>
    </el-form-item> -->
    <el-form-item prop="status">
      <JcRange v-model:status="form.status"></JcRange>
    </el-form-item>
    <el-form-item prop="userAgreement" class="display_flex">
      <el-checkbox v-model="form.userAgreement" />
      <p>确定阅读并同意<span>《用户协议》</span> 吗？</p>
    </el-form-item>
    <el-form-item prop="code">
      <el-button class="btn" type="primary" @click="handleLogin">
        登录
      </el-button>
      <p class="btn_flex">
        <el-button type="text" @click="handleGetCode">找回密码</el-button>
        <el-button type="text" @click="handleJumpRegister">立即注册</el-button>
      </p>
    </el-form-item>
  </el-form>
</template>

<script>
import { userLogin } from '@/api/login'
import JcRange from '@/components/SliderVerify/index.vue'

export default {
  components: {
    JcRange
  },
  data() {
    return {
      form: {
        status: false,
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
        status: [
          {
            validator: (rule, value, callback) => {
              console.log(value)
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
      }
    }
  },
  methods: {
    handleLogin() {
      this.$refs.form.validate(async(valid) => {
        if (valid) {
          const res = await userLogin({
            accountName: this.form.accountName,
            passwordText: this.form.passwordText
          })
          localStorage.setItem('token', JSON.stringify(res.data))
          this.$router.replace({
            path: '/home'
          })
        }
      })
    },
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
