import request from '@/utils/request'

export function getSecretKeyList(params) {
  return request({
    url: '/SecretKey',
    method: 'GET',
    params
  })
}

export function addDrive(data) {
  return request({
    url: '/SecretKey',
    method: 'POST',
    data
  })
}

export function deleteSecretKey(id) {
  return request({
    url: `/SecretKey/${id}`,
    method: 'DELETE'
  })
}
export function deleteSecretKeyAll(data) {
  return request({
    url: '/SecretKey',
    method: 'DELETE',
    data
  })
}

export function importSecretKey(data) {
  return request({
    url: '/SecretKey',
    method: 'POST',
    data
  })
}
