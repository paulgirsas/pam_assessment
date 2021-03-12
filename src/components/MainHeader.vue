<template>
  <div class="main-header_wrapper">
    <div class="main-header_navigation">
      <h2 class="main-header_title">
        ARXOTTO Game
      </h2>
      <router-link
        exact
        class="main-header_nav-link"
        to="/"
      >
        <span>Home</span>
      </router-link>
      <router-link
        class="main-header_nav-link"
        to="/live-draw"
      >
        <span>Live Draw</span>
      </router-link>
    </div>
    <div class="main-header_profile-wrapper">
      <FontAwesomeIcon
        :icon="['fas', 'user-circle']"
        size="3x"
      />
      <button
        class="main-header_profile_logout-button"
        @click="logout"
      >
        Logout
      </button>
    </div>
  </div>
</template>

<script>
import { MutationTypes } from '@/store';

export default {
    name: 'MainHeader',
    methods: {
        logout () {
            //TODO: Make request to backend.
            this.$store.commit(MutationTypes.deleteToken);
            this.$router.push('/auth/login');
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../styles/mixins/buttons";
@import "../styles/mixins/transition";
.main-header_wrapper {
  display: flex;
  flex-direction: row;
  place-content: stretch space-between;
  align-items: stretch;
  width: 100%;
  padding: 0 15px;
  color: white;
  background-color: #FF0000;
  box-sizing: border-box;

  .main-header_profile-wrapper {
    display: flex;
    flex-direction: row;
    place-content: center flex-end;
    align-items: center;
    justify-self: flex-end;

    > i {
      margin-right: 10px;
    }

    button {
      @include button(#FF0000);
      font-weight: bold;
      color: white;
      background-color: transparent;
      cursor: pointer;
    }

  }

  .main-header_navigation {
    display: flex;
    flex-direction: row;
    place-content: stretch flex-start;
    align-items: stretch;

    .main-header_title {
      margin-right: 20px;
    }

    .main-header_nav-link {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 0 10px;
      font-size: 1rem;
      color: white;
      text-decoration: none;
      @include transition(background-color .25s ease-in-out);

      &.active {
        font-weight: bold;
        background-color: darken(#FF0000, 5);
      }

      &:hover {
        background-color: darken(#FF0000, 5);
      }
    }
  }
}
</style>
