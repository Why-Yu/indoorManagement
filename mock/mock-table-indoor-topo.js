const Mock = require('mockjs')

const data = Mock.mock({
  'items|100': [{
    'index|+1': 0,
    buildId: '@integer(1, 10)',
    beginId: '@integer(1, 999)',
    beginX: '@float(12718210, 12718273)',
    beginY: '@float(3581679, 3581713)',
    endId: '@integer(1, 999)',
    endX: '@float(12718210, 12718273)',
    endY: '@float(3581679, 3581713)',
    floor: '@integer(-3, 25)'
  }]
})
let haveProcessed = false

module.exports = [
  {
    url: '/indoor-management/table/IndoorTopo/data',
    type: 'post',
    response: config => {
      const { page, size } = config.body
      const items = data.items
      if (!haveProcessed) {
        haveProcessed = true
        items.forEach(item => {
          item.beginId = item.buildId + '-' + item.floor + '-' + item.beginId
          item.endId = item.buildId + '-' + item.floor + '-' + item.endId
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
    url: '/indoor-management/table/IndoorTopo/update',
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

