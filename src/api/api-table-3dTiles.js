import request from '@/utils/request'
import GlobalUrl from '@/utils/GlobalUrl'

export function get3dTiles(data) {
  return request({
    url: GlobalUrl.prefixUrl + '/indoor-management/TdTiles/table/data',
    method: 'post',
    data
  })
}

export function create3dTiles(data) {
  return request({
    url: GlobalUrl.prefixUrl + '/indoor-management/TdTiles/table/create',
    method: 'post',
    data
  })
}

export function delete3dTiles(data) {
  return request({
    url: GlobalUrl.prefixUrl + '/indoor-management/TdTiles/table/delete',
    method: 'post',
    data
  })
}

export function update3dTiles(data) {
  return request({
    url: GlobalUrl.prefixUrl + '/indoor-management/TdTiles/table/update',
    method: 'post',
    data
  })
}

export function importData(formData) {
  return request({
    url: GlobalUrl.prefixUrl + '/indoor-management/TdTiles/importData',
    headers: { 'Content-Type': 'multipart/form-data' },
    method: 'post',
    data: formData
  })
}
