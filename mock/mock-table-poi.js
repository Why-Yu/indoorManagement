const Mock = require('mockjs')

const data = Mock.mock({
  'items|100': [{
    'index|+1': 0,
    province: '',
    city: '',
    area: '@county(true)',
    'type|1': ['美食', '酒店', '购物', '生活服务', '景点', '娱乐', '医疗'],
    name: '@cword(7)',
    longitude: '@float(110, 120)',
    latitude: '@float(30, 40)'
  }]
})
let haveProcessed = false

module.exports = [
  {
    url: '/indoor-management/table/Poi/data',
    type: 'post',
    response: config => {
      const { page, size } = config.body
      const items = data.items
      if (!haveProcessed) {
        haveProcessed = true
        let locationStr
        items.forEach((item) => {
          locationStr = item.area.split(/\s+/)
          item.province = locationStr[0]
          item.city = locationStr[1]
          item.area = locationStr[2]
        })
      }
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items.slice(page * size, (page + 1) * size)
        }
      }
    }
  }
]
