import axios from '~/plugins/axios'
import jwtDecode from 'jwt-decode'

export const state = () => {
  return {
    lists: {
      users: [],
      builds: []
    }
  }
}
export const mutations = {
  SET_USER (state, data) {
    state.user.token = data.token
    state.user.isAuthenticated = true
    state.user.username = data.user.username
    state.user.firstName = data.user.firstName
    state.user.lastName = data.user.lastName
    state.user.email = data.user.email
  },
  SET_USERS (state, payload) {
    state.lists.users = payload.users
  },
  FETCH_ALL_USERS_REQUEST () {
    console.log('Fetching all users...')
  },
  FETCH_ALL_USERS_SUCCESS (state, users) {
    state.lists.users = users
    console.log('Fetch all users success!')
  },
  FETCH_ALL_USERS_FAILURE (state, error) {
    console.error(error.response.data)
  },
  FETCH_ALL_BUILDS_REQUEST (state) {
    console.log('Fetching all builds...')
  },
  FETCH_ALL_BUILDS_SUCCESS (state, data) {
    console.log('got builds: ', data)
    state.lists.builds = data
  },
  FETCH_ALL_BUILDS_FAILURE (state, error) {
    console.error(error.response.data)
  },
  CLEAR_LISTS (state) {
    // set each list to an empty array
    Object.keys(state.lists).forEach(list => {
      state.lists[list] = []
    })
  }
}
export const actions = {
  nuxtServerInit ({ commit, state }, { req }) {
    if (req.cookies.token) {
      let token = req.cookies.token
      let user = jwtDecode(token)
      let data = { user, token }
      commit('SET_USER', data)
    }
  },
  async fetchAllUsers ({ commit, state }) {
    try {
      commit('FETCH_ALL_USERS_REQUEST')
      let { data } = await axios.get('/users')
      commit('FETCH_ALL_USERS_SUCCESS', data)
    } catch (error) {
      commit('FETCH_ALL_USERS_FAILURE', error)
    }
  },

  async fetchAllBuilds ({ commit, state }) {
    try {
      commit('FETCH_ALL_BUILDS_REQUEST')
      let { data } = await axios.get('/builds')
      commit('FETCH_ALL_BUILDS_SUCCESS', data)
    } catch (error) {
      commit('FETCH_ALL_USERS_FAILURE', error)
    }
  }
}