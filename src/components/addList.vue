<template>
    <b-form class="addform" @submit="Deliverer(name)">
        <b-input-group>
            <b-form-input
                id="lister"
                type="text"
                maxlength="40"
                placeholder="Press ESC => Input Reset. (Edit Input is Same)"
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
    Add: Function,
    TagCheck: Function,
    BlankCheck: Function
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
      if (this.name === null || this.name === '' || this.BlankCheck(name) === 0) {
        alert('공백만으로 이루어진 이름은 사용 불가능합니다')
        return false
      } else {
        this.Add(this.TagCheck(name))
        this.reset()
      }
    }
  }
}
</script>
