<template>
  <div class="input_suffix">
    <span class="label">标题: </span>
    <el-input
      v-model="listQuery.kw"
      placeholder="订单号/DPK/产品规格"
      size="small"
      @keyup.enter="handleRefresh"
      @clear="handleRefresh"
      clearable
    ></el-input>
  </div>
  <el-button class="add_btn" type="primary" @click="handleAdd()" size="small">
    新增
  </el-button>
  <el-table
    :data="list"
    border
    size="small"
    v-loading="isLoading"
    :default-sort="{ prop: 'created', order: 'descending' }"
  >
    <el-table-column prop="orderFormId" width="70px" label="ID"></el-table-column>
    <el-table-column prop="orderFormCode" label="订单号"> </el-table-column>
    <el-table-column prop="snCodePrefix" label="序列号前缀"> </el-table-column>
    <el-table-column prop="beginCount" width="120px" label="订单编号开始数"> </el-table-column>
    <el-table-column prop="totalCount" width="100px" label="订单生产数"> </el-table-column>
    <el-table-column prop="dpkText" label="DPK"> </el-table-column>
    <el-table-column prop="ram" label="产品规格"> </el-table-column>
    <el-table-column prop="generateStateCode" label="生成状态">
      <template #default="scope">
        <span>
          {{ scope.row.generateStateCode ? '已生成' : '未生成' }}
        </span>
      </template>
    </el-table-column>
    <el-table-column prop="created" sortable label="添加时间">
    </el-table-column>
    <el-table-column prop="updated" sortable label="最后更新时间">
    </el-table-column>
    <el-table-column label="操作" width="120px">
      <template #default="scope">
        <el-button @click="handleExport(scope.row)" type="text" size="small"
          >导出</el-button
        >
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
  <addForm ref="addForm" />
</template>

<script>
import { getOrderFormList, deleteOrder, exportOrder } from '@/api/order'
import refresh from '@/utils/refresh'
import addForm from './add.vue'

export default {
  mixins: [refresh],
  components: {
    addForm
  },
  data() {
    return {
      isLoading: false,
      listQuery: {
        kw: '',
        page: 1,
        pageSize: 10
      },
      list: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      try {
        this.isLoading = true
        const res = await getOrderFormList(this.listQuery)
        this.list = res.data
        this.total = res.totalCount
        this.isLoading = false
      } catch (err) {
        // err
      }
    },
    async handleExport(data) {
      try {
        const res = await exportOrder(data.orderFormId)
      } catch (err) {
        // err
      }
    },
    async handleDelete(data) {
      try {
        await this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await deleteOrder(data.adId)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.handleRefresh()
      } catch (err) {
        // err
      }
    },
    handleAdd(data) {
      this.$refs.addForm.show(data)
    }
  }
}
</script>

<style lang="scss" scoped>
.add_btn {
  margin: 30px 0;
}
.ad_img {
  max-width: 200px;
  max-height: 200px;
}
</style>
