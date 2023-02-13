<template>
  <div class="serve_wrap">
    <div
      class="item"
      v-for="item in list"
      :key="item"
      @click="handleListClick(item)"
    >
      <p>{{ item.name }}</p>
      <i class="el-icon-arrow-right"></i>
    </div>
  </div>
  <Driver ref="driver" />
  <Manual ref="manual" />
</template>

<script>
import Driver from './Driver.vue'
import Manual from './Manual.vue'

export default {
  components: {
    Manual,
    Driver
  },
  data() {
    return {
      list: [
        {
          name: '说明书下载',
          type: 1
        },
        {
          name: '驱动下载',
          type: 2
        },
        {
          name: '产品促销',
          type: 3
        },
        {
          name: '中柏官网',
          type: 4
        }
      ]
    }
  },
  // mounted() {
  //   this.init()
  // },
  methods: {
    handleListClick(item) {
      if (item.type === 1) {
        this.$refs.manual.show()
      }
      if (item.type === 2) {
        this.$refs.driver.show()
      }
    }
    //   async init() {
    //   }
  }
}
</script>

<style lang="scss" scoped>
.serve_wrap {
  width: 300px;
  height: 100%;
  background: #fff;
  .item {
    height: 60px;
    background: #ffffff;
    border: 1px solid #f2f2f2;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    color: #2d2d2d;
    cursor: pointer;
    i {
      font-size: 20px;
    }
    &:hover {
      p,
      i {
        color: #0071c4;
      }
    }
  }
}
</style>
