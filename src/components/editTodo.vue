<template>
    <b-form
      v-if="MainEditFlag && todoss.id === clickedId"
      :class="MainEditFlag ? 'Edit' : 'Normal'"
      @submit="Deliverer(name,todoss.id)">
        <b-input-group>
            <b-form-input
                type="text"
                maxlength="40"
                v-show="MainEditFlag"
                :value="todoss.name"
                v-model="name"
                @keyup.esc.native="Cancel(name,todoss.id)"
            />
        </b-input-group>
    </b-form>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'editTodo',
  data () {
    return {
      name: '',
      id: 0
    }
  },
  props: {
    todoss: Object,
    Edit: Function,
    MainEditFlag: Boolean,
    clickedId: Number
  },
  methods: {
    Deliverer (name, Id) {
      // if (name.replace(/\s/g, '') === '') {
      //   console.log(this.lists.findIndex(lists => lists.id === Id))
      //   this.Edit(this.replacer(this.lists[this.lists.findIndex(lists => lists.id === Id)].name), Id)
      // } else {
      //   this.Edit(this.replacer(name), Id)
      // }
      this.Edit(name, Id)
    },
    Cancel () {
      this.$emit('changer', null, false)
      this.$emit('changeMode')
    },
    replacer (name) {
      name = name.replace(/</g, '&lt;')
      name = name.replace(/>/g, '&gt;')
      return name
    }
  },
  computed: {
    ...mapGetters({
      lists: 'lists'
    })
  }
}
</script>
<style lang="scss" scoped>
  .Edit {
    padding: 0 0;
  }
  .Normal {
    padding: 0;
  }
</style>
