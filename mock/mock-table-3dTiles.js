const Mock = require('mockjs')

const data = Mock.mock({
  'items|25': [{
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
        code: 20000,
        data: {
          total: items.length,
          items: items.slice(page * size, (page + 1) * size)
        }
      }
    }
  }
]
