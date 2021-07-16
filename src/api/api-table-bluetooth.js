import request from '@/utils/request'

export function getBluetooth(data) {
  return request({
    url: '/indoor-management/table/Bluetooth/data',
    method: 'post',
    data
  })
}

export function createBluetooth(data) {
  return request({
    url: '/indoor-management/table/Bluetooth/create',
    method: 'post',
    data
  })
}

export function deleteBluetooth(data) {
  return request({
    url: '/indoor-management/table/Bluetooth/delete',
    method: 'post',
    data
  })
}

export function updateBluetooth(data) {
  return request({
    url: '/indoor-management/table/Bluetooth/update',
    method: 'post',
    data
  })
}
