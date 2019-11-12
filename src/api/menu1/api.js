import http from '../../utils/http'

export function selectAllCompanyInfo () {
  return http({
    url: '/company/list',
    method: 'get'
  })
}

export function getAuthorization () {
  return http({
    url: '/authority',
    method: 'get'
  })
}

export function addInfo (data) {
  return http({
    url: '/company/insert',
    method: 'post',
    data: data
  })
}

export function editInfo (data) {
  return http({
    url: '/company/edit',
    method: 'put',
    data: data
  })
}

export function addVerityInfo (data) {
  return http({
    url: '/company/verity',
    method: 'post',
    data: data
  })
}

export function getVerityInfo (data) {
  return http({
    url: '/company/getVerityInfo',
    method: 'get',
    params: data
  })
}

export function updateVerityInfo (data) {
  return http({
    url: '/company/updateVerityInfo',
    method: 'put',
    data: data
  })
}

export function updateCompanyInfo (data) {
  return http({
    url: '/company/updateCompanyInfo',
    method: 'put',
    params: data
  })
}

export function deleteCompanyInfo (data) {
  return http({
    url: '/company/deleteCompanyInfo',
    method: 'delete',
    params: data
  })
}
