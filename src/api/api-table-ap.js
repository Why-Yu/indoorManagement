import request from '@/utils/request'

export function getAp(data) {
  return request({
    url: '/indoor-management/table/Ap/data',
    method: 'post',
    data
  })
}

export function createAp(data) {
  return request({
    url: '/indoor-management/table/Ap/create',
    method: 'post',
    data
  })
}

export function deleteAp(data) {
  return request({
    url: '/indoor-management/table/Ap/delete',
    method: 'post',
    data
  })
}

export function updateAp(data) {
  return request({
    url: '/indoor-management/table/Ap/update',
    method: 'post',
    data
  })
}
