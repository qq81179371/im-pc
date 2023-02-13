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
      <el-form-item label="上传文件">
        <el-upload
          class="avatar-uploader"
          action
          drag
          :limit="1"
          ref="upload"
          :auto-upload="false"
          :on-remove="handleRemove"
          :http-request="handleUpload"
          :file-list="fileList"
        >
          <div class="upload_content">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
          </div>
          <template #tip>
            <p>
              <el-button
                type="text"
                @click="handleExprotTemplate"
                class="el-download"
                >下载模板</el-button
              >
            </p>
            <p class="el-upload__tip">
              提示: 仅允许导入'xls'或者'xlsx'格式文件!
            </p>
          </template>
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
import { importSecretKey } from '@/api/secretKey'

export default {
  data() {
    return {
      options: [],
      isEdit: false,
      fileList: [],
      addShow: false
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
        await importSecretKey(formData)
        msg.close()
        this.$message({
          message: '导入成功',
          type: 'success'
        })
        this.addShow = false
        this.$emit('handleRefresh')
      } catch (err) {
        msg.close()
        throw err
      }
    },
    handleExprotTemplate() {
      window.open('http://zbapi.51core.net:8080/temp/%E7%A7%98%E9%92%A5%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx')
    },
    show() {
      this.addShow = true
    },
    submitForm() {
      // if (this.fileList.length) {
      this.$refs.upload.submit()
      /*
       * } else {
       *   this.$message.error({
       *     message: '请选择上传文件',
       *     type: 'success'
       *   })
       * }
       */
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
    }
  }
}
.upload_content {
  padding: 0;
  background-color: #fff;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  box-sizing: border-box;
  width: 360px;
  height: 180px;
  text-align: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  .el-icon-upload {
    font-size: 67px;
    margin: 40px 0 16px;
    line-height: 50px;
  }
}
.el-upload__tip {
  margin-top: 0;
  color: #f56c6c;
}
</style>
