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
                  @Cancel="Cancel(todoss.id)"
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
              <b-btn style="margin-left:-140px" @click="GetMoreTodo(lists.length, 5)">More(5)</b-btn>
              <b-btn @click="GetMoreTodo(lists.length, 20)">More(20)</b-btn>
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
      AddCounter: 0,
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
    // Load
    FirstGetTodo () {
      this.$store.dispatch('FirstGetTodo', this.ErrorChecker)
    },
    GetMoreTodo (LastId, limit) {
      this.$store.dispatch('GetMoreTodo', {LastId: LastId, ErrorChecker: this.ErrorChecker, limit: limit})
      if (this.EditFlag === true) {
        this.EditFlag = !this.EditFlag
        this.$EventBus.$emit('FlagSend', this.EditFlag)
      }
    },
    // Add
    Add (name) {
      this.AddCounter++
      this.$store.dispatch('AddItem', { name: name, AddCounter: this.AddCounter })
    },
    // Delete
    Delete (i) {
      this.$store.dispatch('DeleteItem', {id: i, ErrorChecker: this.ErrorChecker})
    },
    // Edit
    Edit (name, id) {
      this.EditFlag = !this.EditFlag
      this.$EventBus.$emit('FlagSend', this.EditFlag)
      this.$store.dispatch('EditItem', {
        name: name,
        id: id,
        ErrorChecker: this.ErrorChecker
      })
    },
    // Save & Cancel
    Change (id) {
      if (this.EditFlag) {
        this.EditFlag = false
        this.$EventBus.$emit('FlagSend', this.EditFlag)
      }
      this.EditFlag = true
      this.$EventBus.$emit('idSend', id, this.EditFlag)
    },
    Cancel (id) {
      this.EditFlag = false
      this.$EventBus.$emit('idSend', id, this.EditFlag)
    },
    // Complete Todo
    Complete (id) {
      this.CompleteFlag = !this.CompleteFlag
    },
    // ErrorCheck method
    ErrorChecker (eCode) {
      let msg = `Error Has Occurred. From `
      eCode > 400 && eCode < 500
        ? msg += `Client`
        : eCode > 500
          ? msg += `Server`
          : msg = `???`
      return msg
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
