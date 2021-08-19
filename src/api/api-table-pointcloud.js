import request from '@/utils/request'
import GlobalUrl from '@/utils/GlobalUrl'

export function getPointCloud(data) {
  return request({
    url: GlobalUrl.prefixUrl + '/indoor-management/PointCloud/table/data',
    method: 'post',
    data
  })
}

export function createPointCloud(data) {
  return request({
    url: GlobalUrl.prefixUrl + '/indoor-management/PointCloud/table/create',
    method: 'post',
    data
  })
}

export function deletePointCloud(data) {
  return request({
    url: GlobalUrl.prefixUrl + '/indoor-management/PointCloud/table/delete',
    method: 'post',
    data
  })
}

export function updatePointCloud(data) {
  return request({
    url: GlobalUrl.prefixUrl + '/indoor-management/PointCloud/table/update',
    method: 'post',
    data
  })
}

