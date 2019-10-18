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
export default api
