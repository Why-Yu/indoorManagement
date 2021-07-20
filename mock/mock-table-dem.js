const Mock = require('mockjs')

const data = Mock.mock({
  'items|100': [{
    'index|+1': 0,
    name: 'ASTGTM_',
    band: '@integer(0, 180)',
    rowIndex: '@integer(0, 83)',
    longitude: '@float(-180, 180)',
    latitude: '@float(-80, 80)',
    image: "@image(50x50, @color, 'mock')"
  }]
})
let haveProcessed = false

module.exports = [
  {
    url: '/indoor-management/table/Dem/data',
    type: 'post',
    response: config => {
      const { page, size } = config.body
      const items = data.items
      if (!haveProcessed) {
        haveProcessed = true
        items.forEach(item => {
          item.name = item.name + 'S' + item.rowIndex + 'E' + item.band
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
  },
  {
    url: '/indoor-management/table/Dem/update',
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

