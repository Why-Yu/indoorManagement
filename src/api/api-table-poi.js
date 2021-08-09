import request from '@/utils/request'
import GlobalUrl from '@/utils/GlobalUrl'

export function getPoi(data) {
  return request({
    url: GlobalUrl.prefixUrl + '/indoor-management/Poi/table/data',
    method: 'post',
    data
  })
}

export function createPoi(data) {
  return request({
    url: GlobalUrl.prefixUrl + '/indoor-management/Poi/table/create',
    method: 'post',
    data
  })
}

export function deletePoi(data) {
  return request({
    url: GlobalUrl.prefixUrl + '/indoor-management/Poi/table/delete',
    method: 'post',
    data
  })
}

export function updatePoi(data) {
  return request({
    url: GlobalUrl.prefixUrl + '/indoor-management/Poi/table/update',
    method: 'post',
    data
  })
}
