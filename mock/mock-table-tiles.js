const Mock = require('mockjs')

const data = Mock.mock({
  'items|100': [{
    'index|+1': 0,
    'name|1': ['全球矢量底图瓦片', '全球矢量注记瓦片', '全球影像底图瓦片', '全球影像注记瓦片'],
    zoom: '@integer(1, 18)',
    x: '',
    y: '',
    image: "@image(50x50, @color, 'mock')"
  }]
})
let haveProcessed = false

module.exports = [
  {
    url: '/indoor-management/table/Tiles/data',
    type: 'post',
    response: config => {
      const { page, size } = config.body
      const items = data.items
      if (!haveProcessed) {
        haveProcessed = true
        items.forEach(item => {
          item.x = Math.pow(2, item.zoom)
          item.y = Math.pow(2, item.zoom - 1)
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
    url: '/indoor-management/table/Tiles/update',
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
