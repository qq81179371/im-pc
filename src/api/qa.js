import request from '@/utils/request'

export function getQuestionList(params) {
  return request({
    url: '/Question',
    method: 'GET',
    params
  })
}

export function getQuestionDetail(data) {
  return request({
    url: '/Question',
    method: 'GET',
    data
  })
}

export function editQuestion(data) {
  return request({
    url: '/Question',
    method: 'PUT',
    data
  })
}
export function removeQuestion(id) {
  return request({
    url: `/Question/${id}`,
    method: 'DELETE'
  })
}
