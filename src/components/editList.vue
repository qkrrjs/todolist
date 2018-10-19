<template>
    <b-form v-if="MainEditFlag === true && todoss.id === id">
        <b-input-group>
            <b-form-input
                class="a"
                type="text"
                maxlength="40"
                v-show="MainEditFlag === true"
                :value="todoss.name"
                v-model="name"
                @keyup.enter.native="CheckNull(name,todoss.id)"
            />
            <b-input-group-append>
                <b-button
                    :pressed="false"
                    variant="success"
                    @click="CheckNull(name,todoss.id)"
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
    MainEditFlag: Boolean
  },
  created () {
    this.$EventBus.$on('idSend', (ClickedId, EditFlag) => {
      console.log(`editer value is :${ClickedId}`)
      this.id = ClickedId
      this.ElEditFlag = EditFlag
    })
    this.$EventBus.$on('NameSend', (name) => {
      this.name = name
    })
  },
  methods: {
    CheckNull (name, Id) {
      if (name === null || name === '') {
        alert('공백 입력은 불가능합니다')
      } else {
        this.Edit(name, Id)
      }
    },
    Toggle () {
      this.$emit('Cancel')
      this.$EventBus.$emit('FlagSend', this.ElEditFlag)
    }
  },
  computed: {
    ...mapGetters({
      lists: 'lists'
    })
  }
}
</script>
