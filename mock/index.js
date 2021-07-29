const Mock = require('mockjs')
const { param2Obj } = require('./utils')

const user = require('./user')
const tablePoi = require('./mock-table-poi')
const table3dTiles = require('./mock-table-3dTiles')
// const tableAp = require('./mock-table-ap')
// const tableBluetooth = require('./mock-table-bluetooth')
// const tableWifi = require('./mock-table-wifi')
const tableRemoteImage = require('./mock-table-remoteImage')
const tableTiles = require('./mock-table-tiles')
const tableDem = require('./mock-table-dem')
const tableIndoorTopo = require('./mock-table-indoor-topo')
const tablePlan = require('./mock-table-plan')
const dashBoard = require('./mock-dashboard')

const mocks = [
  ...user,
  ...tablePoi,
  ...table3dTiles,
  // ...tableAp,
  // ...tableBluetooth,
  // ...tableWifi,
  ...tableRemoteImage,
  ...tableTiles,
  ...tableDem,
  ...tableIndoorTopo,
  ...tablePlan,
  ...dashBoard
]

// for front mock
// please use it cautiously, it will redefine XMLHttpRequest,
// which will cause many of your third-party libraries to be invalidated(like progress event).
function mockXHR() {
  // mock patch
  // https://github.com/nuysoft/Mock/issues/300
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
  Mock.XHR.prototype.send = function() {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType
      }
    }
    this.proxy_send(...arguments)
  }

  function XHR2ExpressReqWrap(respond) {
    return function(options) {
      let result = null
      if (respond instanceof Function) {
        const { body, type, url } = options
        // https://expressjs.com/en/4x/api.html#req
        result = respond({
          method: type,
          body: JSON.parse(body),
          query: param2Obj(url)
        })
      } else {
        result = respond
      }
      return Mock.mock(result)
    }
  }

  for (const i of mocks) {
    Mock.mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response))
  }
}

module.exports = {
  mocks,
  mockXHR
}

