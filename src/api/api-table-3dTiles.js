import request from '@/utils/request'

export function get3dTiles(data) {
  return request({
    url: '/indoor-management/table/3dTiles/data',
    method: 'post',
    data
  })
}

export function create3dTiles(data) {
  return request({
    url: '/indoor-management/table/3dTiles/create',
    method: 'post',
    data
  })
}

export function delete3dTiles(data) {
  return request({
    url: '/indoor-management/table/3dTiles/delete',
    method: 'post',
    data
  })
}

export function update3dTiles(data) {
  return request({
    url: '/indoor-management/table/3dTiles/update',
    method: 'post',
    data
  })
}
