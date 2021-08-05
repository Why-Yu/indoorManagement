import request from '@/utils/request'

export function getPlan(data) {
  return request({
    url: '/indoor-management/table/Plan/data',
    method: 'post',
    data
  })
}

export function createPlan(data) {
  return request({
    url: '/indoor-management/table/Plan/create',
    method: 'post',
    data
  })
}

export function deletePlan(data) {
  return request({
    url: '/indoor-management/table/Plan/delete',
    method: 'post',
    data
  })
}

export function updatePlan(data) {
  return request({
    url: '/indoor-management/table/Plan/update',
    method: 'post',
    data
  })
}

