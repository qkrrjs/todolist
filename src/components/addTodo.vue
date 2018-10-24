<template>
    <b-form class="addform" @submit="Deliverer(name)">
        <b-input-group>
            <b-form-input
                id="lister"
                type="text"
                maxlength="40"
                placeholder="What needs to be done?"
                v-model="name"
                @keyup.esc.native="reset()"
            />
            <b-input-group-append>
                <b-btn
                  variant="info"
                  @click="Deliverer(name)">
                  추가
            </b-btn>
            </b-input-group-append>
        </b-input-group>
    </b-form>
</template>

<script>
export default {
  name: 'addTodo',
  props: {
    Add: Function
  },
  data () {
    return {
      name: ''
    }
  },
  methods: {
    reset () {
      this.name = null
    },
    Deliverer (name) {
      this.Add(name, false, false)
      this.reset()
    }
  }
}
</script>
