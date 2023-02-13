import * as signalR from '@aspnet/signalr'
// import { resolveComponent } from 'vue'

/*
 * {
 *   "ReceiveAccountId":null,
 *    MessageType: 0,
 *   "SendAccount":{
 *   "AccountId":null,
 *   "AccountName":null,
 *   "NickName":null,
 *   "HeadUrl":null,
 *   "AccountType":null,
 *   "State":0,
 *   "AccessState":null
 *   },
 *   "MessageBody":{
 *   "MsgId":null,
 *   "MsgType":0,
 *   "Contents":null
 *   }
 *   }
 */

const url = 'http://chat.jumper.com.cn/chat'
let connection = ''
connection = new signalR.HubConnectionBuilder()
  .withUrl(url, {
    skipNegotiation: true,
    transport: signalR.HttpTransportType.WebSockets
  })
  .configureLogging(signalR.LogLevel.Information)
  .build()

const sendMessage = (params, callback) => {
  connection.invoke('ServerTransferMessage', JSON.stringify(params)).then(() => {
    callback()
  }).catch((err) => console.error(err))
}

const wsStart = async(params, fn) => {
  connection.on('ReceiveMessage', (message) => {
    fn(message)
  })
  await connection.start()
  sendMessage(params, () => {})
}

/*
 * const handleClose = () => {
 *   connection.onclose((error) => {
 *     console.log(error)
 *   })
 * }
 */
/*
 * connection.onreconnecting((error) => {
 *   console.log(error)
 * })
 * connection.onreconnected((connectionId) => {
 *   console.log(connectionId)
 * })
 */

export {
  wsStart,
  sendMessage
  // handleClose
}
