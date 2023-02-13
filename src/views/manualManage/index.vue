<template>
  <div class="input_suffix">
    <span class="label">标题: </span>
    <el-input
      v-model="listQuery.kw"
      placeholder="标题"
      size="small"
      @keyup.enter="handleRefresh"
      @clear="handleRefresh"
      clearable
    ></el-input>
  </div>
  <div class="add_list">
    <el-button class="add_btn" type="primary" @click="handleAdd()" size="small">
      新增
    </el-button>
    <el-button
      class="add_btn fr"
      plain
      type="primary"
      @click="handleType()"
      size="small"
    >
      分类管理
    </el-button>
  </div>
  <el-table
    :data="list"
    border
    size="small"
    v-loading="isLoading"
    :default-sort="{ prop: 'updated', order: 'descending' }"
  >
    <el-table-column prop="manualId" width="70px" label="ID"></el-table-column>
    <el-table-column prop="classificationName" label="说明书分类"> </el-table-column>
    <el-table-column prop="title" label="说明书名称"> </el-table-column>
    <el-table-column prop="fileSize" label="大小"> </el-table-column>
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
  <addForm ref="addForm" @handleRefresh="handleRefresh" />
  <addType ref="addType" />
</template>

<script>
import { getManualList, deleteManual } from '@/api/manual'
import refresh from '@/utils/refresh'
import addForm from './add.vue'
import addType from './type.vue'

export default {
  mixins: [refresh],
  components: {
    addForm,
    addType
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
        const res = await getManualList(this.listQuery)
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
        await deleteManual(data.adId)
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
    },
    handleType() {
      this.$refs.addType.show()
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
