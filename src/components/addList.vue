<template>
    <b-form class="addform" @submit="Deliverer(name)">
        <b-input-group>
            <b-form-input
                id="lister"
                type="text"
                maxlength="40"
                placeholder="Press Esc = Input Reset"
                v-model="name"
                @keyup.esc.native="reset()"
                @focus.native="$emit('EditModeCancel')"
            />
            <b-input-group-append>
                <b-btn
                  variant="info"
                  @click="Deliverer(name)">
                추가</b-btn>
            </b-input-group-append>
        </b-input-group>
    </b-form>
</template>

<script>
export default {
  name: 'addLister',
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
      this.Add(name)
      this.reset()
    }
  }
}
</script>
