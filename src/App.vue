<template>
  <div id="snow-container"></div>
  <AppNotification></AppNotification>
  <router-view />
</template>

<script>
import AppNotification from '@/components/AppNotification.vue';
import { onMounted } from 'vue';
export default {
  components: { AppNotification },
  setup() {
    onMounted(() => {
      const month = new Date().getMonth() // it'll snow from November through January
      if (month == 10 || month == 11 || month == 0) createSnow(30)
    })

    const random = (num) => {
      return Math.floor(Math.random() * num)
    }

    function getRandomStyles() {
      const top = random(100)
      const left = random(100)
      const dur = random(10) + 10
      const size = random(25) + 25
      return `
          top: -${top}%;
          left: ${left}%;
          font-size: ${size}px;
          animation-duration: ${dur}s;
          `
    }

    function createSnow(num) {
      const snowContainer = document.getElementById("snow-container")
      const snowContent = ['&#10052', '&#10053', '&#10054']
      for (var i = num; i > 0; i--) {
        var snow = document.createElement("div")
        snow.className = "snow"
        snow.style.cssText = getRandomStyles()
        snow.innerHTML = snowContent[random(2)]
        snowContainer.append(snow)
      }
    }

    return { createSnow }
  }

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
  font-family: "Fira Sans", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* color: #2c3e50; */
}

#main-content {
  flex: 100%;
  padding: 20px 10%;
  overflow-x: auto;
}


</style>
