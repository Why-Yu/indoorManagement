const Mock = require('mockjs')

const data = Mock.mock({
  'items|25': [{
    'index|+1': 0,
    name: '@cword(7)',
    path: '@url',
    longitude: '@float(100, 140)',
    latitude: '@float(20, 45)'
  }]
})

module.exports = [
  {
    url: '/indoor-management/table/3dTiles/data',
    type: 'post',
    response: config => {
      const { page, size } = config.body
      const items = data.items
      return {
        code: 200,
        data: {
          total: items.length,
          items: items.slice(page * size, (page + 1) * size)
        }
      }
    }
  },
  {
    url: '/indoor-management/table/3dTiles/update',
    type: 'post',
    response: config => {
      return {
        code: 200,
        data: {
          total: 1
        }
      }
    }
  }
]
