const Mock = require('mockjs')

const data = Mock.mock({
  'items|100': [{
    'index|+1': 0,
    name: 'LC814506520@integer(20000, 22000)LGN00',
    band: '@integer(0, 232)',
    rowIndex: '@integer(0, 70)',
    date: '@date("yyyy-MM-dd")',
    cloud: '@integer(0, 50)%',
    longitude: '@float(-180, 180)',
    latitude: '@float(-80, 80)',
    image: "@image(50x50, @color, 'mock')"
  }]
})

module.exports = [
  {
    url: '/indoor-management/table/RemoteImage/data',
    type: 'post',
    response: config => {
      const { page, size } = config.body
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items.slice(page * size, (page + 1) * size)
        }
      }
    }
  },
  {
    url: '/indoor-management/table/RemoteImage/update',
    type: 'post',
    response: config => {
      return {
        code: 20000,
        data: {
          total: 1
        }
      }
    }
  }
]

