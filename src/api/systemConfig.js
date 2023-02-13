import request from '@/utils/request'

export function getSystemConfig(params) {
  return request({
    url: '/SystemConfig',
    method: 'GET',
    params
  })
}

/*
 * export function addSystemConfig(data) {
 *   return request({
 *     url: '/SystemConfig',
 *     method: 'POST',
 *     data
 *   })
 * }
 */

export function updateSystemConfig(data) {
  return request({
    url: '/SystemConfig',
    method: 'PUT',
    data
  })
}
