import request from '@/utils/request'

export function getManualList(params) {
  return request({
    url: '/Manual',
    method: 'GET',
    params
  })
}

export function getManualTypelList(params) {
  return request({
    url: '/Manual/classification/page',
    method: 'GET',
    params
  })
}
export function getManualTypelAll() {
  return request({
    url: '/Manual/classification',
    method: 'GET'
  })
}

export function addManualType(params) {
  return request({
    url: '/Manual/classification',
    method: 'POST',
    params
  })
}
export function updateManualType(params) {
  return request({
    url: '/Manual/classification',
    method: 'PUT',
    params
  })
}
export function deleteManualType(id) {
  return request({
    url: `/Manual/classification/${id}`,
    method: 'DELETE'
  })
}

export function addManual(data) {
  return request({
    url: '/Manual',
    method: 'POST',
    data
  })
}

export function deleteManual(id) {
  return request({
    url: `/Manual/${id}`,
    method: 'DELETE'
  })
}

export function updateManual(data) {
  return request({
    url: '/Manual',
    method: 'PUT',
    data
  })
}

export function exportOrder(id) {
  return request({
    url: `/OrderForm/export/${id}`,
    method: 'POST'
  })
}
