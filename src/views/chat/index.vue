<template>
  <div class="home_wrap">
    <!-- <userList :list="list" :curr
    entChat="currentChat" @handleChangeChat="handleChangeChat"/> -->
    <chatRoom ref="chatRoom" :currentTypeId="currentTypeId" />
    <serveSupport />
  </div>
</template>

<script>
import { getChatServiceList } from '@/api/index'
// import userList from './components/userList.vue'
import chatRoom from './components/chatRoom.vue'
import serveSupport from './components/serveSupport.vue'

export default {
  components: {
    chatRoom,
    // userList,
    serveSupport
  },
  data() {
    return {
      currentTypeId: 1,
      list: [],
      currentChat: {}
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      try {
        const res = await getChatServiceList()
        this.list = res.data.map((v) => ({
          ...v,
          accountId: v.id,
          nickName: v.classifyName,
          headUrl: v.imgUrl
        }))
        // eslint-disable-next-line prefer-destructuring
        this.currentChat = this.list[0]
        this.$nextTick(() => {
          this.$refs.chatRoom.init(this.currentChat)
        })
      } catch (err) {
        // err
      }
    },
    async handleUpdateList() {
      try {
        const res = await getChatServiceList()
        this.list = res.data.map((v) => ({
          ...v,
          accountId: v.id,
          nickName: v.classifyName,
          headUrl: v.imgUrl
        }))
        // eslint-disable-next-line prefer-destructuring
        // this.currentChat = this.list[0]
        // this.$nextTick(() => {
        //   this.$refs.chatRoom.init(this.currentChat)
        // })
      } catch (err) {
        // err
      }
    },
    handleChangeChat(data) {
      this.currentChat = data
      this.currentTypeId = data.accountId
      this.$nextTick(() => {
        this.$refs.chatRoom.handleChangeChat(this.currentChat)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.home_wrap {
  height: calc(100vh - 100px);
  background: #f2f2f2;
  display: flex;
}
</style>
