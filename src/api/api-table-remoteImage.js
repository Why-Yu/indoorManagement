import request from '@/utils/request'
import GlobalUrl from '@/utils/GlobalUrl'

export function getRemoteImage(data) {
  return request({
    url: GlobalUrl.prefixUrl + '/indoor-management/RemoteImage/table/data',
    method: 'post',
    data
  })
}

export function createRemoteImage(data) {
  return request({
    url: GlobalUrl.prefixUrl + '/indoor-management/RemoteImage/table/create',
    method: 'post',
    data
  })
}

export function deleteRemoteImage(data) {
  return request({
    url: GlobalUrl.prefixUrl + '/indoor-management/RemoteImage/table/delete',
    method: 'post',
    data
  })
}

export function updateRemoteImage(data) {
  return request({
    url: GlobalUrl.prefixUrl + '/indoor-management/RemoteImage/table/update',
    method: 'post',
    data
  })
}
