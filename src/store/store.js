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
      for (let i = 0; i < todos.length; i++) {
        state.todos.push(todos[i])
      }
    }
  },
  actions: {
    // LOAD TODO
    FirstGetTodo (state, ErrorChecker) {
      localStorage.setItem('AddCounter', null)
      const EndValue = localStorage.getItem('EndValue')
      let End
      EndValue === null ||
      EndValue === 'null' ||
      parseInt(EndValue) === 0
        ? End = 5
        : End = EndValue
      axios.get(`http://localhost:3001/todos?_start=0&_end=${End}`)
        .then((res) => {
          state.commit('SET_TODOS', res.data)
        })
        .catch((e) => {
          alert(ErrorChecker(e.response.status))
          // console.log(e.message)
        })
    },
    GetMoreTodo (state, payload) {
      const todos = this.getters.lists
      const AddCounter = localStorage.getItem('AddCounter')
      const LastId = payload.LastId
      let LastIdValue
      AddCounter === 'null'
        ? LastIdValue = LastId
        : LastIdValue = (LastId - parseInt(AddCounter))
      axios.get(`http://localhost:3001/todos?_start=${LastIdValue}&_limit=${payload.limit}`)
        .then((res) => {
          let ResTodo = res.data
          // 리스트를 로드할때 방금 추가한 값이 중복 출력되는 걸 막기 위한 필터링 반복문
          for (let i = 0; i < todos.length; i++) {
            for (let j = 0; j < ResTodo.length; j++) {
              if (todos[i].id === ResTodo[j].id) ResTodo.splice(j, 1)
              else continue
            }
          }
          state.commit(`LOAD_TODO`, ResTodo)
        })
        .catch((e) => {
          alert(payload.ErrorChecker(e.response.status))
          // console.log(e.message)
        })
    },
    // ADD
    AddItem (state, payload) {
      const todoData = { name: payload.name }
      axios.post('http://localhost:3001/todos/', todoData)
        .then((res) => {
          state.commit('ADD_ITEM', res.data)
          localStorage.setItem('AddCounter', payload.AddCounter)
        }).catch((e) => {
          alert(payload.ErrorChecker(e.response.status))
          // console.error(e)
        })
    },
    // EDIT
    EditItem (state, payload) {
      axios.put(`http://localhost:3001/todos/${payload.id}`, { name: payload.name })
        .then((res) => {
          state.commit('EDIT_NAME', {name: res.data.name, id: res.data.id})
        })
        .catch((e) => {
          alert(payload.ErrorChecker(e.response.status))
          // console.error(e)
        })
    },
    // DELETE
    DeleteItem (state, payload) {
      let id = payload.id
      axios.delete(`http://localhost:3001/todos/${id}`)
        .then(() => {
          state.commit('DELETE_ITEM', id)
          id < 6
            ? localStorage.setItem('EndValue', this.getters.lists.length)
            : localStorage.setItem('EndValue', null)
          localStorage.setItem('AddCounter', (localStorage.getItem('AddCounter') - 1))
        })
        .catch((e) => {
          alert(payload.ErrorChecker(e.response.status))
          // if (e.res) {
          //   console.log(e)
          // } else if (e.request) {
          //   console.log(e.request)
          // } else {
          //   console.log('Error', e.message)
          // }
        })
    }
  }
})
