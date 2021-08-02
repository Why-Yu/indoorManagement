const getDefaultState = () => {
  return {
    lat: 0,
    lng: 0,
    height: 5
  }
}
// 本来打算所有类型的数据直接传入，然后统一在cesium组件中加工为经纬度
// 但问题是，在cesium组件中使用函数进行加工生成了对象赋值给<vc-entity>的position
// vue无法检测对象或者数组的变化，导致无法响应式驱动，感觉只能手动添加一个watch
// 既然如此，还不如在各组件就处理好再传入vuex，然后直接利用vue状态的响应式功能，促使组件刷新(并且还不用传递一个type)
// 需要注意的是，这里的三个属性不能又包装成对象哦
const state = getDefaultState()

const mutations = {
  SET_COORDINATES: (state, { latitude, longitude }) => {
    state.lat = latitude
    state.lng = longitude
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
