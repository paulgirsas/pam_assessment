<template>
  <div class="nbp-wrapper">
    <template v-for="number in numbersCount">
    <span @click="onClick(number)"
          :class="['nbp-number-wrapper',{ 'nbp-number-selectable': editMode, 'nbp-number-hop': selected[number - 1] === undefined}, selected[number - 1] ? 'nbp-number-selected' : '']">
      {{ number }}
    </span>
    </template>
  </div>
</template>

<script>
export default {
  name: "numbers-picker",
  props: {
    numbersCount: Number,
    selectedNumbers: Array,
    edit: Boolean
  },
  computed: {
    selected() {
      return this.selectedNumbers;
    },
    editMode() {
      return this.edit;
    }
  },
  methods: {
    onClick(number) {
      this.$emit('number-clicked', number);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/mixins/transition";

.nbp-wrapper {
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  grid-gap: 10px;

  .nbp-number-wrapper {
    width: 1.1rem;
    height: 1.1rem;
    box-sizing: content-box;
    padding: 5px;
    text-align: center;
    font-size: 1rem;
    line-height: 1.1;
    color: #FF0000;
    border: 1px solid #FF0000;
    border-radius: 50%;
    cursor: default;
    pointer-events: none;
    @include transition(all .3s ease-in-out);

    &.nbp-number-selectable {
      cursor: pointer;
      pointer-events: auto;
    }

    &.nbp-number-selected {
      color: white;
      border-color: darkblue;
      background-color: darkblue;
    }
  }
}
</style>
