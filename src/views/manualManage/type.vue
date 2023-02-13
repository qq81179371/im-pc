<template>
  <el-dialog v-model="addShow" width="800px" :show-close="false">
    <template #title>
      <div class="dialog_header">
        <span>分类管理</span>
        <i class="el-icon-close" @click="addShow = false"></i>
      </div>
    </template>
    <el-button class="m_15" type="primary" @click="handleAdd()" size="small">
      新增
    </el-button>
    <el-table :data="list" border size="small" v-loading="isLoading">
      <el-table-column prop="mcId" label="ID"></el-table-column>
      <el-table-column prop="name" label="分类名称"> </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button @click="handleAdd(scope.row)" type="text" size="small"
            >修改</el-button
          >
          <el-button type="text" @click="handleDelete(scope.row)" size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <span class="label"
        >共{{ total }}条记录 第{{ listQuery.page }} /
        {{ Math.ceil(total / listQuery.pageSize) }}页</span
      >
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        v-model:currentPage="listQuery.page"
        background
        :page-sizes="[10, 20, 30]"
        :page-size="10"
        layout="sizes, prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </div>
  </el-dialog>
</template>
<script>
import {
  getManualTypelList,
  addManualType,
  updateManualType,
  deleteManualType
} from '@/api/manual'
import refresh from '@/utils/refresh'

export default {
  mixins: [refresh],
  data() {
    return {
      list: [],
      total: 0,
      addShow: false,
      isLoading: false,
      listQuery: {
        kw: '',
        page: 1,
        pageSize: 10
      }
    }
  },
  methods: {
    show() {
      this.addShow = true
      this.getList()
    },
    async getList() {
      try {
        this.isLoading = true
        const res = await getManualTypelList(this.listQuery)
        this.list = res.data
        this.total = res.totalCount
        this.isLoading = false
      } catch (err) {
        // err
      }
    },
    async handleDelete(data) {
      try {
        await this.$confirm('此操作将永久删除该驱动, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await deleteManualType(data.mcId)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.handleRefresh()
      } catch (err) {
        // err
      }
    },
    async handleAdd(data) {
      try {
        const { value } = await this.$prompt('请输入分类名称', '添加分类', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValidator: (v) => !!v,
          inputValue: data ? data.name : '',
          inputErrorMessage: '请输入分类名称'
        })
        const request = data ? updateManualType : addManualType
        await request({ name: value, id: data ? data.mcId : undefined })
        this.$message({
          type: 'success',
          message: '添加成功'
        })
        this.handleRefresh()
      } catch (err) {
        // err
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.w_200 {
  width: 400px;
}
.m_15 {
  margin: 0 0 15px 0;
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
