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
  <el-button class="add_btn mr_30" type="danger" @click="handleAdd()" size="small">
    批量删除
  </el-button>
  <el-button class="add_btn mr_30" type="primary" @click="handleAdd()" size="small">
    导出
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
      label="序号"
    ></el-table-column>
    <el-table-column prop="snCode" label="序列号"> </el-table-column>
    <el-table-column prop="specification" label="机型"> </el-table-column>
    <el-table-column prop="deviceCode" label="订单号"> </el-table-column>
    <el-table-column prop="cpu" label="CPU"> </el-table-column>
    <el-table-column prop="screen" label="屏"> </el-table-column>
    <el-table-column prop="ram" label="内存"> </el-table-column>
    <el-table-column prop="hardDisk" label="硬盘"> </el-table-column>
    <!-- <el-table-column prop="nickName" label="客户手机号"> </el-table-column> -->
    <el-table-column prop="nickName" label="邮箱"> </el-table-column>
    <el-table-column prop="accountName" label="账户名"> </el-table-column>
    <el-table-column prop="nickName" label="昵称"> </el-table-column>
    <el-table-column prop="registerTime" label="注册时间"> </el-table-column>
    <el-table-column prop="registerIP" label="注册IP"> </el-table-column>
    <el-table-column prop="areaData" label="注册地址"> </el-table-column>
    <!-- <el-table-column prop="nickName" label="国家"> </el-table-column> -->
    <el-table-column prop="lastLoginTime" label="最后登录时间"> </el-table-column>
    <el-table-column prop="useTime" label="服务时长"> </el-table-column>
    <!-- <el-table-column prop="nickName" label="反馈问题"> </el-table-column> -->
    <el-table-column prop="qrCodeUrl" label="二维码地址"> </el-table-column>
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
</template>

<script>
import { getDeviceList, deleteDevice, deleteDeviceAll } from '@/api/device'
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
        const res = await getDeviceList(this.listQuery)
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
    async handleDelete(data) {
      try {
        await this.$confirm('此操作将永久删除该设备, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        const request = data ? deleteDevice : deleteDeviceAll
        await request(data ? data.deviceId : this.selectList)
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
.mr_30 {
  margin-right: 30px;
}
.el-table {
  max-width: 100%;
}
</style>
