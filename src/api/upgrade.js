import request from '@/utils/request'

export function getUpgradeList(params) {
  return request({
    url: '/Upgrade',
    method: 'GET',
    params
  })
}

export function addUpgrade(data) {
  return request({
    url: '/Upgrade',
    method: 'POST',
    data
  })
}

export function deleteUpgrade(id) {
  return request({
    url: `/Upgrade/${id}`,
    method: 'DELETE'
  })
}

export function updateUpgrade(data) {
  return request({
    url: '/Upgrade',
    method: 'PUT',
    data
  })
}
