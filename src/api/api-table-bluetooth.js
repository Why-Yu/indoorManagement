import request from '@/utils/request'
import GlobalUrl from '@/utils/GlobalUrl'

export function getBluetooth(data) {
  return request({
    url: GlobalUrl.prefixUrl + '/indoor-management/Bluetooth/table/data',
    method: 'post',
    data
  })
}

export function createBluetooth(data) {
  return request({
    url: GlobalUrl.prefixUrl + '/indoor-management/Bluetooth/table/create',
    method: 'post',
    data
  })
}

export function deleteBluetooth(data) {
  return request({
    url: GlobalUrl.prefixUrl + '/indoor-management/Bluetooth/table/delete',
    method: 'post',
    data
  })
}

export function updateBluetooth(data) {
  return request({
    url: GlobalUrl.prefixUrl + '/indoor-management/Bluetooth/table/update',
    method: 'post',
    data
  })
}
