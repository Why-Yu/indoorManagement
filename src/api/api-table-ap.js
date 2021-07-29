import request from '@/utils/request'
import GlobalUrl from '@/utils/GlobalUrl'

export function getAp(data) {
  return request({
    url: GlobalUrl.prefixUrl + '/indoor-management/Ap/table/data',
    method: 'post',
    data
  })
}

export function createAp(data) {
  return request({
    url: GlobalUrl.prefixUrl + '/indoor-management/Ap/table/create',
    method: 'post',
    data
  })
}

export function deleteAp(data) {
  return request({
    url: GlobalUrl.prefixUrl + '/indoor-management/Ap/table/delete',
    method: 'post',
    data
  })
}

export function updateAp(data) {
  return request({
    url: GlobalUrl.prefixUrl + '/indoor-management/Ap/table/update',
    method: 'post',
    data
  })
}
