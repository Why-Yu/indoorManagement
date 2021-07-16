import request from '@/utils/request'

export function getIndoorTopo(data) {
  return request({
    url: '/indoor-management/table/IndoorTopo/data',
    method: 'post',
    data
  })
}

export function createIndoorTopo(data) {
  return request({
    url: '/indoor-management/table/IndoorTopo/create',
    method: 'post',
    data
  })
}

export function deleteIndoorTopo(data) {
  return request({
    url: '/indoor-management/table/IndoorTopo/delete',
    method: 'post',
    data
  })
}

export function updateIndoorTopo(data) {
  return request({
    url: '/indoor-management/table/IndoorTopo/update',
    method: 'post',
    data
  })
}
