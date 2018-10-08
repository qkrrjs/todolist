<template>
    <div class="listwrap">
      <div class="a">
      <p-check
          class="p-svg p-round p-smooth lefter"
          color="success"
          v-show="this.Editer === false"
          v-model="FakeCompleteFlag"
      >
        <!-- svg path -->
        <svg slot="extra" class="svg svg-icon" viewBox="0 0 20 20">
            <path d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"
            style="stroke: white;fill:white"></path>
        </svg>
    </p-check>
    </div>
      <!-- <p-check class="p-icon p-round p-jelly" color="primary">
        <i slot="extra" class="icon mdi mdi-check"></i>
        Interested
    </p-check> -->
      <span
        v-show="!this.Editer"
        v-html="todoss.name"
        :class="FakeCompleteFlag ? 'complete' : 'ing'"
      />
      <div class="rightbox">
        <b-button
            class="btn"
            variant='outline-primary'
            v-show="!this.Editer"
            @click="changeEditMode(todoss.id, todoss.name)"
        >수정</b-button>
        <b-button
          class="btn"
          variant='danger'
          style="cursor:pointer"
          v-show="!this.Editer"
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
      Editer: false,
      FakeCompleteFlag: this.CompleteFlag
    }
  },
  props: {
    todoss: Object,
    Edit: Function,
    Delete: Function,
    EditFlag: Boolean,
    CompleteFlag: Boolean
  },
  methods: {
    changeEditMode (id, name) {
      this.$EventBus.$emit('NameSend', name)
      if (this.todoss.id === id) {
        this.Editer = true
        this.$emit('changeMode')
      }
    }
  },
  computed: {
    ...mapGetters({
      lists: 'lists'
    })
  },
  created () {
    this.$EventBus.$on('FlagSend', (EditFlag) => {
      this.Editer = EditFlag
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
  }
  .complete{
    display:inline-block;
    margin-top:0.5rem;
    color:#e6e6e6;
    text-decoration:line-through;
    margin-left:-3.5rem;
  }
  .rightbox{
    float:right
  }
  .none{
    display:none
  }
</style>
