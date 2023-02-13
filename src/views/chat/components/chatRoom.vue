<template>
  <div class="chat_wrap">
    <div class="wxchat-container" ref="wxchatContainer" @scroll="handleScroll">
      <div v-for="item in msgList" :key="item" class="message">
        <p class="time" v-if="item.id % 2 === 0">
          <i></i>
          <span v-html="item.ctime"></span>
          <i></i>
        </p>
        <div :class="'main' + (item.location === 2 ? ' self' : '')">
          <img class="avatar" v-img :src="item.chatAccount.headUrl" />
          <div class="info">
            <div class="name">
              <p>{{ item.chatAccount.nickName }}</p>
              <span>{{ item.chatContent.sendTime }}</span>
            </div>
            <div
              class="text"
              v-if="item.chatContent.msgType === 1"
              v-text="item.chatContent.contents"
            ></div>
            <div class="text _img" v-else-if="item.chatContent.msgType === 2">
              <img :src="item.content" class="image" alt="聊天图片" v-img />
            </div>
          </div>
        </div>
        <div class="rate_wrap" v-if="isOver">
          <h4>请对此次服务是否满意做出评价！</h4>
          <el-rate v-model="rate" show-text :texts="rateText"></el-rate>
          <el-button size="mini" @click="handleSubmitRate">提交评价</el-button>
        </div>
        <p class="time" v-if="isOver">
          <i></i>
          <span>会话结束</span>
          <i></i>
        </p>
      </div>
    </div>
    <wcim-tab-bar @handleSendMessage="handleSendMessage" ref="wcimTabBar" />
  </div>
</template>

<script>
import { wsStart, sendMessage } from '@/utils/chat'
import { mapActions, mapGetters } from 'vuex'
import { submitRate, initSession, getMsgList } from '@/api'
import wcimTabBar from './wcimTabBar.vue'

