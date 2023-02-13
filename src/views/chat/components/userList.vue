<template>
  <div class="usre_list">
    <div
      class="item"
      v-for="item in list"
      :class="{ active: item.accountId === currentChat.accountId }"
      :key="item.accountId"
      @click="handleCurrentUser(item)"
    >
      <div class="lf">
        <img class="avatar" v-img :src="item.headUrl" alt="" />
        <div class="name">
          <p>{{ item.nickName }}</p>
          <span :class="{ online:  item.serviceLineCount }"
            >({{
              item.serviceLineCount ? "在线" : "离线"
            }})</span
          >
        </div>
      </div>
      <div class="rg">
        <div class="icon" :class="{ msg: item % 2 === 0 }">
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { getChatServiceList } from '@/api/index'

export default {
  props: {
    list: Array,
    currentChat: Object
  },
  // data() {
  //   return {
  //     list: []
  //   }
  // },
  // mounted() {
  //   this.init()
  // },
  methods: {
    handleCurrentUser(item) {
      if (item.accountId !== this.currentChat.accountId) {
        this.$emit('handleChangeChat', item)
      }
    }
    //   async init() {
    //     try {
    //       const res = await getChatServiceList()
    //       this.list = res.data
    //     } catch (err) {
    //       // err
    //     }
    //   }
  }
}
</script>

<style lang="scss" scoped>
.usre_list {
  width: 300px;
  .item {
    display: flex;
    align-items: center;
    background: #fff;
    padding: 10px;
    cursor: pointer;
    justify-content: space-between;
    .lf {
      display: flex;
      align-items: center;
      .avatar {
        width: 60px;
        height: 60px;
        border-radius: 10px;
        margin-right: 10px;
      }
      .name {
        height: 50px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        p {
          font-size: 16px;
          font-weight: 700;
          color: #2d2d2d;
        }
        span {
          font-size: 16px;
          font-weight: 400;
          color: #7d7d7d;
          &.online {
            color: #009a24;
          }
        }
      }
    }
    .rg {
      padding: 0 10px 0;
      .icon {
        i {
          font-size: 20px;
          color: #2d2d2d;
        }
        &.msg {
          position: relative;
          &::before {
            position: absolute;
            content: "";
            width: 12px;
            height: 12px;
            background: #ff0000;
            border-radius: 50%;
            top: 50%;
            margin-top: -6px;
            left: -15px;
          }
        }
      }
    }
    &.active, &:hover {
      background: rgba(0, 101, 179, 0.1);
    }
  }
}
</style>
