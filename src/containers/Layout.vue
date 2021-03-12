<template>
  <div class="content">
    <MainHeader class="header" />
    <router-view />
  </div>
</template>

<script>
import MainHeader from '@/components/MainHeader';

export default {
    name: 'Layout',
    components: { MainHeader }
};
</script>

<style lang="scss">

.content {
  position: relative;
  width: 100%;
  min-height: 100%;

  .header {
    position: sticky;
    top: 0;
    left: 0;
  }

  .content-wrapper {
    width: 100%;
    padding: 30px;
    box-sizing: border-box;
  }
}
</style>

<style scoped>

</style>
