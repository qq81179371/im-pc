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
      <el-form-item label="说明书分类" prop="mcId">
        <el-select v-model="ruleForm.mcId" placeholder="请选择分类">
          <el-option
            v-for="item in options"
            :key="item.mcId"
            :label="item.name"
            :value="item.mcId"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="说明书名称" prop="title">
        <el-input
          type="text"
          class="w_200"
          v-model="ruleForm.title"
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
import { addManual, updateManual, getManualTypelAll } from '@/api/manual'
import { uploadImg } from '@/api/comment'

export default {
  data() {
    return {
      options: [],
      isEdit: false,
      fileList: [],
      addShow: false,
      ruleForm: {
        mcId: 1,
        title: '',
        fileUrl: '',
        fileSize: ''
      },
      rules: {
        mcId: [
          {
            required: true,
            message: '请选择分类',
            trigger: 'blur'
          }
        ],
        title: [
          {
            required: true,
            message: '请输入标题',
            trigger: 'blur'
          }
        ],
        fileUrl: [
          {
            required: true,
            message: '请上传说明书文件',
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
    async show(data) {
      if (data) {
        this.isEdit = true
        this.ruleForm = data
        this.fileList = [
          {
            name: data.fileUrl.slice(data.fileUrl.lastIndexOf('/') + 1)
          }
        ]
      } else {
        this.isEdit = false
        this.ruleForm = {
          mcId: 1,
          title: '',
          fileUrl: '',
          fileSize: ''
        }
      }
      this.addShow = true
      const res = await getManualTypelAll()
      this.options = res.data
    },
    handleRemove() {
      this.ruleForm.fileUrl = ''
      this.ruleForm.fileSize = ''
    },
    submitForm() {
      this.$refs.ruleForm.validate(async(valid) => {
        if (valid) {
          const request = this.isEdit ? updateManual : addManual
          await request(this.ruleForm)
          this.$notify({
            title: '提示',
            message: this.isEdit ? '编辑成功' : '添加成功',
            type: 'success'
          })
          this.addShow = false
          this.$emit('handleRefresh')
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
