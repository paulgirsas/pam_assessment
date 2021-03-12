<template>
  <div class="content-wrapper">
    <card class="game-card">
      <template v-slot:title><span class="game-title">ARXOTTO Game</span></template>
      <template v-slot:subtitle>May the luck be with you</template>
      <div class="numbers-picker_wrapper">
        <!-- Picker -->
        <div class="numbers-picker_picker-wrapper">
          <h4>Pick 5 winning numbers</h4>
          <button @click="quickPick" class="numbers-picker_picker_quick-pick-button">Quick Pick</button>
          <numbers-picker edit @number-clicked="onNumberClicked" :numbers-count="numbersCount"
                          :selected-numbers="allNumbersStatus"></numbers-picker>

        </div>
        <div class="vertical-divider"></div>
        <!-- Pick Preview -->
        <div class="numbers-picker_bet-preview">
          <div class="numbers-picker_bet-preview_header">
            <h4>Your Slip</h4>
            <bet-preview edit :key-prefix="betPrefix" :selected-numbers="chosenNumbers"
                         @number-delete="deleteChoiceClicked"></bet-preview>
          </div>
          <button :class="['numbers-picker_submit-button', selectedNumbers.length === 5 ? '' : 'button-disabled']"
                  @click="submitSlip()">Submit
          </button>
        </div>
      </div>
    </card>
  </div>
</template>

<script>
import Card from "../components/Card";
import NumbersPicker from "../components/NumbersPicker";
import BetPreview from "../components/BetPreview";
import {MutationTypes} from "../store";

export default {
  name: "Home",
  data() {
    return {
      numbersCount: 30,
      allNumbersStatus: new Array(30).fill(false),
      selectedNumbers: [],
      keyToggle: false
    };
  },
  computed: {
    chosenNumbers() {
      return this.selectedNumbers.map(number => {
        return {number, isHit: false, key: number};
      })
    },
    betPrefix() {
      return this.keyToggle ? 'This' : 'That';
    }
  },
  methods: {
    /**
     * Number Clicked from the Numbers picker. Update the clicked number's state according to it's current state.
     * @param number {number} The number clicked
     */
    onNumberClicked(number) {
      // Check if max selected numbers is to be exceeded.
      // Not storing index in a variable because the array is very small and only iterated twice.
      if (this.selectedNumbers.length >= 5 && this.selectedNumbers.indexOf(number) < 0) {
        return;
      }
      // Add or remove the clicked number accordingly.
      this.allNumbersStatus[number - 1] ?
          this.selectedNumbers.splice(this.selectedNumbers.indexOf(number), 1)
          : this.selectedNumbers.push(number);

      // Toggle the status of the clicked number.
      this.$set(this.allNumbersStatus, number - 1, !this.allNumbersStatus[number - 1]);
    },
    /**
     * The specified number's delete action was invoked. Remove the specified number from selected numbers if it exists.
     * @param number {number} The number to remove.
     */
    deleteChoiceClicked(number) {
      const index = this.selectedNumbers.indexOf(number);
      if (index < 0) {
        return;
      }
      this.selectedNumbers.splice(index, 1);
      // Toggle the status of the clicked number
      this.$set(this.allNumbersStatus, number - 1, !this.allNumbersStatus[number - 1]);
    },
    quickPick() {
      const hadSelected = !!this.selectedNumbers.length
      this.selectedNumbers.slice().forEach(number => this.deleteChoiceClicked(number));
      this.keyToggle = !this.keyToggle;
      setTimeout(() => {
        for (let i = 0; i < 5; i++) {
          let randomNumber;
          do {
            // Get Random number 1 - 30 inclusive.
            randomNumber = Math.random() * 30 + 1;
            // Convert to integer
            randomNumber = randomNumber - (randomNumber % 1);
          } while (this.selectedNumbers.indexOf(randomNumber) >= 0)
          this.onNumberClicked(randomNumber);
        }
      }, hadSelected ? 400 : 0);
    },
    /**
     * Submit the selected bet slip (selected numbers).
     */
    submitSlip() {
      // Check Validity
      if (this.selectedNumbers.length !== 5) {
        // TODO: When Toasts are ready show message.
        return;
      }
      // Update Store
      this.$store.commit(MutationTypes.updateSlip, {slip: this.chosenNumbers});
      this.$router.push('/live-draw');
    }
  },
  components: {BetPreview, NumbersPicker, Card}
}
</script>

<style lang="scss">
.content {
  background-color: lighten(lightgray, 10);
}
</style>

<style lang="scss" scoped>
@import "../styles/mixins/buttons";

.content-wrapper {
  display: flex;

  .game-card {
    margin: 0 auto;

    .numbers-picker_wrapper {
      display: flex;
      place-content: stretch space-between;
      align-items: stretch;

      h4 {
        margin-top: 0;
        margin-bottom: 10px;
        color: grey;
        font-weight: normal;
      }

      .numbers-picker_picker-wrapper {
        display: flex;
        flex-direction: column;
        place-content: center flex-start;
        align-items: center;

        .numbers-picker_picker_quick-pick-button {
          @include raised-button(#FF0000);
          color: white;
          margin-bottom: 15px;
        }
      }

      .vertical-divider {
        width: 1px;
        background: lightgray;
        margin: 5% 20px;
      }

      .numbers-picker_bet-preview {
        display: flex;
        flex-direction: column;
        place-content: stretch space-between;
        align-items: stretch;
        min-width: 150px;

        .numbers-picker_bet-preview_header {
          display: flex;
          flex-direction: column;
          place-content: center flex-start;
          align-items: center;

          h4 {
            align-self: center;
            margin-bottom: 20px;
          }
        }

        .numbers-picker_submit-button {
          @include raised-button(#FF0000);
          align-self: flex-end;
          color: white;
        }
      }
    }
  }
}

.game-title {
  color: #FF0000;
}
</style>
