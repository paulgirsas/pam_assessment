<template>
  <TransitionGroup
    name="bp-number"
    tag="div"
    class="bp-wrapper"
  >
    <div
      v-for="choice in selected"
      :key="choice.key"
      :class="[numberClasses, {'bp-number_hit': choice.isHit && !editMode}]"
    >
      <span>{{ choice.number }}</span>
      <FontAwesomeIcon
        :icon="['fas', 'times-circle']"
        size="xs"
        @click="deleteClicked(choice.number)"
      />
      <FontAwesomeIcon
        v-if="choice.isHit"
        class="bp-number_hit-mark"
        :icon="['fas', 'check-circle']"
        size="xs"
        @click="deleteClicked(choice.number)"
      />
    </div>
  </TransitionGroup>
</template>

<script>
export default {
    name: 'BetPreview',
    props: {
        selectedNumbers: {
            type: Array,
            default: function () {
                return [];
            }
        },
        edit: Boolean
    },
    computed: {
        selected () {
            return this.selectedNumbers;
        },
        editMode () {
            return this.edit;
        },
        numberClasses () {
            return {
                'bp-number': true,
                'bp-number_can-delete': this.editMode
            };
        }
    },
    methods: {
        deleteClicked (number) {
            this.$emit('number-delete', number);
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../styles/mixins/transition";

.bp-wrapper {
  display: flex;
  flex-direction: column;

  > *:not(:last-child) {
    margin-bottom: 10px;
  }

  .bp-number {
    position: relative;
    padding: 5px;
    font-size: 1rem;
    text-align: center;
    line-height: 1;
    border: 2px solid darkblue;
    border-radius: 50%;
    @include transition(all .25s ease-in-out);

    &.bp-number-enter, &.bp-number-leave-to {
      opacity: 0;
      transform: translateX(5rem);
    }


    span {
      display: block;
      width: 1rem;
      height: 1rem;
    }

    .svg-inline--fa {
      position: absolute;
      top: -6px;
      right: -6px;
      color: #FF0000;
      cursor: pointer;

      &.bp-number_hit-mark {
        top: -5px;
        right: -5px;
        color: green;
      }

      &:not(.bp-number_hit-mark) {
        display: none;
      }
    }

    &.bp-number_can-delete {
      .svg-inline--fa {
        display: block;
      }
    }

    &.bp-number_hit {
      color: green;
      border-color: green;
    }
  }
}
</style>
