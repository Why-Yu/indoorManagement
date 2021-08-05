const Mock = require('mockjs')

const data = Mock.mock({
  'items|10': [{
    'index|+1': 0,
    name: '@cword(7)',
    path: '@url',
    image: "@image(50x50, @color, 'mock')",
    longitude: '@float(-180, 180)',
    latitude: '@float(-80, 80)'
  }]
})

module.exports = [
  {
    url: '/indoor-management/table/Plan/data',
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
    url: '/indoor-management/table/Plan/update',
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

