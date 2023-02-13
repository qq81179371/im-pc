import request from '@/utils/request'
// 获取单页列表
export function getSinglePageist(params) {
  return request({
    url: '/SinglePage',
    method: 'GET',
    params
  })
}
// 添加单页内容
export function addSinglePage(data) {
  return request({
    url: '/SinglePage',
    method: 'POST',
    data
  })
}
// 更新单页内容
export function putSinglePage(data) {
  return request({
    url: '/SinglePage',
    method: 'PUT',
    data
  })
}
// 获取单页内容详情
export function getSinglePage(id) {
  return request({
    url: `/SinglePage/${id}`,
    method: 'GET'
  })
}

// 删除单页内容
export function deleteSinglePage(id) {
  return request({
    url: `/SinglePage/${id}`,
    method: 'DELETE'
  })
}
