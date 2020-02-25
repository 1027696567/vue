import http from '../utils/http'
const api = {
  login (username, password) {
    let url = 'userLogin/?userName=' + username + '&passWord=' + password
    return http.get(url)
  },
  getMenu () {
    let url = 'menu/list'
    return http.get(url)
  }
}
export function getUserList () {
  return http({
    url: 'menu/userList',
    method: 'get'
  })
}
export function deleteUser (userId) {
  return http({
    url: 'user/delete?userId=' + userId,
    method: 'put'
  })
}

export function getLogList (data) {
  return http({
    url: '/log/getLogList',
    method: 'get'
  })
}

export function register (data) {
  return http({
    url: '/register',
    method: 'post',
    data: data
  })
}

export function updateRole (data) {
  return http({
    url: '/updateRole',
    method: 'put',
    data: data
  })
}
export default api
