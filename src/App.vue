<template>
  <AppNotification></AppNotification>
  <router-view/>
</template>

<script>
import AppNotification from '@/components/AppNotification.vue';
export default {
    components: { AppNotification }
}
</script>

<style>

@font-face {
  font-family: "Fira Sans";
  src: url(@/assets/fonts/FiraSans-Regular.woff2);
  font-weight: 400;
}
@font-face {
  font-family: "Fira Sans";
  src: url(@/assets/fonts/FiraSans-Medium.woff2);
  font-weight: 700;
}
@font-face {
  font-family: "Fira Sans";
  src: url(@/assets/fonts/FiraSans-Light.woff2);
  font-weight: 100;
}
#app {
  display: flex;
  flex-direction: row;
  height: 100%;
  font-family: "Fira Sans", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#main-content {
  flex: 100%;
  padding: 20px 10%;
  overflow-x: auto;
}

</style>
