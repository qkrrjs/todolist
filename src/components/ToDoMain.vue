<template>
    <b-container>
        <div class="hello">
          <h2 class="TitleName">TodoList</h2>
        </div>
        <AddList
          :Add="Add"
          />
          <ul class="list-group">
            <li class="list-group-item" v-for="todoss in lists" :key="todoss.index">
               <EditList
                  :todoss="todoss"
                  :Edit="Edit"
                  :MainEditFlag="EditFlag"
                  :clickedId="clickedId"
                  @changeMode="changeMode()"
                />
               <itemList
                  :todoss="todoss"
                  :Edit="Edit"
                  :MainEditFlag="EditFlag"
                  :Delete="Delete"
                  :clickedId="clickedId"
                  @changeId="IdBind"
                  @changeMode="changeMode()"
                  @Complete="complete(todoss.id, todoss.Complete)"
                />
            </li>
            <li class="list-group-item">
              <span style="float:left">List items : ( {{lists.length}} )</span>
              <b-btn class="moreBtn" @click="GetMoreTodo(lists[lists.length - 1].id, 5)">More(5)</b-btn>
            </li>
          </ul>
          <p class="bottom-text">Made By Clive</p>
    </b-container>
</template>

<script>
// api call -> api result === success ? state change & Re: render : Exception handling
import edit from './editList'
import add from './addList'
import item from './ItemList'
import { mapGetters } from 'vuex'

export default {
  name: 'TodoMain',
  data () {
    return {
      EditFlag: false,
      clickedId: 0
    }
  },
  components: {
    'EditList': edit,
    'AddList': add,
    'ItemList': item
  },
  computed: {
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
      this.$store.dispatch('AddItem', { name: name })
    },
    // Delete
    Delete (i) {
      this.$store.dispatch('DeleteItem', i)
    },
    // Edit
    Edit (name, id) {
      this.$store.dispatch('EditItem', { name: name, id: id })
      this.changeMode()
    },
    // Complete Toggle
    complete (id, Complete) {
      this.$store.dispatch('CompleteItem', {Id: id, Complete: Complete})
    },
    IdBind (id) {
      this.clickedId = id
    },
    changeMode () {
      this.EditFlag = !this.EditFlag
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
.moreBtn {
  margin-left:-110px;
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
.container{
  padding:0 1.5rem
}
.TitleName{
  margin-left:-20px
}
.bottom-text{
  margin:20px 0;
  margin-left:-30px;
  bottom:0
}
</style>
