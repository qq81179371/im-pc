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
      <el-form-item label="用户名" prop="adminName">
        <el-input
          type="text"
          class="w_200"
          v-model="ruleForm.adminName"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          class="w_200"
          v-model="ruleForm.password"
        ></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nickName">
        <el-input
          type="nickName"
          class="w_200"
          v-model="ruleForm.nickName"
        ></el-input>
      </el-form-item>
      <el-form-item label="头像" prop="headUrl">
         <el-upload
          class="avatar-uploader"
          action
          :limit="1"
          :show-file-list="false"
          :on-remove="handleRemove"
          :http-request="handleUpload"
        >
          <img v-if="ruleForm.headUrl" :src="ruleForm.headUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="角色" prop="roleId">
        <el-select v-model="ruleForm.roleId" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.roleId"
            :label="item.roleName"
            :value="item.roleId"
          >
          </el-option>
        </el-select>
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
import { addManagerAccount, updateManagerAccount } from '@/api/admin'
import { getRoleList } from '@/api/role'
import { uploadImg } from '@/api/comment'

export default {
  data() {
    return {
      options: [],
      isEdit: false,
      fileList: [],
      addShow: false,
      ruleForm: {
        adminName: '',
        password: '',
        nickName: '',
        headUrl: '',
        roleId: null
      },
      rules: {
        adminName: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ],
        nickName: [
          {
            required: true,
            message: '请输入昵称',
            trigger: 'blur'
          }
        ],
        headUrl: [
          {
            required: true,
            message: '请上传头像',
            trigger: 'blur'
          }
        ],
        roleId: [
          {
            required: true,
            message: '请选择角色',
            trigger: 'blur'
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
        this.ruleForm.headUrl = res.data.fileUrl
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
      } else {
        this.isEdit = false
        this.ruleForm = {
          adminName: '',
          password: '',
          nickName: '',
          headUrl: '',
          roleId: null
        }
      }
      this.addShow = true
      const res = await getRoleList({
        kw: '',
        page: 1,
        pageSize: 100
      })
      this.options = res.data
    },
    handleRemove() {
      this.ruleForm.fileUrl = ''
      this.ruleForm.fileSize = ''
    },
    submitForm() {
      this.$refs.ruleForm.validate(async(valid) => {
        if (valid) {
          const request = this.isEdit ? updateManagerAccount : addManagerAccount
          await request(this.ruleForm)
          this.$notify({
            title: '提示',
            message: this.isEdit ? '编辑成功' : '添加成功',
            type: 'success'
          })
          // this.addShow = false
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
