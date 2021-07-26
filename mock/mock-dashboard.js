const data = [
  { value: 320, name: 'Industries' },
  { value: 240, name: 'Technology' },
  { value: 149, name: 'Forex' },
  { value: 100, name: 'Gold' },
  { value: 59, name: 'Forecasts' }
]

module.exports = [
  {
    url: '/indoor-management/DashBoard/data',
    type: 'get',
    response: config => {
      return {
        code: 200,
        data: {
          items: data
        }
      }
    }
  }
]

