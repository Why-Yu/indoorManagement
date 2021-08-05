import request from '@/utils/request'
import GlobalUrl from '@/utils/GlobalUrl'

export function getTiles(data) {
  return request({
    url: GlobalUrl.prefixUrl + '/indoor-management/Tiles/table/data',
    method: 'post',
    data
  })
}

export function createTiles(data) {
  return request({
    url: GlobalUrl.prefixUrl + '/indoor-management/Tiles/table/create',
    method: 'post',
    data
  })
}

export function deleteTiles(data) {
  return request({
    url: GlobalUrl.prefixUrl + '/indoor-management/Tiles/table/delete',
    method: 'post',
    data
  })
}

export function updateTiles(data) {
  return request({
    url: GlobalUrl.prefixUrl + '/indoor-management/Tiles/table/update',
    method: 'post',
    data
  })
}

