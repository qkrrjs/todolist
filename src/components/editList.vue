<template>
    <b-form v-if="EditFlag === true && todoss.id === id">
        <b-input-group>
            <b-form-input
                class="a"
                type="text"
                v-show="EditFlag === true"
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
                <b-button @click="toggle()">취소</b-button>
            </b-input-group-append>
        </b-input-group>
        {{FakeEditFlag}}
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
      FakeEditFlag: null
    }
  },
  props: {
    todoss: Object,
    Edit: Function,
    EditFlag: Boolean
  },
  created () {
    this.$EventBus.$on('idSend', (id, EditFlag) => {
      console.log(`editer value is :${id}`)
      console.log(`Complete value : ${EditFlag}`)
      this.id = id
      this.FakeEditFlag = EditFlag
    })
  },
  methods: {
    toggle () {
      this.$emit('changeMode')
    }
  },
  computed: {
    ...mapGetters({
      lists: 'lists'
    })
  }
}
</script>
