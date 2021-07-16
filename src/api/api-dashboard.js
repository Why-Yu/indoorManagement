import request from '@/utils/request'

export function getDashBoardData() {
  return request({
    url: '/indoor-management/DashBoard/data',
    method: 'get'
  })
}
