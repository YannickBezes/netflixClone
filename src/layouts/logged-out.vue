<template>
  <div>
    <header-logged-out />
    <slot />
  </div>
</template>

<script>
import headerLoggedOut from '../components/header-logged-out';

export default {
  name: 'logged-out',
  components: { headerLoggedOut }
};
</script>
