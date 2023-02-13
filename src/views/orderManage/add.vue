<template>
  <el-dialog
    v-model="addShow"
    width="800px"
    :show-close="false"
  >
    <template #title>
      <div class="dialog_header">
        <span>新增</span>
        <i class="el-icon-close" @click="addShow = false"></i>
      </div>
    </template>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="180px"
      class="demo-ruleForm"
    >
      <el-form-item label="订单号" prop="orderFormCode">
        <el-input type="text" class="w_200" v-model="ruleForm.orderFormCode"></el-input>
      </el-form-item>
      <el-form-item label="序列号前缀" prop="snCodePrefix">
        <el-input type="text" class="w_200" v-model="ruleForm.snCodePrefix"></el-input>
      </el-form-item>
      <el-form-item label="订单编号开始数" prop="beginCount">
        <el-input type="text" class="w_200" v-model="ruleForm.beginCount"></el-input>
      </el-form-item>
      <el-form-item label="设备生产数" prop="totalCount">
        <el-input type="text" class="w_200" v-model="ruleForm.totalCount"></el-input>
      </el-form-item>
      <el-form-item label="机型" prop="specification">
        <el-input type="text" class="w_200" v-model="ruleForm.specification"></el-input>
      </el-form-item>
      <el-form-item label="CPU规格" prop="cpu">
        <el-input type="text" class="w_200" v-model="ruleForm.cpu"></el-input>
      </el-form-item>
      <el-form-item label="屏规格" prop="screen">
        <el-input type="text" class="w_200" v-model="ruleForm.screen"></el-input>
      </el-form-item>
      <el-form-item label="内存规格" prop="ram">
        <el-input type="text" class="w_200" v-model="ruleForm.ram"></el-input>
      </el-form-item>
      <el-form-item label="硬盘规格" prop="hardDisk">
        <el-input type="text" class="w_200" v-model="ruleForm.hardDisk"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog_footer">
        <el-button @click="addShow = false" size="small">取消</el-button>
        <el-button type="primary" size="small" @click="submitForm">
          保存
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script>
import { addOrder, updateOrder } from '@/api/Order'

export default {
  data() {
    return {
      props: {
        label: ''
      },
      isEdit: false,
      autoData: [],
      addShow: false,
      ruleForm: {
        orderFormCode: '',
        snCodePrefix: '',
        beginCount: 0,
        totalCount: 0,
        dpkText: '',
        specification: '',
        cpu: '',
        screen: '',
        ram: '',
        hardDisk: '',
        remark: ''

      },
      rules: {
        orderFormCode: [
          {
            required: true,
            message: '请输入订单号',
            trigger: 'blur'
          }
        ],
        snCodePrefix: [
          {
            required: true,
            message: '请输入序列号前缀',
            trigger: 'blur'
          }
        ],
        beginCount: [
          {
            required: true,
            message: '请输入订单编号开始数',
            trigger: 'blur'
          }
        ],
        totalCount: [
          {
            required: true,
            message: '请输入设备生产数',
            trigger: 'blur'
          }
        ],
        specification: [
          {
            required: true,
            message: '请输入机型',
            trigger: 'blur'
          }
        ],
        cpu: [
          {
            required: true,
            message: '请输入CPU规格',
            trigger: 'blur'
          }
        ],
        screen: [
          {
            required: true,
            message: '请输入屏规格',
            trigger: 'blur'
          }
        ],
        ram: [
          {
            required: true,
            message: '请输入内存规格',
            trigger: 'blur'
          }
        ],
        hardDisk: [
          {
            required: true,
            message: '请输入硬盘规格',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    show(data) {
      if (data) {
        this.isEdit = true
        this.ruleForm = data
      } else {
        this.isEdit = false
        this.ruleForm = {
          orderFormCode: '',
          snCodePrefix: '',
          beginCount: 0,
          totalCount: 0,
          dpkText: '',
          specification: '',
          cpu: '',
          screen: '',
          ram: '',
          hardDisk: '',
          remark: ''
        }
      }
      this.addShow = true
    },
    submitForm() {
      this.$refs.ruleForm.validate(async(valid) => {
        if (valid) {
          const request = this.isEdit ? updateOrder : addOrder
          await request(this.ruleForm)
          this.$notify({
            title: '提示',
            message: this.isEdit ? '编辑成功' : '添加成功',
            type: 'success'
          })
          this.addShow = false
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
