<template>
    <div class="listwrap">
      <p-check
          class="p-svg p-round p-smooth lefter"
          color="success"
          v-show="!this.LiEditFlag"
          v-model="FakeCompleteFlag"
      >
        <!-- svg path -->
        <svg slot="extra" class="svg svg-icon" viewBox="0 0 20 20">
            <path
            d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,
            0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,
            0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,
            0.911L7.629,14.566z"
            style="stroke: white;fill:white"/>
        </svg>
    </p-check>
      <span
        v-show="!this.LiEditFlag"
        v-html="todoss.name"
        :class="FakeCompleteFlag ? 'complete' : 'ing'"
        @click="changeEditMode(todoss.id, todoss.name)"
      />
      <div class="rightbox">
        <b-button
            class="btn"
            variant='outline-primary'
            v-show="!this.LiEditFlag"
            :disabled="FakeCompleteFlag"
            @click="changeEditMode(todoss.id, todoss.name)"
        >수정</b-button>
        <b-button
          class="btn"
          variant='danger'
          v-show="!this.LiEditFlag"
          @click="Delete(todoss.id)"
        >삭제</b-button>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'listItem',
  data () {
    return {
      id: 0,
      LiEditFlag: false,
      FakeCompleteFlag: this.CompleteFlag
    }
  },
  props: {
    todoss: Object,
    Edit: Function,
    Delete: Function,
    MainEditFlag: Boolean,
    CompleteFlag: Boolean
  },
  methods: {
    changeEditMode (ClickedId, name) {
      this.$EventBus.$emit('NameSend', name)
      if (this.todoss.id === ClickedId) this.$emit('changeMode')
      this.LiEditFlag = true
    }
  },
  computed: {
    ...mapGetters({
      lists: 'lists'
    })
  },
  created () {
    this.$EventBus.$on('FlagSend', (EditFlag) => {
      this.LiEditFlag = EditFlag
    })
  }
}
</script>

<style>
  .a{
    float: left;
  }
  .lefter{
    float: left;
    margin-top:0.7rem;
  }
  .listwrap{
    padding:0.5rem 0;
  }
  .ing{
    display:inline-block;
    margin-top:0.5rem;
    margin-left:3.5rem;
    font-weight:bold;
    cursor: pointer;
  }
  .complete{
    display:inline-block;
    margin-top:0.5rem;
    color:#BDBDBD;
    text-decoration:line-through;
    margin-left:3.5rem;
    font-weight:bold;
  }
  .rightbox{
    float:right
  }
  .none{
    display:none
  }
  .btn{
    cursor: pointer;
  }
  .DisableBtn{
    cursor:not-allowed;
  }
</style>
