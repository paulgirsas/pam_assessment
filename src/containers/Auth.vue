<template>
  <div class="content">
    <div class="auth-card">
      <router-view></router-view>
    </div>
    <modal @close-modal="onCloseModal()" v-if="!!errorMessage">
      <template v-slot:title><h2 class="error-title">Error</h2></template>
      <p>{{ errorMessage }}</p>
    </modal>
  </div>
</template>

<script>
import Modal from "@/components/Modal";
import {MutationTypes} from "@/store";

export default {
  name: 'Auth',
  computed: {
    errorMessage() {
      return this.$store.state.error;
    },
  },
  methods: {
    onCloseModal() {
      this.$store.commit(MutationTypes.deleteError)
    }
  },
  components: {Modal}
}
</script>

<style lang="scss">
@import "../styles/mixins/card";
@import "../styles/mixins/buttons";

.content {
  .error-title {
    color: #FF0000;
  }

  .auth-card {
    @include card();

    .title {
      text-align: center;
    }

    .error-message {
      font-weight: bold;
      color: red;
      margin-bottom: 10px;
    }

    .input-wrapper {
      position: relative;
      height: 2rem;
      margin-bottom: 10px;
      padding: .3rem 0 1.3rem;
      box-sizing: content-box;

      input {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 0 0 0 1rem;
        line-height: 2rem;
        color: rgba(black, 0.8);
        vertical-align: middle;
        border: 2px solid rgba(black, 0.8);
        border-radius: 3px;
        background-color: transparent;
        outline: 0;
        transition: all .35s ease-in-out;
        -moz-transition: all .35s ease-in-out;
        -webkit-transition: all .35s ease-in-out;
        -o-transition: all .35s ease-in-out;

        &::placeholder {
          color: rgba(black, 0.8);
          transition: color .35s ease-in-out;
          -moz-transition: color .35s ease-in-out;
          -webkit-transition: color .35s ease-in-out;
          -o-transition: color .35s ease-in-out;
        }
      }

      .input-error {
        position: absolute;
        left: 0;
        bottom: 0;
        font-size: .8rem;
        color: red;
      }

      &.has-error {
        input {
          border-color: darken(red, 5);
          color: red;

          &::placeholder {
            color: red;
          }
        }
      }
    }

    .submit-button {
      @include raised-button(#FF0000);
      align-self: center;
      color: white;
    }
  }
}
</style>

<style lang="scss" scoped>
.content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  place-content: center flex-start;
  align-items: center;
  background-color: #FF0000;

  .auth-card {
    display: flex;
    flex-direction: column;
    place-content: stretch flex-start;
    align-items: stretch;
    padding: 20px;
    max-width: 400px;
    margin: auto 0;
  }
}
</style>
