<template>
    <b-form v-if="MainEditFlag === true && todoss.id === id">
        <b-input-group>
            <b-form-input
                class="a"
                type="text"
                v-show="MainEditFlag === true"
                :value="todoss.name"
                v-model="name"
                @keyup.enter.native="Edit(name,todoss.id)"
            />
            <b-input-group-append>
                <b-button
                    :pressed="false"
                    variant="success"
                    @click="Edit(name,todoss.id)"
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
    Toggle () {
      this.$emit('changeMode')
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
