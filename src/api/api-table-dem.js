import request from '@/utils/request'

export function getDem(data) {
  return request({
    url: '/indoor-management/table/Dem/data',
    method: 'post',
    data
  })
}

export function createDem(data) {
  return request({
    url: '/indoor-management/table/Dem/create',
    method: 'post',
    data
  })
}

export function deleteDem(data) {
  return request({
    url: '/indoor-management/table/Dem/delete',
    method: 'post',
    data
  })
}

export function updateDem(data) {
  return request({
    url: '/indoor-management/table/Dem/update',
    method: 'post',
    data
  })
}
