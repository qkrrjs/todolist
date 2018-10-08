<template>
    <b-form class="addform" @submit="CheckNull(name)">
        <b-input-group>
            <b-form-input
                id="lister"
                type="text"
                v-model="name"
                @keyup.enter.native="reset()"
            />
            <b-input-group-append>
                <b-btn variant="info">추가</b-btn>
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
    CheckNull (name) {
      if (this.name === null || this.name === '') {
        alert('공백 입력은 불가능합니다')
      } else {
        this.Add(name)
      }
    }
  }
}
</script>
