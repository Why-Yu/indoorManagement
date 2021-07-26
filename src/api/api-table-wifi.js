import request from '@/utils/request'
import GlobalUrl from '@/utils/GlobalUrl'

export function getWifi(data) {
  return request({
    url: GlobalUrl.prefixUrl + '/indoor-management/Wifi/table/data',
    method: 'post',
    data
  })
}

export function createWifi(data) {
  return request({
    url: GlobalUrl.prefixUrl + '/indoor-management/Wifi/table/create',
    method: 'post',
    data
  })
}

export function deleteWifi(data) {
  return request({
    url: GlobalUrl.prefixUrl + '/indoor-management/Wifi/table/delete',
    method: 'post',
    data
  })
}

export function updateWifi(data) {
  return request({
    url: GlobalUrl.prefixUrl + '/indoor-management/Wifi/table/update',
    method: 'post',
    data
  })
}
