import request from '@/utils/request'

export function getAccountCode(data) {
  return request({
    url: '/Account/code',
    method: 'POST',
    data
  })
}
export function submitAccountRegister(data) {
  return request({
    url: '/Account/register',
    method: 'POST',
    data
  })
}
export function userLogin(data) {
  return request({
    url: '/Account/login',
    method: 'POST',
    data
  })
}
