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
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="标题" prop="title">
        <el-input type="text" class="w_200" v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="链接地址" prop="linkUrl">
        <el-input
          type="text"
          class="w_200"
          v-model="ruleForm.linkUrl"
        ></el-input>
      </el-form-item>
      <el-form-item label="显示位置" prop="showLocation">
        <el-radio-group v-model="ruleForm.showLocation">
          <el-radio :label="1">首页</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="上传图片" prop="imgUrl">
        <el-upload
          class="avatar-uploader"
          action
          :show-file-list="false"
          :http-request="handleUpload"
        >
          <img v-if="ruleForm.imgUrl" :src="ruleForm.imgUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
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
import { addAd, updateAd } from '@/api/ad'
import { uploadImg } from '@/api/comment'

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
        title: '',
        linkUrl: '',
        showLocation: 1,
        imgUrl: ''
      },
      rules: {
        title: [
          {
            required: true,
            message: '请输入标题',
            trigger: 'blur'
          }
        ],
        linkUrl: [
          {
            required: true,
            message: '请输入链接地址',
            trigger: 'blur'
          }
        ],
        imgUrl: [
          {
            required: true,
            message: '请上传图片',
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
        this.ruleForm.imgUrl = res.data.fileUrl
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
          title: '',
          linkUrl: '',
          showLocation: 1,
          imgUrl: ''
        }
      }
      this.addShow = true
    },
    submitForm() {
      this.$refs.ruleForm.validate(async(valid) => {
        if (valid) {
          const request = this.isEdit ? updateAd : addAd
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
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
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
