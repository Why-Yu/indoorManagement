import request from '@/utils/request'

export function getTiles(data) {
  return request({
    url: '/indoor-management/table/Tiles/data',
    method: 'post',
    data
  })
}

export function createTiles(data) {
  return request({
    url: '/indoor-management/table/Tiles/create',
    method: 'post',
    data
  })
}

export function deleteTiles(data) {
  return request({
    url: '/indoor-management/table/Tiles/delete',
    method: 'post',
    data
  })
}

export function updateTiles(data) {
  return request({
    url: '/indoor-management/table/Tiles/update',
    method: 'post',
    data
  })
}
