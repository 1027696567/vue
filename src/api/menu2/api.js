import http from '../../utils/http'

export function addContractInfo (data) {
  return http({
    url: '/contract/addContractInfo',
    method: 'post',
    data: data
  })
}

export function addContractDetail (data) {
  return http({
    url: '/contract/addContractDetail',
    method: 'post',
    data: data
  })
}

export function selectAllContractInfo () {
  return http({
    url: '/contract/selectAllContractInfo',
    method: 'get'
  })
}

export function selectChildren (data) {
  return http({
    url: '/contract/selectChildren',
    method: 'get',
    params: data
  })
}

export function selectContractByContractNumber (data) {
  return http({
    url: '/contract/selectContractByContractNumber',
    method: 'get',
    params: data
  })
}

export function selectContractDetailByContractNumber (data) {
  return http({
    url: '/contract/selectContractDetailByContractNumber',
    method: 'get',
    params: data
  })
}

export function updateContractDetail (data) {
  return http({
    url: '/contract/updateContractDetail',
    method: 'post',
    data: data
  })
}

export function deleteContract (data) {
  return http({
    url: '/contract/deleteContract',
    method: 'delete',
    data: data
  })
}
