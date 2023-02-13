const refresh = {
  data() {
    return {
      total: 0
    }
  },
  methods: {
    handleRefresh() {
      this.getList()
    },
    handleSizeChange(size) {
      this.listQuery.pageSize = size
      this.handleRefresh()
    },
    handleCurrentChange(size) {
      this.listQuery.page = size
      this.handleRefresh()
    }
  }
}

export default refresh
