<template>
  <div>
    <header-logged-in id="header" />
    <slot />
  </div>
</template>

<script>
import headerLoggedIn from '../components/header-logged-in';
export default {
  name: 'logged-in',
  components: { headerLoggedIn }

};
</script>

<style scoped>
#header {
  z-index: 4;
}
</style>

