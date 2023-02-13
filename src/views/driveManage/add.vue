<template>
  <el-dialog v-model="addShow" width="800px" :show-close="false">
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
      size="small"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="电脑型号" prop="orderFormId">
        <el-select v-model="ruleForm.orderFormId" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="驱动名称" prop="driveName">
        <el-input
          type="text"
          class="w_200"
          v-model="ruleForm.driveName"
        ></el-input>
      </el-form-item>
      <el-form-item label="上传文件" prop="fileUrl">
        <el-upload
          class="avatar-uploader"
          action
          :limit="1"
          :on-remove="handleRemove"
          :http-request="handleUpload"
          :file-list="fileList"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
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
import { addDrive, updateDrive } from '@/api/drive'
import { uploadImg } from '@/api/comment'

export default {
  data() {
    return {
      props: {
        label: ''
      },
      options: [
        {
          label: 0,
          value: 0
        }
      ],
      isEdit: false,
      autoData: [],
      fileList: [],
      addShow: false,
      ruleForm: {
        driveName: '',
        contents: '',
        orderFormId: 0,
        fileUrl: '',
        fileSize: ''
      },
      rules: {
        driveName: [
          {
            required: true,
            message: '请输入名称',
            trigger: 'blur'
          }
        ],
        contents: [
          {
            required: true,
            message: '请输入说明内容',
            trigger: 'blur'
          }
        ],
        fileUrl: [
          {
            required: true,
            message: '请上传驱动文件',
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    async handleUpload(fileObj) {
      const formData = new FormData()
      formData.set('file', fileObj.file)
      const msg = this.$message({
        customClass: 'load_message',
        iconClass: 'el-icon-loading',
        duration: 0,
        center: true,
        message: '上传中...'
      })
      try {
        const res = await uploadImg(formData)
        this.ruleForm.fileUrl = res.data.fileUrl
        this.ruleForm.fileSize = res.data.fileSize
        msg.close()
        this.$message({
          message: '上传成功',
          type: 'success'
        })
      } catch (err) {
        msg.close()
        throw err
      }
    },
    show(data) {
      if (data) {
        this.isEdit = true
        this.ruleForm = data
      } else {
        this.isEdit = false
        this.ruleForm = {
          driveName: '',
          contents: '',
          orderFormId: 1,
          fileUrl: '',
          fileSize: ''
        }
      }
      this.addShow = true
    },
    handleRemove() {
      this.ruleForm.fileUrl = ''
      this.ruleForm.fileSize = ''
    },
    submitForm() {
      this.$refs.ruleForm.validate(async(valid) => {
        if (valid) {
          const request = this.isEdit ? updateDrive : addDrive
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
</style>
