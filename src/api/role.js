import request from '@/utils/request'

export function getRoleList(params) {
  return request({
    url: '/ManagerRole',
    method: 'GET',
    params
  })
}

export function addRole(roleName) {
  return request({
    url: `/ManagerRole/${roleName}`,
    method: 'POST'
  })
}

export function deleteRole(id) {
  return request({
    url: `/ManagerRole/${id}`,
    method: 'DELETE'
  })
}

export function getAuthorization(data) {
  return request({
    url: '/ManagerRole/authorization',
    method: 'POST',
    data
  })
}

export function updateRole(data) {
  return request({
    url: '/ManagerRole',
    method: 'PUT',
    data
  })
}