export default {
  components: {
    wcimTabBar
  },
  props: {
    currentTypeId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      connectedList: [],
      isOver: false,
      rate: 3,
      state: {
        loading: false,
        finished: false,
        refreshing: false
      },
      msgList: [],
      rateText: ['非常差', '差', '一般', '满意', '非常满意'],
      currentChat: {},
      currentAccountId: null,
      listQuery: {
        source: 2,
        kw: '',
        page: 1,
        pageSize: 20
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  async mounted() {
    try {
      const res = await initSession({
        ...this.userInfo
      })
      this.currentChat = res.data
      this.fetchMsgList(true)
    } catch (err) {
      // err
    }
  },
  methods: {
    ...mapActions({
      handleSetChat: 'chat/setChatData',
      handleAddChat: 'chat/addChatData'
    }),
    async fetchMsgList(refresh) {
      try {
        const msg = await getMsgList({
          ...this.listQuery
        }, this.userInfo.accountId)
        this.msgList = msg.data
        if (refresh) {
          this.$nextTick(() => {
            this.$refs.wxchatContainer.scrollTop =
            this.$refs.wxchatContainer.scrollHeight
          })
        }
      } catch (err) {
        // err
      }
    },
    handleScroll(e) {
      // 加定时器进行节流
      setTimeout(() => {
        if (e.target.scrollTop === 0 && this.count > this.msgList.length && !this.loadingList) {
          // 将scrollTop置为10以便下次滑到顶部
          e.target.scrollTop = 10
          // 加载数据
          this.page += 1
          this.fetchMsgList()
        }
      }, 500)
    },
    // handleScroll() {
    //   console.log(this.$refs.wxchatContainer.scrollTop)
    //   this.$refs.wxchatContainer.scrollTop
    // },
    init() {
      this.$nextTick(() => {
        // this.currentChat = data
        // this.handleSetChat({ ...this.currentChat, list: [...this.wxChatData] })
        const params = {
          ReceiveAccountId: this.currentChat.serviceId,
          MessageType: 1,
          SendAccount: {
            AccountId: this.userInfo.accountId,
            AccountName: this.userInfo.accountName,
            NickName: this.userInfo.nickName,
            HeadUrl: this.userInfo.headUrl,
            AccountType: 2,
            State: 0,
            AccessState: this.userInfo.accessState
          },
          MessageBody: {
            MsgId: this.guid(),
            MsgType: 0,
            Contents: '',
            SendTime: new Date().toLocaleString()
          }
        }
        wsStart(params, (msg) => {
          const newMsg = JSON.parse(msg)
          console.log(newMsg)
          if (newMsg.MessageType === 0) {
            this.msgList.push({
              location: 1,
              chatAccount: {
                nickName: newMsg.SendAccount.NickName,
                headUrl: newMsg.SendAccount.HeadUrl,
                accountType: newMsg.SendAccount.AccountType
              },
              chatContent: {
                contents: newMsg.MessageBody.Contents,
                sendTime: newMsg.MessageBody.SendTime,
                msgType: newMsg.MessageBody.MsgType
              }
            })
          }
          // if (newMsg.MessageType === 2) {
          //   this.$emit('handleAccountState', newMsg.ReceiveAccountId)
          // }
          // const msgArr = [3, 4, 6, 7, 8]
          // if (msgArr.some((v) => v === newMsg.MessageType)) {
          //   this.$parent.handleUpdateList()
          // }
          if (newMsg.MessageType === 6) {
            this.isOver = true
          }
          // if (newMsg.MessageType === 8) {
          //   this.currentAccountId = newMsg.SendAccount.AccountId
          //   sessionStorage.setItem(
          //     'currentAccountIdObj',
          //     JSON.stringify({
          //       [this.currentTypeId]: this.currentAccountId
          //     })
          //   )
          // }
          this.$nextTick(() => {
            this.$refs.wxchatContainer.scrollTop =
            this.$refs.wxchatContainer.scrollHeight
          })
        })
      })
    },
    handleChangeChat(data) {
      this.$nextTick(() => {
        this.currentChat = data
        const currentAccountIdObj = JSON.parse(sessionStorage.getItem('sessionStorage'))
        const isPrototypeOfId = Object.prototype.isPrototypeOf.call(
          currentAccountIdObj,
          this.currentTypeId
        )
        console.log(
          currentAccountIdObj,
          isPrototypeOfId,
          this.currentTypeId,
          this.connectedList
        )
        if (
          (this.currentTypeId === 1 || this.currentTypeId === 2) &&
          !this.connectedList.some((v) => v === this.currentTypeId) &&
          !isPrototypeOfId
        ) {
          const params = {
            ReceiveAccountId: this.currentTypeId,
            MessageType: 7,
            SendAccount: {
              AccountId: this.userInfo.accountId,
              AccountName: this.userInfo.accountName,
              NickName: this.userInfo.nickName,
              HeadUrl: this.userInfo.headUrl,
              AccountType: 2,
              State: 0,
              AccessState: null
            },
            MessageBody: {
              MsgId: this.guid(),
              MsgType: 0,
              Contents: '',
              SendTime: new Date().toLocaleString()
            }
          }
          sendMessage(params, () => {
            this.connectedList.push(this.currentTypeId)
          })
        } else if (isPrototypeOfId) {
          this.connectedList.push(this.currentTypeId)
          this.currentAccountId = currentAccountIdObj[this.currentTypeId]
        }
        this.handleSetChat({ ...this.currentChat, list: [...this.wxChatData] })
      })
    },
    sendMessage(params) {
      sendMessage(params, () => {
        this.msgList.push({
          location: 2,
          chatAccount: {
            nickName: params.SendAccount.NickName,
            headUrl: params.SendAccount.HeadUrl,
            accountType: params.SendAccount.AccountType
          },
          chatContent: {
            contents: params.MessageBody.Contents,
            sendTime: params.MessageBody.SendTime,
            msgType: params.MessageBody.MsgType
          }
        })
        // localStorage.getItem(
        //   this.currentChat.accountId,
        //   JSON.stringify(this.wxChatData)
        // )
        this.$nextTick(() => {
          this.$refs.wxchatContainer.scrollTop =
            this.$refs.wxchatContainer.scrollHeight
        })
      })
    },
    async handleSubmitRate() {
      try {
        await submitRate({
          sessionId: '',
          scoreCount: this.rate
        })
      } catch (err) {
        // err
      }
    },
    guid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0
        const v = c === 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
      })
    },
    getNowTime() {
      let dateTime = null
      const yy = new Date().getFullYear()
      const mm = new Date().getMonth() + 1
      const dd = new Date().getDate()
      const hh = new Date().getHours()
      const mf = new Date().getMinutes() < 10 ?
        `0${new Date().getMinutes()}` :
        new Date().getMinutes()
      const ss = new Date().getSeconds() < 10 ?
        `0${new Date().getSeconds()}` :
        new Date().getSeconds()
      dateTime = `${yy}-${mm}-${dd} ${hh}:${mf}:${ss}`
      return dateTime
    },
    handleSendMessage(message, type) {
      const params = {
        ReceiveAccountId: this.currentChat.serviceId,
        MessageType: 0,
        SendAccount: {
          AccountId: this.userInfo.accountId,
          AccountName: this.userInfo.accountName,
          NickName: this.userInfo.nickName,
          HeadUrl: this.userInfo.headUrl,
          AccountType: 2,
          State: 0,
          AccessState: this.userInfo.accessState
        },
        MessageBody: {
          MsgId: this.guid(),
          MsgType: type,
          Contents: message,
          SendTime: this.getNowTime()
        }
      }
      // if (this.currentAccountId || this.currentTypeId === 0) {
      this.sendMessage(params)
      // } else {
      //   this.$message({
      //     message: '正在等待客服接入中...',
      //     type: 'warning'
      //   })
      // }
    }
  }
}
</script>

