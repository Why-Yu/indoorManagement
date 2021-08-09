import request from '@/utils/request'
import GlobalUrl from '@/utils/GlobalUrl'

export function getDem(data) {
  return request({
    url: GlobalUrl.prefixUrl + '/indoor-management/Dem/table/data',
    method: 'post',
    data
  })
}

export function createDem(data) {
  return request({
    url: GlobalUrl.prefixUrl + '/indoor-management/Dem/table/create',
    method: 'post',
    data
  })
}

export function deleteDem(data) {
  return request({
    url: GlobalUrl.prefixUrl + '/indoor-management/Dem/table/delete',
    method: 'post',
    data
  })
}

export function updateDem(data) {
  return request({
    url: GlobalUrl.prefixUrl + '/indoor-management/Dem/table/update',
    method: 'post',
    data
  })
}
