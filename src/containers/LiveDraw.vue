<template>
  <div class="content-wrapper">
    <card class="draw-card">
      <template v-slot:title><span class="draw-title">ARXOTTO Game</span></template>
      <template v-slot:subtitle>May the luck be with you</template>
      <div class="draw-content-wrapper">
        <!-- Picker -->
        <div class="draw-preview_wrapper">
          <h4>Live Draw</h4>
          <numbers-picker :numbers-count="numbersCount"
                          :selected-numbers="allNumbersStatus"></numbers-picker>

        </div>
        <div class="vertical-divider"></div>
        <!-- Pick Preview -->
        <div class="draw-preview_bet-preview">
          <h4>Your Slip</h4>
          <bet-preview :selected-numbers="chosenNumbers"></bet-preview>
        </div>
      </div>
    </card>
    <modal @close-modal="onCloseModal($event)" v-if="modalMessage">
      <template v-slot:title><h2>{{ modalTitle }}</h2></template>
      <p>{{ modalMessage }}</p>
      <template v-if="finished" v-slot:footer>
        <div class="footer-actions">
          <button class="raised-button" @click="onCloseModal('go-back')">Go Back</button>
          <button class="raised-button" @click="onCloseModal('save')">Save</button>
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
import NumbersPicker from "../components/NumbersPicker";
import BetPreview from "../components/BetPreview";
import Card from "../components/Card";
import {ActionTypes as ActionsTypes, MutationTypes, store} from "../store";
import {timer} from 'rxjs';
import {map, take} from 'rxjs/operators'
import Modal from "../components/Modal";

export default {
  name: "live-draw",
  data() {
    return {
      drawnNumbers: [],
      numbersCount: 30,
      subscription: null,
      allNumbersStatus: new Array(30).fill(false),
      modalMessage: '',
      modalTitle: '',
      finished: false
    }
  },
  beforeRouteEnter(to, from, next) {
    if (!store.state.currentSlip || store.state.currentSlip.length <= 0) {
      next('/');
    } else {
      next();
    }
  },
  beforeRouteLeave(to, from, next) {
    if (!this.finished) {
      this.modalTitle = 'Error';
      this.modalMessage = 'Wait for the Live Draw to finish in order to leave the page. Leaving before that is prohibited.';
    } else {
      next();
    }
  },
  created() {
    this.subscription = timer(3000, 4000)
        .pipe(map((count) => {
          let randomNumber;
          do {
            randomNumber = Math.random() * 30 + 1;
            randomNumber = randomNumber - (randomNumber % 1);
          } while (this.drawnNumbers.indexOf(randomNumber) >= 0);
          return {number: randomNumber, count: count + 1};
        }), take(5))
        .subscribe((data) => {
          this.$set(this.allNumbersStatus, data.number - 1, !this.allNumbersStatus[data.number - 1])
          this.drawnNumbers.push(data.number);
          if (data.count === 5) {
            setTimeout(() => {
              // Finish Up Draw and show modal.
              this.finishDraw();
            }, 500);
          }
        });
  },
  beforeDestroy() {
    this.subscription?.unsubscribe();
    this.$store.commit(MutationTypes.deleteSlip)
  },
  computed: {
    draw() {
      return this.drawnNumbers;
    },
    selectedNumbers() {
      return this.$store.state.currentSlip;
    },
    chosenNumbers() {
      return this.selectedNumbers.map((chosen) => {
        return {...chosen, isHit: this.allNumbersStatus[chosen.number - 1]};
      });
    },
    message() {
      return this.modalMessage;
    },
    title() {
      return this.modalTitle;
    }
  },
  methods: {
    finishDraw() {
      this.subscription?.unsubscribe();
      const hits = this.chosenNumbers.filter(choice => choice.isHit);
      if (!hits.length) {
        this.modalMessage = 'Your bet slip lost you had no hits';
        this.modalTitle = 'You lost';
      } else if (hits.length <= 3) {
        this.modalMessage = 'You almost won, your hits were ' + hits.map((choice, index) => choice.number).join(', ') + '.';
        this.modalTitle = 'You lost';
      } else {
        switch (hits.length) {
          case 3:
            this.modalTitle = 'You Won';
            this.modalMessage = 'You won 5€, your winning numbers were: ' + hits.map((choice, index) => choice.number).join(', ') + '.';
            break;
          case 4:
            this.modalTitle = 'You Won';
            this.modalMessage = 'You won 10€, your winning numbers were: ' + hits.map((choice, index) => choice.number).join(', ') + '.';
            break;
          case 5:
            this.modalTitle = 'You Won';
            this.modalMessage = 'You won 20€, your winning numbers were: ' + hits.map((choice, index) => choice.number).join(', ') + '.';
            break;
        }
      }
      this.finished = true;
    },
    onCloseModal(data) {
      this.modalTitle = '';
      this.modalMessage = '';
      if (data === 'save') {
        this.$store.dispatch(ActionsTypes.saveHistoryItem)
        this.$router.replace('/');
      } else if (data === 'go-back') {
        this.$router.replace('/');
      } else if (this.finished) {
        this.$router.replace('/');
      }
    }
  },
  components: {Modal, BetPreview, NumbersPicker, Card}
}
</script>

<style lang="scss" scoped>
@import "../styles/mixins/buttons";

.content-wrapper {
  display: flex;

  .draw-card {
    margin: 0 auto;

    .draw-title {
      color: #FF0000;
    }

    .draw-content-wrapper {
      display: flex;
      place-content: stretch space-between;
      align-items: stretch;

      h4 {
        margin-top: 0;
        margin-bottom: 20px;
        font-weight: normal;
        color: grey;
      }

      .draw-preview_wrapper {
        display: flex;
        flex-direction: column;
        place-content: center flex-start;
        align-items: center;
      }

      .draw-preview_bet-preview {
        min-width: 150px;
        display: flex;
        flex-direction: column;
        place-content: center flex-start;
        align-items: center;
      }
    }
  }

  .footer-actions {
    display: flex;
    flex-direction: row;
    place-content: center space-between;
    align-items: center;

    .raised-button {
      @include raised-button(#FF0000);
      color: white;
    }
  }
}

</style>
