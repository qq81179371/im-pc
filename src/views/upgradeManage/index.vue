<template>
  <div class="input_suffix">
    <span class="label">标题: </span>
    <el-input
      v-model="listQuery.kw"
      placeholder="版本名称/版本号"
      size="small"
      @keyup.enter="handleRefresh"
      @clear="handleRefresh"
      clearable
    ></el-input>
  </div>
  <el-button class="add_btn" type="primary" @click="handleAdd()" size="small">
    添加升级包
  </el-button>
  <el-table
    :data="list"
    border
    size="small"
    v-loading="isLoading"
    :default-sort="{ prop: 'created', order: 'descending' }"
  >
    <el-table-column prop="versionId" width="70px" label="ID"></el-table-column>
    <el-table-column prop="versionName" label="版本名称"> </el-table-column>
    <el-table-column prop="versionCode" label="版本号"> </el-table-column>
    <el-table-column prop="isDownload" label="是否可下载">
      <template #default="scope">
        {{ scope.row.isDownload ? '允许' : '禁止' }}
      </template>
    </el-table-column>
    <el-table-column prop="created" sortable label="添加时间">
    </el-table-column>
    <el-table-column prop="updated" sortable label="最后更新时间">
    </el-table-column>
    <el-table-column label="操作" width="100px">
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
  <addForm ref="addForm" />
</template>

<script>
import { getUpgradeList, deleteUpgrade } from '@/api/upgrade'
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
        const res = await getUpgradeList(this.listQuery)
        this.list = res.data
        this.total = res.totalCount
        this.isLoading = false
      } catch (err) {
        // err
      }
    },
    async handleDelete(data) {
      try {
        await this.$confirm('此操作将永久删除该升级包, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await deleteUpgrade(data.versionId)
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
