<template>
  <div class="input_suffix">
    <span class="label">角色名称: </span>
    <el-input
      v-model="input"
      placeholder="请输入"
      @keyup.enter="handleRefresh"
      @clear="handleRefresh"
      size="small"
      clearable
    ></el-input>
  </div>
  <el-button class="add_btn" type="primary" @click="handleAdd()" size="small">
    新增
  </el-button>
  <el-table :data="list" border size="small">
    <el-table-column prop="roleId" width="100px" label="ID"> </el-table-column>
    <el-table-column prop="roleName" label="角色名称"> </el-table-column>
    <el-table-column label="操作" width="300px">
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
  <addForm ref="addForm" @handleRefresh="handleRefresh" />
</template>

<script>
import { getRoleList, deleteRole } from '@/api/role'
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
        const res = await getRoleList(this.listQuery)
        this.list = res.data
        this.total = res.totalCount
        this.isLoading = false
      } catch (err) {
        // err
      }
    },
    async handleDelete(data) {
      try {
        await this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await deleteRole(data.roleId)
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
</style>
