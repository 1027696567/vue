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

export function addItemInfo (data) {
  return http({
    url: '/company/addItemInfo',
    method: 'post',
    data: data
  })
}

export function selectAllItemInfo (data) {
  return http({
    url: '/company/selectAllItemInfo',
    method: 'get'
  })
}

export function updateItemInfo (data) {
  return http({
    url: '/company/updateItemInfo',
    method: 'put',
    data: data
  })
}

export function selectUserCompanyInfo (data) {
  return http({
    url: '/company/selectUserCompanyInfo',
    method: 'get',
    params: data
  })
}

export function addTenderInfo (data) {
  return http({
    url: '/company/addTender',
    method: 'post',
    data: data
  })
}

export function verityTender (data) {
  return http({
    url: '/company/verityTender',
    method: 'get',
    params: data
  })
}

export function deleteItemInfo (data) {
  return http({
    url: '/company/deleteItemInfo',
    method: 'delete',
    params: data
  })
}

export function selectTenderTable (data) {
  return http({
    url: '/company/selectTenderTable',
    method: 'get',
    params: data
  })
}

export function selectAllNoticeInfo () {
  return http({
    url: '/company/selectNoticeInfo',
    method: 'get'
  })
}

export function insertNoticeInfo (data) {
  return http({
    url: '/company/insertNoticeInfo',
    method: 'post',
    data: data
  })
}

export function updateNoticeInfo (data) {
  return http({
    url: '/company/updateNoticeInfo',
    method: 'put',
    data: data
  })
}

export function selectNoticeForm (data) {
  return http({
    url: '/company/selectNoticeForm',
    method: 'get',
    params: data
  })
}

export function selectNoticeForms (data) {
  return http({
    url: '/company/selectNoticeForms',
    method: 'get',
    params: data
  })
}

export function selectFinish (data) {
  return http({
    url: '/company/selectFinish',
    method: 'get'
  })
}
