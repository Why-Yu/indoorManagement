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
    url: '/indoor-management/table/Bluetooth/data',
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
        code: 20000,
        data: {
          total: items.length,
          items: items.slice(page * size, (page + 1) * size)
        }
      }
    }
  },
  {
    url: '/indoor-management/table/Bluetooth/update',
    type: 'post',
    response: config => {
      return {
        code: 20000,
        data: {
          total: 1
        }
      }
    }
  },
  {
    url: '/indoor-management/table/Bluetooth/delete',
    type: 'post',
    response: config => {
      // 检测一下特殊情况，即删除最后一页的唯一一个元素
      // 因为这里index是序号，不是主键，所以除第一次删除外并不会删除到对应的元素，仅作测试
      const { index } = config.body
      const items = data.items.splice(index, 1)
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
