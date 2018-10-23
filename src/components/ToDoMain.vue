<template>
    <b-container>
        <div class="hello">
              <h2 class="TitleName">TodoList</h2>
        </div>
        <addList
            :Add="Add"
            :TagCheck="TagCheck"
            :BlankCheck="BlankCheck"
            @EditModeCancel="EditModeCancel()"
          />
          <ul class="list-group">
            <li class="list-group-item" v-for="todoss in lists" :key="todoss.index">
               <editList
                  :todoss="todoss"
                  :Edit="Edit"
                  :MainEditFlag="EditFlag"
                  :TagCheck="TagCheck"
                  :BlankCheck="BlankCheck"
                  @changeMode="Change(todoss.id)"
                  @Cancel="Cancel(todoss.id)"
                />
               <itemList
                  :todoss="todoss"
                  :Edit="Edit"
                  :MainEditFlag="EditFlag"
                  :Delete="Delete"
                  @changeMode="Change(todoss.id)"
                  @Complete="Complete(todoss.id, todoss.Complete)"
                />
            </li>
            <li class="list-group-item">
              <span style="float:left">List items : ( {{lists.length}} )</span>
              <b-btn class="GetMoreBtn" @click="GetMoreTodo(lists.length, 5)">More(5)</b-btn>
              <b-btn @click="GetMoreTodo(lists.length, 20)">More(20)</b-btn>
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
      AddCounter: 0,
      EditFlag: false
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
      this.$store.dispatch('FirstGetTodo')
    },
    GetMoreTodo (LastId, limit) {
      this.$store.dispatch('GetMoreTodo', {LastId: LastId, limit: limit})
      // 현재 EditMode가 활성화 중이라면 비활성화
      this.EditModeCancel()
    },
    // Add
    Add (name) {
      this.AddCounter++
      this.$store.dispatch('AddItem', { name: name, AddCounter: this.AddCounter })
    },
    // Delete
    Delete (i) {
      this.$store.dispatch('DeleteItem', i)
    },
    // Edit
    Edit (name, id) {
      this.EditFlag = !this.EditFlag
      this.$EventBus.$emit('FlagSend', this.EditFlag)
      this.$store.dispatch('EditItem', {
        name: name,
        id: id
      })
    },
    EditModeCancel () {
      if (this.EditFlag) {
        this.EditFlag = false
        this.$EventBus.$emit('FlagSend', this.EditFlag)
      }
    },
    // Complete Toggle
    Complete (id, Complete) {
      this.$store.dispatch('CompleteItem', {Id: id, Complete: Complete})
    },
    // Save & Cancel
    Change (id) {
      // EditMode 활성화 상태일시 종료시킨 뒤 컴포넌트에 변경된 Flag전송
      this.EditModeCancel()
      this.EditFlag = true
      this.$EventBus.$emit('idSend', id, this.EditFlag)
    },
    Cancel (id) {
      this.EditFlag = false
      this.$EventBus.$emit('idSend', id, this.EditFlag)
    },
    // ( ADD , EDIT ) Input Checker
    //
    // Tag ->  '< >' check
    TagCheck (name) {
      let PassName = ``
      const ParamName = name
      for (let i = 0; i < ParamName.length; i++) {
        const OnePieceName = ParamName.charAt(i)
        OnePieceName === '<'
          ? PassName += '&lt;'
          : OnePieceName === '>'
            ? PassName += '&gt;'
            : PassName += OnePieceName
      }
      return PassName
    },
    // Blank (space) Check
    BlankCheck (name) {
      let ValueChecker = 0
      for (let i = 0; i < name.length; i++) {
        if (name.charAt(i) !== ` `) ValueChecker++
        else continue
      }
      return ValueChecker
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
.GetMoreBtn{
  margin-left:-130px;
}
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
