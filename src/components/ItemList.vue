<template>
    <div>
      <div
        class="CompleteCover"
        @click="changeComplete()"
      >
          <p-check
              class="p-svg p-round p-smooth lefter"
              color="success"
              v-show="!MainEditFlag && !viewFlag || todoss.id !== clickedId && !viewFlag"
              v-model="todoss.complete"
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
      </div>
      <div
        class="listwrap"
        @dblclick="changeEditMode(todoss.id, true, todoss.complete)"
        >
        <span
          v-show="!MainEditFlag && !viewFlag || todoss.id !== clickedId && !viewFlag"
          v-html="todoss.name"
          :class="todoss.complete ? 'complete' : 'ing'"
        />
        <div class="rightbox">
          <b-button
            class="btn"
            variant='danger'
            v-show="!MainEditFlag && !viewFlag || todoss.id !== clickedId && !viewFlag"
            @click="Delete(todoss.id)"
          >삭제</b-button>
        </div>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ItemList',
  data () {
    return {
      id: 0,
      LiEditFlag: false
    }
  },
  props: {
    todoss: Object,
    Edit: Function,
    Delete: Function,
    MainEditFlag: Boolean,
    clickedId: Number,
    viewFlag: Boolean
  },
  methods: {
    changeEditMode (clickid, flag, complete) {
      flag && !complete ? this.parentCaller(clickid, flag) : this.parentCaller(clickid, !flag)
    },
    parentCaller (clickid, flag) {
      this.$emit('changer', clickid, flag)
      this.$emit('changeMode')
    },
    changeComplete () {
      console.log(this.viewFlag)
      this.$emit('complete')
    }
  },
  computed: {
    ...mapGetters({
      lists: 'lists'
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
    padding:0;
  }
  .ing{
    display:inline-block;
    margin-top:0.5rem;
    margin-left:1rem;
    font-weight:bold;
    cursor: pointer;
  }
  .complete{
    display:inline-block;
    margin-top:0.5rem;
    color:#BDBDBD;
    text-decoration:line-through;
    margin-left:1rem;
    font-weight:bold;
  }
  .rightbox{
    float:right;
  }
  .none{
    display:none;
  }
  .btn{
    cursor: pointer;
  }
  .DisableBtn{
    cursor:not-allowed;
  }
</style>
