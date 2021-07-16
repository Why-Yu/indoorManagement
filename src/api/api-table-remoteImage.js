import request from '@/utils/request'

export function getRemoteImage(data) {
  return request({
    url: '/indoor-management/table/RemoteImage/data',
    method: 'post',
    data
  })
}

export function createRemoteImage(data) {
  return request({
    url: '/indoor-management/table/RemoteImage/create',
    method: 'post',
    data
  })
}

export function deleteRemoteImage(data) {
  return request({
    url: '/indoor-management/table/RemoteImage/delete',
    method: 'post',
    data
  })
}

export function updateRemoteImage(data) {
  return request({
    url: '/indoor-management/table/RemoteImage/update',
    method: 'post',
    data
  })
}
