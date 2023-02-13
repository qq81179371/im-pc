<template>
  <div class="input_suffix">
    <span class="label">搜索: </span>
    <el-input
      v-model="listQuery.kw"
      placeholder="序列号/DPK/密钥"
      size="small"
      @keyup.enter="handleRefresh"
      @clear="handleRefresh"
      clearable
    ></el-input>
  </div>
  <div class="add_list">
    <el-button class="add_btn" type="primary" @click="handleAdd()" size="small">
      导入
    </el-button>
    <el-button
      class="add_btn ml_30"
      type="danger"
      @click="handleDeleteAll()"
      size="small"
      :disabled="!selectList.length"
    >
      批量删除
    </el-button>
  </div>
  <el-table
    :data="list"
    border
    size="small"
    v-loading="isLoading"
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" width="55" />
    <el-table-column prop="keyId" label="秘钥ID"> </el-table-column>
    <el-table-column prop="secretKeyText" label="密钥"> </el-table-column>
    <el-table-column prop="dpkText" label="DPK"> </el-table-column>
    <el-table-column prop="isUse" label="是否可用">
      <template #default="scope">
        {{ scope.row.isUse ? "是" : "否" }}
      </template>
    </el-table-column>
    <el-table-column prop="useTime" label="使用时间"> </el-table-column>
    <el-table-column prop="created" label="添加时间"> </el-table-column>
    <el-table-column prop="deviceName" label="关联设备号"></el-table-column>
    <el-table-column label="操作" width="100px">
      <template #default="scope">
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
import { getSecretKeyList, deleteSecretKey, deleteSecretKeyAll } from '@/api/secretKey'
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
        const res = await getSecretKeyList(this.listQuery)
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
    async handleDeleteAll() {
      try {
        await this.$confirm('此操作将永久删除已选密钥, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await deleteSecretKeyAll(this.selectList.map((v) => v.keyId))
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.handleRefresh()
      } catch (err) {
        // err
      }
    },
    async handleDelete(data) {
      try {
        await this.$confirm('此操作将永久删除该密钥, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await deleteSecretKey(data.keyId)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.handleRefresh()
      } catch (err) {
        // err
      }
    },
    handleAdd() {
      this.$refs.addForm.show()
    }
  }
}
</script>

<style lang="scss" scoped>
.add_btn {
  margin: 30px 0;
  &.ml_30 {
    margin-left: 30px;
  }
}
.ad_img {
  max-width: 200px;
  max-height: 200px;
}
</style>
