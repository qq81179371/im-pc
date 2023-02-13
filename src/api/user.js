import request from '@/utils/request'

export function getUser(params) {
  return request({
    url: '/Account',
    method: 'GET',
    params
  })
}
export function deleteUser(data) {
  return request({
    url: '/Account',
    method: 'DELETE',
    data
  })
}
