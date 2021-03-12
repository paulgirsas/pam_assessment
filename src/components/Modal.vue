<template>
  <transition appear name="modal">
    <div @click.stop="close()" class="overlay-container">
      <div @click.stop class="modal-container">
        <div class="modal-header">
          <FontAwesomeIcon @click="close()" :icon="['fas', 'times']"
                           size="1x" class="modal-header_close-icon"></FontAwesomeIcon>
          <slot name="title"></slot>
        </div>
        <div class="modal-content">
          <slot></slot>
        </div>
        <div class="modal-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Modal",
  methods: {
    close(data) {
      this.$emit('close-modal', data);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/mixins/transition";

.overlay-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: rgba(black, .4);
  z-index: 1000;
  @include transition(all .4s ease-in-out);

  .modal-container {
    position: relative;
    min-width: 400px;
    margin: auto 0;
    padding: 20px;
    background-color: white;
    border-radius: 10px;
    @include transition(all .4s ease-in-out);

    > *:not(:last-child) {
      margin-bottom: 20px;
    }

    .modal-header {
      width: 100%;
      text-align: center;

      .modal-header_close-icon {
        position: absolute;
        top: 5px;
        right: 5px;
        padding: 5px;
        cursor: pointer;
      }
    }
  }

  &.modal-appear-active {
    @include transition(all .4s ease-in-out);

  }

  &.modal-enter, &.modal-leave-to {
    opacity: 0;

    .modal-container {
      transform: scale(0) rotateZ(360deg);
    }
  }
}
</style>
