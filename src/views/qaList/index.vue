<template>
  <div class="input_suffix">
    <span class="label">设备号: </span>
    <el-input
      v-model="listQuery.kw"
      placeholder="请输入内容"
      @keyup.enter="handleRefresh"
      @clear="handleRefresh"
      size="small"
      clearable
    ></el-input>
    <span class="label ml_30">负责人: </span>
    <el-select
      v-model="listQuery.adminId"
      size="small"
      placeholder="请选择"
      @change="handleRefresh"
      @clear="handleRefresh"
      clearable
    >
      <el-option
        v-for="item in adminOptions"
        :key="item.adminId"
        :label="item.nickName"
        :value="item.adminId"
      >
      </el-option>
    </el-select>
    <span class="label ml_30">时间段: </span>
    <el-date-picker
      size="small"
      v-model="time"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      value-format="YYYY-MM-DD"
    >
    </el-date-picker>
  </div>
  <el-button
    class="add_btn"
    type="primary"
    @click="handleExport()"
    size="small"
  >
    导出
  </el-button>
  <el-table
    :data="list"
    border
    size="small"
    v-loading="isLoading"
    @filter-change="handleFilterTag"
    :default-sort="{ prop: 'created', order: 'descending' }"
  >
    <el-table-column
      prop="questionId"
      width="70px"
      label="问题ID"
    ></el-table-column>
    <el-table-column prop="deviceId" label="设备号"> </el-table-column>
    <el-table-column prop="contactMethod" label="联系方式"> </el-table-column>
    <el-table-column prop="typeName" label="服务类别"> </el-table-column>
    <el-table-column prop="title" label="问题描述"> </el-table-column>
    <el-table-column prop="contents" label="详细描述"> </el-table-column>
    <el-table-column
      prop="stateCode"
      column-key="stateCode"
      :filters="qaOptions"
      :filter-multiple="false"
      label="问题状态"
    >
      <template #default="scope">
        {{
          scope.row.stateCode &&
          qaOptions.find((v) => v.value === scope.row.stateCode).text
        }}
      </template>
    </el-table-column>
    <el-table-column prop="adminName" label="负责人"> </el-table-column>
    <el-table-column prop="created" label="添加时间"> </el-table-column>
    <el-table-column prop="created" label="客户评分"> </el-table-column>
    <el-table-column
      prop="solveState"
      column-key="solveState"
      :filter-multiple="false"
      :filters="solveOptions"
      label="服务状态"
    >
      <template #default="scope">
        {{
          scope.row.solveStateCode &&
          solveOptions.find((v) => v.value === scope.row.solveStateCode).text
        }}
      </template>
    </el-table-column>
    <el-table-column label="操作" width="100px">
      <template #default="scope">
        <el-button
          @click="handleJumpDetails(scope.row)"
          type="text"
          size="small"
          >详情</el-button
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
  <qaDetails ref="qaDetails" />
</template>

<script>
import { getQuestionList } from '@/api/qa'
import refresh from '@/utils/refresh'
import { getManagerAccountList } from '@/api/admin'
import qaDetails from './details.vue'

export default {
  mixins: [refresh],
  components: {
    qaDetails
  },
  data() {
    return {
      time: '',
      isLoading: false,
      adminOptions: [],
      listQuery: {
        kw: '',
        stateCode: null,
        page: 1,
        pageSize: 10,
        beginTime: '',
        adminId: '',
        endTime: '',
        solveState: ''
      },
      qaOptions: [
        {
          text: '已关闭',
          value: 0
        },
        {
          text: '待处理',
          value: 1
        },
        {
          text: '待补充',
          value: 2
        },
        {
          text: '已完结',
          value: 10
        },
        {
          text: '新提问',
          value: 100
        }
      ],
      solveOptions: [
        {
          text: '未解决',
          value: 0
        },
        {
          text: '已解决',
          value: 1
        }
      ],
      list: []
    }
  },
  mounted() {
    this.getList()
    this.getInitAdmin()
  },
  watch: {
    time(val) {
      if (val) {
        // eslint-disable-next-line prefer-destructuring
        this.listQuery.beginTime = val[0]
        // eslint-disable-next-line prefer-destructuring
        this.listQuery.endTime = val[1]
      } else {
        this.listQuery.beginTime = ''
        this.listQuery.endTime = ''
      }
      this.getList()
    }
  },
  methods: {
    handleExport() {},
    handleFilterTag(data) {
      const value = data[Object.keys(data)[0]]
      // eslint-disable-next-line prefer-destructuring
      this.listQuery[Object.keys(data)[0]] = value[0]
      this.getList()
    },
    async getInitAdmin() {
      try {
        const res = await getManagerAccountList({
          kw: '',
          page: 1,
          pageSize: 1000
        })
        this.adminOptions = res.data
      } catch (err) {
        // err
      }
    },
    async getList() {
      try {
        this.isLoading = true
        const res = await getQuestionList(this.listQuery)
        this.list = res.data
        this.total = res.totalCount
        this.isLoading = false
      } catch (err) {
        // err
      }
    },
    handleJumpDetails(data) {
      this.$refs.qaDetails.show(data)
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
