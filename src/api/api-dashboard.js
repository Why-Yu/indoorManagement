import request from '@/utils/request'
import GlobalUrl from '@/utils/GlobalUrl'

export function getDashBoardData() {
  return request({
    url: GlobalUrl.prefixUrl + '/indoor-management/DashBoard/data',
    method: 'get'
  })
}
