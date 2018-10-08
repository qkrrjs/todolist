import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

const SET_TODOS = 'SET_TODOS'
const ADD_ITEM = 'ADD_ITEM'
const SET_NAME = 'SET_NAME'
const DELETE_ITEM = 'DELETE_ITEM'

export default new Vuex.Store({
  namespaced: true,
  state: {
    todos: []
  },
  getters: {
    lists: state => {
      return state.todos
    }
  },
  mutations: {
    // ADD ( add )
    [ADD_ITEM] (state, payload) {
      state.todos.push(payload)
    },
    // EDIT ( show , cancel )
    [SET_NAME] (state, payload) {
      const idx = state.todos.findIndex(list => list.id === payload.id)
      state.todos[idx].name = payload.name
    },
    // DELETE ( delete )
    [DELETE_ITEM] (state, id) {
      const idx = state.todos.findIndex(list => list.id === id)
      state.todos.splice(idx, 1)
    },
    // SET TODOS
    [SET_TODOS] (state, todos) {
      state.todos = todos
    }
  },
  actions: {
    // LOAD TODO
    GetTodos (state) {
      axios.get('http://localhost:3001/todos')
        .then((res) => {
          console.log(res.data)
          state.commit('SET_TODOS', res.data)
        })
        .catch((e) => {
          console.log(e.message)
        })
    },
    // ADD
    AddItem (state, name) {
      const todoData = { name: name }
      axios.post('http://localhost:3001/todos/', todoData)
        .then((res) => {
          state.commit('ADD_ITEM', res.data)
        }).catch((e) => {
          console.error(e)
        })
    },
    // EDIT ( show , cancle )
    EditItem (state, payload) {
      axios.put(`http://localhost:3001/todos/${payload.id}`, { name: payload.name })
        .then((res) => {
          state.commit('SET_NAME', {name: res.data.name, id: res.data.id})
        })
        .catch((e) => {
          console.error(e)
        })
    },
    // DELETE
    DeleteItem (state, id) {
      axios.delete(`http://localhost:3001/todos/${id}`)
        .then((res) => {
          state.commit('DELETE_ITEM', id)
        })
        .catch((e) => {
          if (e.res) {
            console.log(e)
          } else if (e.request) {
            console.log(e.request)
          } else {
            console.log('Error', e.message)
          }
        })
    }
  }
})
