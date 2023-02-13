<template>
  <el-dialog v-model="addShow" width="800px" :show-close="false">
    <template #title>
      <div class="dialog_header">
        <span>详情</span>
        <i class="el-icon-close" @click="addShow = false"></i>
      </div>
    </template>
    <div class="contents">
      <div class="lf">
        <h4>历史问题列表</h4>
        <div class="list">
          <div class="item active">
            <p>2021-0101 16:30 反馈</p>
            <p>负责人: 智能客服</p>
          </div>
          <div class="item">
            <p>2021-0101 16:30 反馈</p>
            <p>负责人: 智能客服</p>
          </div>
          <div class="item">
            <p>2021-0101 16:30 反馈</p>
            <p>负责人: 智能客服</p>
          </div>
        </div>
      </div>
      <div class="rg">
        <div class="item">
          <div class="avatar">
            <img src="" v-img alt="" />
            <h5>客服1</h5>
            <span>2021.02.12 15:12</span>
          </div>
          <div class="desc">
            <img v-img src="" alt="" />
            <p>45454</p>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      addShow: false
    }
  },
  methods: {
    show() {
      this.addShow = true
    }
  }
}
</script>

<style lang="scss" scoped>
.w_200 {
  width: 400px;
}
</style>

<style lang="scss">
.el-overlay {
  .el-dialog {
    .el-dialog__header {
      padding: 0;
    }
    .el-dialog__body {
      padding: 15px;
      min-height: 500px;
    }
  }
}
.contents {
  display: flex;
  align-items: flex-start;
  .lf {
    overflow: auto;
    min-height: 480px;
    padding: 0 30px 0 0;
    h4 {
      font-size: 20px;
      color: #333;
      margin: 0px 0 15px;
    }
    .list {
      .item {
        padding: 5px 20px 5px 10px;
        line-height: 24px;
        border-bottom: 1px solid #f2f2f2;
        p {
          font-size: 14px;
          color: #555;
        }
        &.active {
          background: #f2f2f2;
        }
      }
    }
  }
  .rg {
    min-height: 480px;
    flex: 1;
    overflow: auto;
    border: 1px solid #f3f3f3;
    padding: 15px;
    .item {
      .avatar {
        display: flex;
        align-items: center;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
        }
        h5 {
          font-size: 14px;
          color: #333;
          margin: 0 10px;
        }
        span {
          color: #666;
          font-size: 14px;
        }
      }
      .desc {
        padding: 0 0 0 50px;
        img {
          margin-top: 10px;
          max-width: 80px;
          min-height: 80px;
        }
        p {
          margin-top: 10px;
          color: #666;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
