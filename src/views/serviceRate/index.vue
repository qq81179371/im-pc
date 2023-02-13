<template>
  <div class="input_suffix">
    <span class="label">用户名: </span>
    <el-input
      v-model="input"
      placeholder="请输入内容"
      size="small"
      clearable
    ></el-input>
    <span class="label ml_30">昵称: </span>
    <el-input
      v-model="input"
      placeholder="请输入内容"
      size="small"
      clearable
    ></el-input>
  </div>
  <el-button class="add_btn" type="danger" @click="handleAdd()" size="small">
    批量删除
  </el-button>
  <el-table :data="list" border size="small">
    <el-table-column fixed prop="date" label="日期"> </el-table-column>
    <el-table-column prop="name" label="姓名"> </el-table-column>
    <el-table-column prop="province" label="省份"> </el-table-column>
    <el-table-column prop="city" label="市区"> </el-table-column>
    <el-table-column prop="address" label="地址"> </el-table-column>
    <el-table-column prop="zip" label="邮编"> </el-table-column>
    <el-table-column fixed="right" label="操作">
      <template #default="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small"
          >查看</el-button
        >
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="pagination">
    <span class="label">共400条记录 第1 / 80页</span>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      v-model:currentPage="currentPage"
      background
      :page-sizes="[10, 20, 30]"
      :page-size="10"
      layout="sizes, prev, pager, next"
      :total="400"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getSinglePageist } from '@/api/singlePage'

export default {
  data() {
    return {
      currentPage: 2,
      listQuery: {
        kw: '',
        page: 1,
        pageSize: 10
      },
      list: []
    }
  },
  /*
   * mounted() {
   *   this.getList()
   * },
   */
  methods: {
    async getList() {
      try {
        const res = await getSinglePageist(this.listQuery)
        this.list = res
      } catch (err) {
        // err
      }
    },
    handleSizeChange() {

    },
    handleCurrentChange() {

    },
    handleClick() {

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
