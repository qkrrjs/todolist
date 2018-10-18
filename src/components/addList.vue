<template>
    <b-form class="addform" @submit="Deliverer(name)">
        <b-input-group>
            <b-form-input
                id="lister"
                type="text"
                maxlength="40"
                v-model="name"
                @keyup.enter.native="reset()"
            />
            <b-input-group-append>
                <b-btn variant="info" @click="Deliverer(name)">추가</b-btn>
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
    BlankCheck (name) {
      let ValueChecker = 0
      for (let i = 0; i < name.length; i++) {
        if (name.charAt(i) !== ` `) ValueChecker++
        else continue
      }
      return ValueChecker
    },
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