<style lang="scss" scoped>
.chat_wrap {
  border: 1px solid #f2f2f2;
  flex: 1;
  height: 100%;
  .wxchat-container {
    -webkit-overflow-scrolling: touch;
    height: calc(100% - 200px);
    overflow: auto;
    background: rgba(0, 101, 179, 0.04);
  }
  .message {
    margin-bottom: 20px;
    left: 0;
    position: relative;
    display: block;
    .main {
      padding: 20px;
      display: flex;
      align-items: flex-start;
    }
    .time {
      margin: 20px 0;
      text-align: center;
      color: #2d2d2d;
      font-size: 12px;
      font-weight: 400;
      display: flex;
      align-items: center;
      justify-content: space-around;
      span {
        margin: 0 5px;
      }
      i {
        flex: 1;
        border-bottom: 1px dashed #ccc;
      }
    }
    .info {
      .name {
        display: flex;
        margin-bottom: 10px;
        p {
          font-size: 14px;
          font-weight: 700;
          color: #2d2d2d;
        }
        span {
          font-size: 12px;
          font-weight: 400;
          color: #7d7d7d;
          margin: 0 16px;
        }
      }
    }
    .text {
      display: inline-block;
      position: relative;
      padding: 7px 10px;
      max-width: 700px;
      min-height: 36px;
      line-height: 20px;
      font-size: 12px;
      text-align: left;
      word-break: break-all;
      background: rgba(0, 101, 179, 0.04);
      color: #2d2d2d;
      border: 1px solid #f2f2f2;
      border-radius: 4px;
      &::before {
        content: " ";
        position: absolute;
        top: 10px;
        right: 100%;
        border: 6px solid transparent;
        border-right-color: rgba(0, 101, 179, 0.04);
      }
      &._img {
        padding: 6px 5px;
        border-radius: 10px;
      }
    }
    .avatar {
      width: 60px;
      height: 60px;
      border-radius: 30px;
      margin: 0 20px 0 0;
      background: #fff;
    }
    .self {
      flex-direction: row-reverse;
      .avatar {
        margin: 0 0 0 20px;
      }
      .text {
        background-color: #89f275;
        &::before {
          right: inherit;
          left: 100%;
          border-right-color: transparent;
          border-left-color: #89f275;
        }
      }
      .info {
        text-align: right;
        .name {
          flex-direction: row-reverse;
        }
      }
    }
    .image {
      display: block;
      max-width: 200px;
    }
    .rate_wrap {
      width: calc(100% - 20px);
      margin: 0 10px;
      background: #fff;
      padding: 15px 0 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .el-rate {
        position: relative;
        margin: 15px 0;
        :deep .el-rate__text {
          position: absolute;
          left: 110%;
          white-space: nowrap;
        }
      }
    }
  }
}
.an-move-left {
  left: 0;
  animation: moveLeft 0.7s ease;
  -webkit-animation: moveLeft 0.7s ease;
}
.an-move-right {
  left: 0;
  animation: moveRight 0.7s ease;
  -webkit-animation: moveRight 0.7s ease;
}
.bgnone {
  background: none;
}
@keyframes moveRight {
  0% {
    left: -20px;
    opacity: 0;
  }
  100% {
    left: 0;
    opacity: 1;
  }
}

@-webkit-keyframes moveRight {
  0% {
    left: -20px;
    opacity: 0;
  }
  100% {
    left: 0px;
    opacity: 1;
  }
}
@keyframes moveLeft {
  0% {
    left: 20px;
    opacity: 0;
  }
  100% {
    left: 0px;
    opacity: 1;
  }
}

@-webkit-keyframes moveLeft {
  0% {
    left: 20px;
    opacity: 0;
  }
  100% {
    left: 0px;
    opacity: 1;
  }
}

@media (max-width: 367px) {
  .fzDInfo {
    width: 82%;
  }
}
.msg {
  text-align: center;
  margin: 10px 0;
  color: #67c23a;
}
</style>
