<template>
  <el-dialog
    v-model="dialogVisible"
    :show-close="false"
    :before-close="handleClose"
  >
    <template #title>
      <div class="header">
        <span>驱动下载</span>
        <i class="el-icon-close" @click="dialogVisible = false"></i>
      </div>
    </template>
    <div class="table_main" v-if="!isSelect">
      <div class="table_title bor">请选择您的电脑型号</div>
      <el-radio-group v-model="radio">
        <el-row align="middle">
          <el-col class="table_item" :span="6" v-for="item in list" :key="item">
            <el-radio :label="item">电脑型号</el-radio>
          </el-col>
        </el-row>
      </el-radio-group>
    </div>
    <div class="table_main" v-else>
      <div class="table_title">说明书分类名称</div>
      <el-row class="table_header" align="middle">
        <el-col :span="7" class="text_center"> 文件名称 </el-col>
        <el-col :span="7" class="text_center"> 更新时间 </el-col>
        <el-col :span="6" class="text_center"> 文件大小 </el-col>
        <el-col :span="4" class="text_center"> 下载 </el-col>
      </el-row>
      <el-row class="table_list" align="middle">
        <template v-for="item in tableData" :key="item">
          <el-col :span="7" class="text_center">{{ item.name }}</el-col>
          <el-col :span="7" class="text_center">{{ item.date }}</el-col>
          <el-col :span="6" class="text_center">{{ item.size }}</el-col>
          <el-col :span="4" class="text_center">
            <i class="el-icon-download"></i>
          </el-col>
        </template>
      </el-row>
    </div>
    <template #footer>
      <div class="footer">
        <el-button type="primary" size="small">下一步</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { getDeviceList, getMaterialManualClassList } from '@/api/index'

export default {
  data() {
    return {
      dialogVisible: false,
      radio: 9,
      list: [],
      isSelect: false,
      tableData: [
        {
          name: '文件名称1',
          date: '2021-01-01',
          size: '0.23MB'
        }
      ]
    }
  },
  methods: {
    async show() {
      try {
        const res = await getDeviceList()
        this.list = res.data
      } catch (err) {
        // err
      }
      this.dialogVisible = true
    },
    handleClose() {}
  }
}
</script>

<style lang="scss" scoped>
.header {
  background: #0071c4;
  height: 60px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  span {
    color: #fff;
    font-size: 16px;
    font-weight: 700;
  }
  i {
    cursor: pointer;
    color: #fff;
    font-size: 20px;
  }
}
.table_main {
  .table_title {
    padding-bottom: 10px;
    font-size: 16px;
    font-weight: 700;
    color: #2d2d2d;
    &.bor {
      border-top: 1px solid #fff;
    }
  }
  .table_header {
    border-top: 1px solid #ccc;
    background: #f2f2f2;
    height: 50px;
    font-size: 14px;
    font-weight: 700;
    color: #2d2d2d;
    line-height: 20px;
  }
  .table_list {
    height: 50px;
    font-size: 14px;
    font-weight: 400;
    color: #2d2d2d;
    line-height: 20px;
    i {
      cursor: pointer;
      font-size: 22px;
      color: #0071c4;
    }
  }
  .table_item {
    height: 45px;
    font-size: 14px;
    font-weight: 400;
    color: #2d2d2d;
    line-height: 20px;
    i {
      cursor: pointer;
      font-size: 22px;
      color: #0071c4;
    }
  }
}
.footer {
  padding-top: 15px;
  border-top: 1px solid #ccc;
}
</style>

<style lang="scss">
.el-overlay {
  .el-dialog {
    width: 1200px;
    .el-dialog__header {
      padding: 0;
    }
  }
}
</style>
