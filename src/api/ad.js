import request from '@/utils/request'

export function getAdList(params) {
  return request({
    url: '/Advertise',
    method: 'GET',
    params
  })
}

export function addAd(data) {
  return request({
    url: '/Advertise',
    method: 'POST',
    data
  })
}

export function deleteAd(id) {
  return request({
    url: `/Advertise/${id}`,
    method: 'DELETE'
  })
}

export function updateAd(data) {
  return request({
    url: '/Advertise',
    method: 'PUT',
    data
  })
}
