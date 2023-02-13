import request from '@/utils/request'

export function getRoleList(params) {
  return request({
    url: '/ManagerRole',
    method: 'GET',
    params
  })
}

// export function getDeviceList(params) {
//   return request({
//     url: '/SinglePage',
//     method: 'GET',
//     params
//   })
// }

export function getDeviceList() {
  return request({
    url: '/Material/device',
    method: 'GET'
  })
}

export function getMaterialManualList() {
  return request({
    url: '/Material/manual',
    method: 'GET'
  })
}

export function getMaterialManualClassList() {
  return request({
    url: '/Material/manual/classification',
    method: 'GET'
  })
}

export function getChatServiceList() {
  return request({
    url: '/Chat/service/classify',
    method: 'GET'
  })
}
export function submitRate(data) {
  return request({
    url: '/Chat',
    method: 'GET',
    data
  })
}
export function updateUserInfo(data) {
  return request({
    url: '/Account',
    method: 'PUT',
    data
  })
}

export function getUserInfo(id) {
  return request({
    url: `/Account/${id}`,
    method: 'GET'
  })
}

export function initSession(data) {
  return request({
    url: '/Session/initiate',
    method: 'POST',
    data
  })
}

export function getMsgList(params, accountId) {
  return request({
    url: `/Chat/records/${accountId}`,
    method: 'GET',
    params
  })
}
