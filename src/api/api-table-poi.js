import request from '@/utils/request'

export function getPoi(data) {
  return request({
    url: '/indoor-management/table/Poi/data',
    method: 'post',
    data
  })
}

export function createPoi(data) {
  return request({
    url: '/indoor-management/table/Poi/create',
    method: 'post',
    data
  })
}

export function deletePoi(data) {
  return request({
    url: '/indoor-management/table/Poi/delete',
    method: 'post',
    data
  })
}

export function updatePoi(data) {
  return request({
    url: '/indoor-management/table/Poi/update',
    method: 'post',
    data
  })
}
