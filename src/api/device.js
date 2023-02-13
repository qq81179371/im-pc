import request from '@/utils/request'

export function getDeviceList(params) {
  return request({
    url: '/Device',
    method: 'GET',
    params
  })
}

export function addDevice(data) {
  return request({
    url: '/Device',
    method: 'POST',
    data
  })
}

export function deleteDevice(id) {
  return request({
    url: `/Device/${id}`,
    method: 'DELETE'
  })
}

export function deleteDeviceAll(data) {
  return request({
    url: '/Device',
    method: 'DELETE',
    data
  })
}
