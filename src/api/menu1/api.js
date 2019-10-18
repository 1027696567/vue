import http from '../../utils/http'

export function selectAllCompanyInfo () {
  return http({
    url: '/company/list',
    method: 'get'
  })
}
