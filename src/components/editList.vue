<template>
    <b-form
      v-if="MainEditFlag && todoss.id === id"
      :class="MainEditFlag ? 'as' : 'bs'"
      @submit="Deliverer(name,todoss.id)">
        <b-input-group>
            <b-form-input
                type="text"
                maxlength="40"
                v-show="MainEditFlag"
                :value="todoss.name"
                v-model="name"
                @keyup.esc.native="reset()"
            />
            <b-input-group-append>
                <b-button
                    :pressed="false"
                    variant="success"
                    @click="Deliverer(name,todoss.id)"
                >수정</b-button>
                <b-button @click="Toggle()">취소</b-button>
            </b-input-group-append>
        </b-input-group>
    </b-form>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'edit',
  data () {
    return {
      name: '',
      id: 0,
      ElEditFlag: false
    }
  },
  props: {
    todoss: Object,
    Edit: Function,
    TagCheck: Function,
    BlankCheck: Function,
    MainEditFlag: Boolean
  },
  created () {
    this.$EventBus.$on('idSend', (ClickedId, EditFlag) => {
      this.id = ClickedId
      this.ElEditFlag = EditFlag
    })
    this.$EventBus.$on('NameSend', (name) => {
      this.name = this.inputcheck(name)
    })
  },
  methods: {
    Deliverer (name, Id) {
      if (name === null || name === '' || this.BlankCheck(name) === 0) {
        alert('공백만으로 이루어진 이름은 사용 불가능합니다')
        return false
      } else {
        this.Edit(this.TagCheck(name), Id)
      }
    },
    Toggle () {
      this.$emit('Cancel')
      this.$EventBus.$emit('FlagSend', this.ElEditFlag)
    },
    reset () {
      this.name = null
    },
    inputcheck (name) {
      // EditMode 활성화 중 input에서 <가 &lt;로 표시되는 것을 <로 표시되게 변경하는 역할
      let ParamName = name
      for (let i = 0; i < ParamName.length; i++) {
        let slice = ParamName.substr(i, 4)
        if (slice === '&lt;') ParamName = ParamName.replace('&lt;', '<')
        if (slice === '&gt;') ParamName = ParamName.replace('&gt;', '>')
      }
      return ParamName
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
  .as{
    padding:0.3rem 0
  }
  .bs{
    padding:0
  }
</style>
