import http from '../../utils/http'

export function selectAll () {
  return http({
    url: '/task/selectAll',
    method: 'get'
  })
}

export function addTask (data) {
  return http({
    url: '/task/addTask',
    method: 'post',
    data: data
  })
}

export function selectChildren (data) {
  return http({
    url: '/task/selectChildren',
    method: 'get',
    params: data
  })
}

export function updateTask (data) {
  return http({
    url: '/task/updateTask',
    method: 'put',
    data: data
  })
}
