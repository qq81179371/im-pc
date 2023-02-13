<template>
  <div class="input_suffix">
    <span class="label">搜索: </span>
    <el-input
      v-model="listQuery.kw"
      placeholder="请输入内容"
      size="small"
      @keyup.enter="handleRefresh"
      @clear="handleRefresh"
      clearable
    ></el-input>
  </div>
  <el-button class="add_btn" type="primary" @click="handleAdd()" size="small">
    新增
  </el-button>
  <el-table :data="list" border size="small" v-loading="isLoading">
    <template v-for="item in listTitle" :key="item.value">
      <el-table-column
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
      ></el-table-column>
    </template>
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
import { getSinglePageist, deleteSinglePage } from '@/api/singlePage'
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
      total: 0,
      listTitle: [
        {
          label: 'ID',
          prop: 'pageId',
          width: 80
        },
        {
          label: '标题',
          prop: 'title'
        },
        {
          label: 'Tags标识',
          prop: 'tagsText'
        },
        {
          label: '所属类型',
          prop: 'singlePageType'
        },
        {
          label: '添加时间',
          prop: 'created'
        },
        {
          label: '最后更新时间',
          prop: 'updated'
        },
        {
          label: '浏览次数',
          prop: 'readCount',
          width: 120
        }
      ],
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
        const res = await getSinglePageist(this.listQuery)
        this.list = res.data
        this.total = res.totalCount
        this.isLoading = false
      } catch (err) {
        // err
      }
    },
    handleAdd(data) {
      this.$refs.addForm.show(data)
    },
    async handleDelete(data) {
      try {
        await this.$confirm('此操作将永久删除该内容, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await deleteSinglePage(data.pageId)
        this.$message({
          type: 'success',
          message: '删除成功!'
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
.add_btn {
  margin: 30px 0;
}
</style>
