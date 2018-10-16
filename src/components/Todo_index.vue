<template>
    <b-container>
        <div class="hello">
              <h2>Todo List</h2>
        </div>
        <addList :Add="Add"/>
          <ul class="list-group">
            <li class="list-group-item" v-for="todoss in lists" :key="todoss.index">
               <editList
                  :todoss="todoss"
                  :Edit="Edit"
                  :MainEditFlag="EditFlag"
                  @changeMode="Change(todoss.id)"
                />
               <itemList
                  :todoss="todoss"
                  :Edit="Edit"
                  :MainEditFlag="EditFlag"
                  :Delete="Delete"
                  :CompleteFlag="CompleteFlag"
                  @changeMode="Change(todoss.id)"
                  @Complete="Complete(todoss.id)"
                />
            </li>
            <li class="list-group-item">
              <span style="float:left">List items : ( {{lists.length}} )</span>
              <b-btn style="margin-left:-140px" @click="GetMoreTodo(lists.length)">More</b-btn>
            </li>
          </ul>
    </b-container>
</template>

<script>
// api call -> api result === success ? state change & Re: render : Exception handling
import edit from './editList'
import add from './addList'
import item from './listItem'
import { mapGetters } from 'vuex'

export default {
  name: 'TodoMain',
  data () {
    return {
      EditFlag: false,
      CompleteFlag: false
    }
  },
  components: {
    'editList': edit,
    'addList': add,
    'itemList': item
  },
  computed: {
    ...mapGetters({
      lists: 'lists'
    })
  },
  methods: {
    Edit (name, id) {
      this.EditFlag = !this.EditFlag
      this.$EventBus.$emit('FlagSend', this.EditFlag)
      this.$store.dispatch('EditItem', {
        name: name,
        id: id
      })
    },
    Add (name) {
      this.$store.dispatch('AddItem', name)
    },
    Delete (i) {
      this.$store.dispatch('DeleteItem', i)
    },
    FirstGetTodo () {
      this.$store.dispatch('FirstGetTodo')
    },
    GetMoreTodo (LastId) {
      this.$store.dispatch('GetMoreTodo', LastId)
    },
    Change (id) {
      this.EditFlag = !this.EditFlag
      this.$EventBus.$emit('idSend', id, this.EditFlag)
    },
    Complete (id) {
      this.CompleteFlag = !this.CompleteFlag
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
</style>
