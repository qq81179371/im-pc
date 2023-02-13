<template>
  <el-dialog
    v-model="dialogVisible"
    :show-close="false"
    :before-close="handleClose"
  >
    <template #title>
      <div class="header">
        <span>说明书下载</span>
        <i class="el-icon-close" @click="dialogVisible = false"></i>
      </div>
    </template>
    <div class="table_main">
      <template v-for="l in classList" :key="l.mcId">
        <div class="table_title">{{ l.name || '默认' }}</div>
        <el-row class="table_header" align="middle">
          <el-col :span="7" class="text_center"> 文件名称 </el-col>
          <el-col :span="7" class="text_center"> 更新时间 </el-col>
          <el-col :span="6" class="text_center"> 文件大小 </el-col>
          <el-col :span="4" class="text_center"> 下载 </el-col>
        </el-row>
        <div class="table_content">
          <el-row
            class="table_list"
            v-for="item in l.list"
            :key="item"
            align="middle"
          >
            <el-col :span="7" class="text_center">{{
              item.classificationName
            }}</el-col>
            <el-col :span="7" class="text_center">{{ item.updated }}</el-col>
            <el-col :span="6" class="text_center">{{ item.fileSize }}</el-col>
            <el-col :span="4" class="text_center">
              <i class="el-icon-download" @click="handleDownload(item)"></i>
            </el-col>
          </el-row>
          <el-empty v-if="!l.list.length" description="暂无数据"></el-empty>
        </div>
      </template>
    </div>
  </el-dialog>
</template>

<script>
import { getMaterialManualList, getMaterialManualClassList } from '@/api/index'

export default {
  data() {
    return {
      dialogVisible: false,
      classList: [],
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
        this.dialogVisible = true
        const classList = await getMaterialManualClassList()
        const res = await getMaterialManualList()
        this.classList = classList.data.map((v) => ({
          ...v,
          list: res.data.filter((e) => e.mcId === v.mcId)
        }))
      } catch (err) {
        // err
      }
    },
    handleClose() {},
    handleDownload(item) {
      window.open(item.fileUrl)
    }
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
  max-height: 600px;
  overflow: auto;
  .table_title {
    margin: 0px 0 10px;
    font-size: 16px;
    font-weight: 700;
    color: #2d2d2d;
  }
  .table_content {
    margin-bottom: 10px;
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
    font-size: 14px;
    height: 50px;
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
