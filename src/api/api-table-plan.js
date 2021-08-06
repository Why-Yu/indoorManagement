import request from '@/utils/request'
import GlobalUrl from '@/utils/GlobalUrl'

export function getPlan(data) {
  return request({
    url: GlobalUrl.prefixUrl + '/indoor-management/Plan/table/data',
    method: 'post',
    data
  })
}

export function createPlan(data) {
  return request({
    url: GlobalUrl.prefixUrl + '/indoor-management/Plan/table/create',
    method: 'post',
    data
  })
}

export function deletePlan(data) {
  return request({
    url: GlobalUrl.prefixUrl + '/indoor-management/Plan/table/delete',
    method: 'post',
    data
  })
}

export function updatePlan(data) {
  return request({
    url: GlobalUrl.prefixUrl + '/indoor-management/Plan/table/update',
    method: 'post',
    data
  })
}

