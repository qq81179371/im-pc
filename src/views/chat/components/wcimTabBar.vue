<template>
  <div class="footer_bar">
    <div class="tabs">
      <svg-icon class="icon" name="expression" />
      <el-upload
        action
        :show-file-list="false"
        ref="upload"
        :http-request="(e) =>handleUpload(e, 2)"
      >
        <svg-icon class="icon" name="photo" />
      </el-upload>
      <el-upload
        action
        ref="upload"
        :show-file-list="false"
        :http-request="(e) =>handleUpload(e, 3)"
      >
        <svg-icon class="icon mr20" name="video" />
      </el-upload>
      <svg-icon class="icon" name="doc" />
    </div>
    <div class="operate">
      <el-input
        v-model="message"
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 6 }"
        placeholder="请输入聊天内容..."
      ></el-input>
      <el-button type="primary" @click="handleSendMessage">发送</el-button>
    </div>
  </div>
</template>

<script>
import { uploadImg } from '@/api/comment'

export default {
  data() {
    return {
      message: '',
      operateList: [
        {
          text: '相册',
          value: 'expression'
        },
        {
          text: '拍照',
          value: 'photo'
        },
        {
          text: '文件',
          value: 'video'
        },
        {
          text: '会话',
          value: 'doc'
        }
      ]
    }
  },
  methods: {
    async handleUpload(fileObj, type) {
      const formData = new FormData()
      formData.set('file', fileObj.file)
      try {
        const res = await uploadImg(formData)
        this.$emit('handleSendMessage', res.data.fileUrl, type)
        this.$refs.upload.clearFiles()
      } catch (err) {
        // err
      }
    },
    handleSendMessage() {
      this.$emit('handleSendMessage', this.message, 1)
      this.message = ''
    }
  }
}
</script>
<style lang="scss" scoped>
.footer_bar {
  background: #fff;
  height: 200px;
  position: relative;
  .tabs {
    display: flex;
    padding: 10px 20px;
    border: 1px solid #f2f2f2 {
      left: 0;
      right: 0;
    }
    .icon {
      cursor: pointer;
      margin-right: 45px;
      font-size: 20px;
      color: #7d7d7d;
      &:hover {
        color: #0071c4;
      }
    }
    ::v-deep .van-field {
      border: 1px solid #cccccc;
      flex: 1;
      margin: 0 20px;
      min-height: 60px;
      border-radius: 10px;
      font-size: 24px;
      color: #d2d2d2;
    }
  }
  .operate {
    .el-textarea {
      border: none;
      :deep .el-textarea__inner {
        border: none;
        resize: none;
      }
    }
    .el-button {
      position: absolute;
      bottom: 10px;
      right: 10px;
    }
  }
}
</style>
