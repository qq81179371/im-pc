<template>
  <div class="input_suffix">
    <span class="label">用户名/昵称: </span>
    <el-input
      v-model="listQuery.kw"
      placeholder="请输入用户名/昵称"
      @keyup.enter="handleRefresh"
      @clear="handleRefresh"
      size="small"
      clearable
    ></el-input>
  </div>
  <el-button class="add_btn" type="danger" @click="handleDelete()" size="small">
    批量删除
  </el-button>
  <el-table
    :data="list"
    border
    size="small"
    @selection-change="handleSelectionChange"
    v-loading="isLoading"
    :default-sort="{ prop: 'registerTime', order: 'descending' }"
  >
    <el-table-column type="selection" width="55"> </el-table-column>
    <el-table-column
      prop="accountId"
      width="70px"
      label="用户ID"
    ></el-table-column>
    <el-table-column prop="accountName" label="账号名"> </el-table-column>
    <el-table-column prop="nickName" label="昵称"> </el-table-column>
    <el-table-column prop="sex" label="性别">
      <template #default="scope">{{ scope.row.sex ? "男" : "女" }} </template>
    </el-table-column>
    <el-table-column prop="registerTime" label="注册时间"> </el-table-column>
    <el-table-column prop="registerIP" label="注册IP"> </el-table-column>
    <el-table-column prop="areaData" label="注册地区"> </el-table-column>
    <el-table-column prop="lastLoginTime" sortable label="最后登录时间">
    </el-table-column>
    <el-table-column prop="lastLoginIP" label="最后登录IP"> </el-table-column>
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
</template>

<script>
import { getUser, deleteUser } from '@/api/user'
import refresh from '@/utils/refresh'

export default {
  mixins: [refresh],
  data() {
    return {
      isLoading: false,
      listQuery: {
        kw: '',
        page: 1,
        pageSize: 10
      },
      selectList: [],
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
        const res = await getUser(this.listQuery)
        this.list = res.data
        this.total = res.totalCount
        this.isLoading = false
      } catch (err) {
        // err
      }
    },
    handleSelectionChange(data) {
      this.selectList = data
    },
    async handleDelete() {
      try {
        await this.$confirm('此操作将永久删除该广告, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await deleteUser(this.selectList.map((v) => v.accountId))
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
