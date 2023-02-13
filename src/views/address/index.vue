<template>
  <div class="add">
    <span>地区管理</span>
    <el-button type="primary" size="small" @click="handleAddArea()">
      新增
    </el-button>
  </div>
  <el-tree
    :data="list"
    node-key="areaId"
    :load="getList"
    lazy
    :props="props"
    ref="areaDom"
    :expand-on-click-node="false"
  >
    <template #default="{ node, data }">
      <span class="custom-tree-node">
        <div class="label">{{ node.label }}</div>
        <div class="btn">
          <el-button
            type="text"
            icon="el-icon-edit"
            @click="editArea(data)"
          ></el-button>
          <el-button
            v-if="node.level === 1"
            type="text"
            icon="el-icon-plus"
            @click="handleAddArea(data)"
          ></el-button>
          <el-button
            type="text"
            icon="el-icon-delete"
            @click="handleRemoveArea(node, data)"
          ></el-button>
        </div>
      </span>
    </template>
  </el-tree>
</template>

<script>
import {
  getAreaList, addArea, editArea, removeArea
} from '@/api/area'

export default {
  data() {
    return {
      props: {
        label: 'areaName',
        children: 'children',
        isLeaf: 'leaf'
      },
      node_had: null,
      resolve_had: null,
      listQuery: {
        areaId: 0,
        areaName: '',
        parentId: 0
      },
      list: []
    }
  },
  methods: {
    async getList(node, resolve) {
      try {
        if (node.level === 0) {
          this.node_had = node
          this.resolve_had = resolve
          const res = await getAreaList(this.listQuery)
          return resolve(res.data)
        }
        if (node.level === 1) {
          const res = await getAreaList({
            ...this.listQuery,
            areaName: node.data.areaName,
            parentId: node.data.areaId
          })
          return resolve(res.data.map((v) => ({
            ...v,
            leaf: true
          })))
        }
        if (node.level > 1) {
          return resolve([])
        }
      } catch (err) {
        // err
      }
    },
    async handleAddArea(data) {
      try {
        const { value } = await this.$prompt('请输入地址名称', '添加', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValidator: (v) => !!v
        })
        await addArea({
          areaName: value,
          parentId: data ? data.areaId : 0
        })
        this.$message({
          type: 'success',
          message: '添加成功'
        })
        this.list = []
        this.getList(this.node_had, this.resolve_had)
      } catch (err) {
        // err
      }
    },
    async editArea(data) {
      try {
        const area = data
        const { value } = await this.$('请输入地址名称', '编辑', {
          confirmButtonText: '确定',
          inputValue: data.areaName,
          cancelButtonText: '取消',
          inputValidator: (v) => !!v
        })
        await editArea({
          areaId: data.areaId,
          areaName: value,
          parentId: data.areaId
        })
        area.areaName = value
        this.$message({
          type: 'success',
          message: '编辑成功'
        })
      } catch (err) {
        // err
      }
    },
    async handleRemoveArea(node, data) {
      try {
        await this.$confirm('此操作将永久删除该地址, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await removeArea(data.areaId)
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        this.$refs.areaDom.remove(node)
      } catch (err) {
        // err
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.add {
  width: 800px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}
.el-tree {
  width: 800px;
  .custom-tree-node {
    width: 100%;
    display: flex;
    align-items: center;
    .label {
      flex: 1;
    }
    .btn {
      .el-button {
        margin: 0 15px;
      }
    }
  }
}
</style>
