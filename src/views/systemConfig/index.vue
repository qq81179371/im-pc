<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    size="small"
    label-width="180px"
    class="demo-ruleForm"
  >
    <el-form-item label="开关状态配置项" prop="openStateCode">
      <el-select v-model="ruleForm.openStateCode" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label=" 时间配置项（天数）" prop="timeOfDayCount">
      <el-input
        type="text"
        class="w_200"
        v-model.number="ruleForm.timeOfDayCount"
      ></el-input>
    </el-form-item>
    <el-form-item label=" 最大秘钥数（每天）" prop="keyOfDayCount">
      <el-input
        type="text"
        class="w_200"
        v-model.number="ruleForm.keyOfDayCount"
      ></el-input>
    </el-form-item>
    <el-form-item>
        <el-button type="primary" size="small" @click="submitForm">
          保存
        </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { getSystemConfig, updateSystemConfig } from '@/api/systemConfig'

export default {
  data() {
    return {
      options: [
        {
          label: '开启',
          value: 1
        }, {
          label: '关闭',
          value: 0
        }
      ],
      fileList: [],
      ruleForm: {
        configId: 0,
        openStateCode: 0,
        timeOfDayCount: 0,
        keyOfDayCount: 0
      },
      rules: {
        openStateCode: [
          {
            required: true,
            message: '请选择状态',
            trigger: 'blur'
          }
        ],
        timeOfDayCount: [
          {
            required: true,
            message: '请输入天数',
            trigger: 'blur'
          }
        ],
        keyOfDayCount: [
          {
            required: true,
            message: '请输入数量',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      const res = await getSystemConfig()
      this.ruleForm = res.data
    },
    submitForm() {
      this.$refs.ruleForm.validate(async(valid) => {
        if (valid) {
          await updateSystemConfig(this.ruleForm)
          this.$notify({
            title: '提示',
            message: '更新成功',
            type: 'success'
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.w_200 {
  width: 400px;
}
</style>

<style lang="scss">
.el-overlay {
  .el-dialog {
    .el-dialog__header {
      padding: 0;
    }
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 24px;
  color: #8c939d;
  width: 130px;
  height: 130px;
  line-height: 130px;
  text-align: center;
}
.avatar {
  max-width: 130px;
  max-height: 130px;
  display: block;
}
</style>
