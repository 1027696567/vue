import http from '../../utils/http'

export function selectAll () {
  return http({
    url: '/cost/selectAll',
    method: 'get'
  })
}

export function insertInfo (data) {
  return http({
    url: '/cost/insertInfo',
    method: 'post',
    data: data
  })
}

export function selectCostAccountInfo (data) {
  return http({
    url: '/cost/selectCostAccountInfo',
    method: 'get',
    params: data
  })
}

export function updateCostAccount (data) {
  return http({
    url: '/cost/updateCostAccount',
    method: 'put',
    data: data
  })
}

export function selectChildren (data) {
  return http({
    url: '/cost/selectChildren',
    method: 'get',
    params: data
  })
}

export function updateStatus (data) {
  return http({
    url: '/cost/updateStatus',
    method: 'put',
    data: data
  })
}

export function deleteInfo (data) {
  return http({
    url: '/cost/deleteInfo',
    method: 'delete',
    data: data
  })
}

export function getCostTargetMerge (data) {
  return http({
    url: '/cost/getCostTargetMerge',
    method: 'get',
    params: data
  })
}

export function getCostTargetChildren (data) {
  return http({
    url: '/cost/getCostTargetChildren',
    method: 'get',
    params: data
  })
}

export function insertCostTarget (data) {
  return http({
    url: '/cost/insertCostTarget',
    method: 'post',
    data: data
  })
}

export function updateCostTarget (data) {
  return http({
    url: '/cost/updateCostTarget',
    method: 'put',
    data: data
  })
}

export function selectCostStatement (data) {
  return http({
    url: '/cost/selectCostStatement',
    method: 'get',
    params: data
  })
}

export function selectCostStatementChildren (data) {
  return http({
    url: '/cost/selectCostStatementChildren',
    method: 'get',
    params: data
  })
}

export function insertCostStatement (data) {
  return http({
    url: '/cost/insertCostStatement',
    method: 'post',
    data: data
  })
}

export function updateCostStatement (data) {
  return http({
    url: '/cost/updateCostStatement',
    method: 'put',
    data: data
  })
}
