<template>
  <router-view/>
</template>

<script>

export default {
  components: {  },
}
</script>

<style>
#app {
  display: flex;
  flex-direction: row;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
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
