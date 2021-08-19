import request from '@/utils/request'
import GlobalUrl from '@/utils/GlobalUrl'

export function getPanorama(data) {
  return request({
    url: GlobalUrl.prefixUrl + '/indoor-management/Panorama/table/data',
    method: 'post',
    data
  })
}

export function createPanorama(data) {
  return request({
    url: GlobalUrl.prefixUrl + '/indoor-management/Panorama/table/create',
    method: 'post',
    data
  })
}

export function deletePanorama(data) {
  return request({
    url: GlobalUrl.prefixUrl + '/indoor-management/Panorama/table/delete',
    method: 'post',
    data
  })
}

export function updatePanorama(data) {
  return request({
    url: GlobalUrl.prefixUrl + '/indoor-management/Panorama/table/update',
    method: 'post',
    data
  })
}
