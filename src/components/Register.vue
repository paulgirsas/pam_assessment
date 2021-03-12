<template>
  <div class="register-form">
    <h2 class="title">
      Create ARXOTTO Game Account
    </h2>
    <h4>May the luck be with you!</h4>
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
        v-model="password"
        name="new-password"
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
    <div :class="[confirmError ? 'has-error' : '', 'input-wrapper']">
      <input
        v-model="confirmPassword"
        name="confirm-password"
        type="password"
        placeholder="Confirm Password"
      >
      <span
        v-show="confirmError"
        class="input-error"
      >
        {{ confirmError }}
      </span>
    </div>
    <button
      class="submit-button"
      @click="register"
    >
      Register
    </button>
  </div>
</template>

<style lang="scss" scoped>
.register-form {
  display: flex;
  flex-direction: column;
  place-content: stretch start;
}
</style>

<script>
import { minLengthFactory, required } from '@/helpers/validators';
import { requireUnauthenticated } from '@/routing/app.guards';
import { email } from '../helpers/validators';
import firebase from 'firebase/app';
import { mapActions } from 'vuex';

export default {
    name: 'Register',
    beforeRouteEnter: requireUnauthenticated,
    data () {
        return {
            email: '',
            password: '',
            confirmPassword: '',
            emailError: null,
            passwordError: null,
            confirmError: null,
            requestError: null,
        };
    },
    methods: {
        ...mapActions([ 'signUpAction' ]),
        checkPasswordLength () {
            return minLengthFactory(6)(this.password);
        },
        register () {
            this.emailError = this.passwordError = this.requestError = this.confirmError = null;
            // Check Email Required
            if (!required(this.email)) {
                this.emailError = 'Email is required';
            }

            // Check Email Validity
            if (!email(this.email)) {
                this.emailError = 'Email is invalid';
            }

            // Check Password Required
            if (!required(this.password)) {
                this.passwordError = 'Password is required';
            }

            // Check Password length
            if (!this.passwordError && !this.checkPasswordLength()) {
                this.passwordError = 'Password should be at least 6 characters long.';
            }

            // Check Password Confirmation.
            if (!this.passwordError && (!required(this.confirmPassword) || this.password !== this.confirmPassword)) {
                this.confirmError = 'Passwords do not match!';
            }

            // Check Form is valid
            if (!this.emailError && !this.passwordError) {
                this.signUpAction({ email: this.email, password: this.password });
            }
        }
    }
};
</script>
