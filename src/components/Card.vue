<template>
  <div class="card card-wrapper">
    <div class="card-header">
      <div class="card-header_title">
        <slot name="title"></slot>
      </div>
      <div class="card-header_subtitle">
        <slot name="subtitle"></slot>
      </div>
    </div>
    <div class="card-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card"
}
</script>

<style lang="scss">
@import "../styles/mixins/card";
@import "../styles/mixins/box-shadow";

.card {
  @include card();
  padding: 20px;
  border: 1px solid darkgray;
  @include box-shadow(none);

  .card-header {
    display: flex;
    flex-direction: column;
    place-content: center flex-start;
    align-items: center;
    margin-bottom: 20px;

    > * {
      text-align: center;
    }

    .card-header_title {
      font-size: 2rem;
      font-weight: bold;
      line-height: 1.2;
      letter-spacing: 0.06rem;
      color: rgba(black, .8);
    }

    .card-header_subtitle {
      font-size: 1.2rem;
      line-height: 1.2;
      color: grey;
    }
  }
}
</style>
