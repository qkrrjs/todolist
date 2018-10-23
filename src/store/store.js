import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

const SET_TODOS = 'SET_TODOS'
const LOAD_TODO = 'LOAD_TODO'
const ADD_ITEM = 'ADD_ITEM'
const EDIT_NAME = 'EDIT_NAME'
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
    // ADD ( AddItem )
    [ADD_ITEM] (state, payload) {
      state.todos.push(payload)
    },
    // EDIT ( EditItem )
    [EDIT_NAME] (state, payload) {
      const idx = state.todos.findIndex(list => list.id === payload.id)
      state.todos[idx].name = payload.name
    },
    // DELETE ( DeleteItem )
    [DELETE_ITEM] (state, id) {
      const idx = state.todos.findIndex(list => list.id === id)
      state.todos.splice(idx, 1)
    },
    // SET TODOS ( GetFirstTodo )
    [SET_TODOS] (state, todos) {
      state.todos = todos
    },
    // LOAD TODO ( GetMoreTodo )
    [LOAD_TODO] (state, todos) {
      // state.todos = [...state.todos, todos]
      // console.log(state.todos)
      // console.log(todos)
      state.todos = state.todos.concat(todos)
    }
  },
  actions: {
    // LOAD TODO
    FirstGetTodo (state) {
      axios.get(`http://localhost:3001/todos?_start=0&_end=5`)
        .then((res) => {
          state.commit('SET_TODOS', res.data)
        })
        .catch((e) => {
          alert(`List Loading Fail.`)
          console.log(e.message)
        })
    },
    GetMoreTodo (state, payload) {
      axios.get(`http://localhost:3001/todos?_start=${payload.LastId}&_limit=${payload.limit}`)
        .then((res) => {
          state.commit(`LOAD_TODO`, res.data)
        })
        .catch((e) => {
          alert(`List loading failed..`)
          console.error(e)
        })
    },
    // ADD
    AddItem (state, payload) {
      const todoData = { name: payload.name, Complete: false }
      axios.post('http://localhost:3001/todos/', todoData)
        .then((res) => {
          state.commit('ADD_ITEM', res.data)
        }).catch((e) => {
          alert(`Todo ADD Fail`)
          console.error(e)
        })
    },
    // EDIT
    EditItem (state, payload) {
      axios.put(`http://localhost:3001/todos/${payload.id}`, { name: payload.name })
        .then((res) => {
          state.commit('EDIT_NAME', {name: res.data.name, id: res.data.id})
        })
        .catch((e) => {
          alert(`Todo Edit Fail`)
          console.error(e)
        })
    },
    // DELETE
    DeleteItem (state, Id) {
      axios.delete(`http://localhost:3001/todos/${Id}`)
        .then(() => {
          state.commit('DELETE_ITEM', Id)
        })
        .catch((e) => {
          alert(`Todo Delete Fail`)
          console.error(e)
        })
    },
    // COMPLETE
    CompleteItem (state, payload) {
      axios.patch(`http://localhost:3001/todos/${payload.Id}`, { Complete: !payload.Complete })
        .catch((e) => {
          alert(`Complete Toggle Fail`)
          console.error(e)
        })
    }
  }
})
