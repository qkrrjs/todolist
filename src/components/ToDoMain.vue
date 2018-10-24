<template>
    <b-container>
        <div class="hello">
          <h2 class="TitleName">TodoList</h2>
        </div>
        <AddToDo
          :Add="Add"
          />
          <ul class="list-group">
            <li class="list-group-item" v-for="todoss in lists" :key="todoss.index">
               <EditToDo
                  :todoss="todoss"
                  :Edit="Edit"
                  :MainEditFlag="EditFlag"
                  :clickedId="clickedId"
                  @changer="binder"
                  @changeMode="changeMode()"
                />
               <ItemList
                  :todoss="todoss"
                  :Edit="Edit"
                  :MainEditFlag="EditFlag"
                  :Delete="Delete"
                  :clickedId="clickedId"
                  :viewFlag="viewFlag"
                  @changer="binder"
                  @changeMode="changeMode()"
                  @complete="complete(todoss.id, todoss.complete)"
                />
            </li>
            <li class="list-group-item">
              <b-btn variant="primary">All</b-btn>
              <b-btn variant="warning">Active</b-btn>
              <b-btn variant="success" @click="toggle()">Complete</b-btn>
            </li>
            <li class="list-group-item">
              <span style="float:left">List items : ( {{lists.length}} )</span>
              <b-btn class="moreBtn" @click="GetMoreTodo(lists.length, 5)">More(5)</b-btn>
              <span style="float:right">complete Item : ( {{completeCounter}} )</span>
            </li>
          </ul>
          <p class="bottom-text">Made By Clive</p>
    </b-container>
</template>

<script>
// api call -> api result === success ? state change & Re: render : Exception handling
import add from './AddToDo'
import edit from './EditToDo'
import item from './ItemList'
import { mapGetters } from 'vuex'

export default {
  name: 'TodoMain',
  data () {
    return {
      EditFlag: false,
      elEditFlag: false,
      viewFlag: false,
      lastPassedId: 0,
      clickedId: 0
    }
  },
  components: {
    'AddToDo': add,
    'EditToDo': edit,
    'ItemList': item
  },
  computed: {
    completeCounter () {
      let count = 0
      for (let i = 0; i < this.lists.length; i++) {
        if (this.lists[i].complete) count++
      }
      return count
    },
    ...mapGetters({
      lists: 'lists'
    })
  },
  methods: {
    // Load
    FirstGetTodo () {
      this.$store.dispatch('FirstGetTodo')
    },
    GetMoreTodo (LastId, limit) {
      this.$store.dispatch('GetMoreTodo', {LastId: LastId, limit: limit})
    },
    // Add
    Add (name) {
      this.EditFlag = false
      this.$store.dispatch('AddItem', { name: name })
    },
    // Delete
    Delete (i) {
      this.$store.dispatch('DeleteItem', i)
    },
    // Edit
    Edit (name, id) {
      this.$store.dispatch('EditItem', { name: name, id: id })
      this.EditFlag = false
    },
    // Complete Toggle
    complete (id, complete) {
      this.$store.dispatch('completeItem', {Id: id, complete: complete})
    },
    // EditMode Change ( binding -> change )
    binder (id, flag) {
      // if (this.EditFlag === false) {
      //   let idx = this.lists.findIndex(lists => lists.id === id)
      //   console.log(this.lists[idx].name)
      //   this.lists[idx].name = this.tagChanger(this.lists[idx].name)
      // }
      this.clickedId = id
      this.elEditFlag = flag
    },
    changeMode () {
      this.elEditFlag ? this.EditFlag = true : this.EditFlag = false
    },
    tagChanger (name) {
      name = name.replace(/&lt;/g, '<')
      name = name.replace(/&gt;/g, '>')
      return name
    },
    toggle () {
    }
  },
  mounted () {
    this.FirstGetTodo()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
}
a {
  color: #42b983;
}
.list-group{
  margin-top:35px;
}
.addform{
  margin-top:25px;
}
// .GetMoreBtn{
//   margin-left:-130px;
// }
.container {
  padding:0 1.5rem
}
.TitleName {
  margin-left:-20px
}
.bottom-text {
  margin:20px 0;
  margin-left:-30px;
  bottom:0
}
.moreBtn {
  margin-left:30px;
}
</style>
