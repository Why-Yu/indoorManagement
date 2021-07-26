const Mock = require('mockjs')

const data = Mock.mock({
  'items|100': [{
    'index|+1': 0,
    'number|+1': 100,
    name: '@integer(1, 5)-',
    x: '@float(3372318, 3372332)',
    y: '@float(550497, 550574)',
    h: '@float(32, 48)'
  }]
})
let haveProcessed = false

module.exports = [
  {
    url: '/indoor-management/table/Wifi/data',
    type: 'post',
    response: config => {
      const { page, size } = config.body
      const items = data.items
      if (!haveProcessed) {
        haveProcessed = true
        items.forEach(item => {
          item.name = item.name + item.number
          item.number = undefined
        })
      }
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
    url: '/indoor-management/table/Wifi/update',
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
