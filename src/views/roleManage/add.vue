<template>
  <el-dialog
    v-model="addShow"
    width="800px"
    :show-close="false"
    :before-close="handleClose"
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
      <el-form-item label="角色名称" prop="roleName ">
        <el-input
          type="text"
          class="w_200"
          v-model="ruleForm.roleName "
        ></el-input>
      </el-form-item>
      <!-- <el-form-item label="描述" prop="title">
        <el-input
          type="textarea"
          class="w_200"
          v-model="ruleForm.title"
        ></el-input>
      </el-form-item> -->
      <!-- <el-form-item label="权限" prop="tagsText">
        <el-tree
          :props="props"
          :data="autoData"
          lazy
          show-checkbox
          @check-change="handleCheckChange"
        >
        </el-tree>
      </el-form-item> -->
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
import { addRole, updateRole } from '@/api/role'

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
        roleName: ''
      },
      rules: {
        roleName: [
          {
            required: true,
            message: '请输入名称',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  /*
   * mounted() {
   *   this.initAuto()
   * },
   */
  methods: {
    show(data) {
      if (data) {
        this.isEdit = true
        this.ruleForm = data
      } else {
        this.isEdit = false
        this.ruleForm = {
          roleName: ''
        }
      }
      this.addShow = true
    },
    /*
     * async initAuto() {
     *   try {
     *     const res = await getAuthorization({
     *       roleId: 0,
     *       menuIds: [0]
     *     })
     *   } catch (err) {
     *     // err
     *   }
     * },
     */
    submitForm() {
      this.$refs.ruleForm.validate(async(valid) => {
        if (valid) {
          const request = this.isEdit ? updateRole : addRole
          await request(this.isEdit ? this.ruleForm : this.ruleForm.roleName)
          this.$notify({
            title: '提示',
            message: this.isEdit ? '编辑成功' : '添加成功',
            type: 'success'
          })
          this.$emit('handleRefresh')
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
</style>
