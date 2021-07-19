const getDefaultState = () => {
  return {
    coordinates: {
      latitude: 0,
      longitude: 0
    }
  }
}

const state = getDefaultState()

const mutations = {
  SET_COORDINATES: (state, { latitude, longitude }) => {
    state.coordinates.latitude = latitude
    state.coordinates.longitude = longitude
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
