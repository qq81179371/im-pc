import request from '@/utils/request'

export function getOrderFormList(params) {
  return request({
    url: '/OrderForm',
    method: 'GET',
    params
  })
}

export function addOrder(data) {
  return request({
    url: '/OrderForm',
    method: 'POST',
    data
  })
}

export function deleteOrder(id) {
  return request({
    url: `/OrderForm/${id}`,
    method: 'DELETE'
  })
}

export function updateOrder(data) {
  return request({
    url: '/OrderForm',
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
