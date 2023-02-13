import request from '@/utils/request'

export function getDeiveList(params) {
  return request({
    url: '/Drive',
    method: 'GET',
    params
  })
}

export function addDrive(data) {
  return request({
    url: '/Drive',
    method: 'POST',
    data
  })
}

export function deleteDrive(id) {
  return request({
    url: `/Drive/${id}`,
    method: 'DELETE'
  })
}

export function updateDrive(data) {
  return request({
    url: '/Drive',
    method: 'PUT',
    data
  })
}
