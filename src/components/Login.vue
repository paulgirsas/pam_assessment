<template>
  <div class="login-form">
    <h2 class="title">
      Welcome to ARXOTTO Game
    </h2>
    <h4>Sign In</h4>
    <span
      v-show="requestError"
      class="error-message"
    >
      {{ requestError }}
    </span>
    <div :class="[emailError ? 'has-error' : '', 'input-wrapper']">
      <input
        id="email"
        v-model="email"
        name="email"
        type="text"
        placeholder="Email"
      >
      <span
        v-show="emailError"
        class="input-error"
      >
        {{ emailError }}
      </span>
    </div>
    <div :class="[passwordError ? 'has-error' : '', 'input-wrapper']">
      <input
        id="password"
        v-model="password"
        name="password"
        type="password"
        placeholder="Password"
      >
      <span
        v-show="passwordError"
        class="input-error"
      >
        {{ passwordError }}
      </span>
    </div>
    <button
      class="submit-button"
      @click="login"
    >
      Login
    </button>
    <router-link
      class="login-form_register-button"
      to="./register"
    >
      Register
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
.login-form {
  display: flex;
  flex-direction: column;
  place-content: stretch start;

  .login-form_register-button {
    margin-top: 5px;
    align-self: center;
    color: rgba(black, .8);
    text-decoration: none;
  }
}
</style>

<script>
import { required } from '@/helpers/validators';
import { MutationTypes } from '@/store';
import { requireUnauthenticated } from '@/routing/app.guards';
import { mapActions } from 'vuex';

export default {
    name: 'Login',
    beforeRouteEnter: requireUnauthenticated,
    data () {
        return {
            email: '',
            password: '',
            emailError: null,
            passwordError: null,
            requestError: null,
        };
    },
    methods: {
        ...mapActions([ 'signInAction' ]),
        login () {
            this.emailError = this.passwordError = this.requestError = null;
            this.passwordError = '';
            // Check Email Required
            if (!required(this.email)) {
                this.emailError = 'Email is required';
            }

            // Check Password Required
            if (!required(this.password)) {
                this.passwordError = 'Password is required';
            }

            // Check Form is valid
            if (!this.emailError && !this.passwordError) {
                this.signInAction({ email: this.email, password: this.password });
            }
        }
    }
};
</script>
