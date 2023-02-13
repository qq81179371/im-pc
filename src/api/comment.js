import request from '@/utils/request'

export function uploadImg(data) {
  return request({
    url: '/File',
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    data
  })
}

export function getMaterialDevice(data) {
  return request({
    url: '/Material/device',
    method: 'POST',
    data
  })
}



export function uploadVideo(params) {
  return request({
    url: '/Advertise',
    method: 'GET',
    params
  })
}
