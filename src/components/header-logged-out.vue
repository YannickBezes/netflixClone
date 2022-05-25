<template>
  <router-link to="/" class="header">
    <img src="https://i.ibb.co/WtPHrz9/netflix-logo-png-2562-1.png" alt="Logo">
  </router-link>
</template>

<script>
export default {
  name: 'header-logged-out'
};
</script>

<style scoped>
.header {
  position: absolute;
  width: 200px;
  z-index: 1;
}

.header img {
  width: 80%;
  margin-top: 22px;
  margin-left: 48px;
}
</style>
