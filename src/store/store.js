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
    FirstGetTodo (state) {
      localStorage.setItem('AddCounter', null)
      const EndValue = localStorage.getItem('EndValue')
      let End
      // 가져온 EndValue가 null이거나 0이라면 처음 출력 Todo는 5개로 그렇지 않다면 EndValue의 개수만큼 출력
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
          alert(`List Loading Fail.`)
          console.log(e.message)
        })
    },
    GetMoreTodo (state, payload) {
      const todos = this.getters.lists
      const AddCounter = localStorage.getItem('AddCounter')
      const LastId = payload.LastId
      let LastIdValue
      // AddCounter가 null이라면 LastId부터 limit의 개수만큼 리스트를 로드
      // AddCounter가 있다면 LastId에서 그만큼 차감하여 리스트를 로드
      AddCounter === 'null'
        ? LastIdValue = LastId
        : LastIdValue = (LastId - parseInt(AddCounter))
      axios.get(`http://localhost:3001/todos?_start=${LastIdValue}&_limit=${payload.limit}`)
        .then((res) => {
          let ResTodo = res.data
          // 리스트를 로드할때 방금 추가한 값이 로드된 리스트 최하단에서 중복 출력되는 걸 막기 위한 필터링 반복문
          for (let i = 0; i < todos.length; i++) {
            for (let j = 0; j < ResTodo.length; j++) {
              if (todos[i].id === ResTodo[j].id) ResTodo.splice(j, 1)
              else continue
            }
          }
          state.commit(`LOAD_TODO`, ResTodo)
        })
        .catch((e) => {
          alert(`List loading failed..`)
          console.error(e)
        })
    },
    // ADD
    AddItem (state, payload) {
      const todoData = { name: payload.name, complete: false }
      axios.post('http://localhost:3001/todos/', todoData)
        .then((res) => {
          state.commit('ADD_ITEM', res.data)
          localStorage.setItem('AddCounter', payload.AddCounter)
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
          // Id가 1~5라면 EndValue를 지금 리스트 길이로 , 그렇지 않다면 null로 세팅
          // ADD 할때 1씩 올리는 Addcounter는 삭제할 시 1씩 차감
          Id < 6
            ? localStorage.setItem('EndValue', this.getters.lists.length)
            : localStorage.setItem('EndValue', null)
          localStorage.setItem('AddCounter', (localStorage.getItem('AddCounter') - 1))
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
