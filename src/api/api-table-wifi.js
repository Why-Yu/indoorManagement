import request from '@/utils/request'

export function getWifi(data) {
  return request({
    url: '/indoor-management/table/Wifi/data',
    method: 'post',
    data
  })
}

export function createWifi(data) {
  return request({
    url: '/indoor-management/table/Wifi/create',
    method: 'post',
    data
  })
}

export function deleteWifi(data) {
  return request({
    url: '/indoor-management/table/Wifi/delete',
    method: 'post',
    data
  })
}

export function updateWifi(data) {
  return request({
    url: '/indoor-management/table/Wifi/update',
    method: 'post',
    data
  })
}
