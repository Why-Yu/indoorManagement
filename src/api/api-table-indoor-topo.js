import request from '@/utils/request'
import GlobalUrl from '@/utils/GlobalUrl'

export function getIndoorTopo(data) {
  return request({
    url: GlobalUrl.prefixUrl + '/indoor-management/IndoorTopo/table/data',
    method: 'post',
    data
  })
}

export function createIndoorTopo(data) {
  return request({
    url: GlobalUrl.prefixUrl + '/indoor-management/IndoorTopo/table/create',
    method: 'post',
    data
  })
}

export function deleteIndoorTopo(data) {
  return request({
    url: GlobalUrl.prefixUrl + '/indoor-management/IndoorTopo/table/delete',
    method: 'post',
    data
  })
}

export function updateIndoorTopo(data) {
  return request({
    url: GlobalUrl.prefixUrl + '/indoor-management/IndoorTopo/table/update',
    method: 'post',
    data
  })
}
