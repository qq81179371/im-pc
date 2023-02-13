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
      <el-form-item label="类型" prop="singlePageType">
        <el-select
          v-model="ruleForm.singlePageType"
          class="w_200"
          placeholder="请选择类型"
        >
          <el-option label="说明书" :value="0"></el-option>
          <el-option label="说明书" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input type="text" class="w_200" v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="Tags标识" prop="tagsText">
        <el-input
          type="text"
          class="w_200"
          v-model="ruleForm.tagsText"
          placeholder="这里请输入设备型号标识(Default值表示默认说明书)"
        ></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="contents">
        <Tinymce
          :height="150"
          v-model="ruleForm.contents"
        />
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
import Tinymce from '@/components/Tinymce/index.vue'
import { addSinglePage, putSinglePage } from '@/api/singlePage'

export default {
  components: {
    Tinymce
  },
  data() {
    return {
      addShow: false,
      ruleForm: {
        title: '',
        contents: '',
        singlePageType: 0,
        tagsText: ''
      },
      isEdit: false,
      rules: {
        title: [
          {
            required: true,
            message: '请输入标题',
            trigger: 'blur'
          }
        ],
        contents: [
          {
            required: true,
            message: '请输入内容',
            trigger: 'blur'
          }
        ],
        singlePageType: [
          {
            required: true,
            message: '请选择类型',
            trigger: 'blur'
          }
        ],
        tagsText: [
          {
            required: true,
            message: '请输入标识',
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
          title: '',
          contents: '',
          singlePageType: 0,
          tagsText: ''
        }
      }
      this.addShow = true
    },
    submitForm() {
      this.$refs.ruleForm.validate(async(valid) => {
        if (valid) {
          const request = this.isEdit ? putSinglePage : addSinglePage
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
