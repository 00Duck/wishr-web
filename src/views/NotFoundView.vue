<template>
    <div class="container mt-3">
        <div class="wl-not-found-container">
            <h1>404 Not Found</h1>
            <div class="wl-not-found-bg"></div>
            <p>Whatever you were trying to do didn't work.</p>
            <div class="wishr-btn theme-primary-bg wl-not-found-btn" @click="router.push({name: 'home'})"><i class="iconoir-home-simple-door"></i><span>Go back home</span></div>
        </div>
    </div>
</template>
<script>
import { useRouter } from 'vue-router';

export default {
    setup() {
        const router = useRouter()

        return { router }
    }
}
</script>
<style>
.wl-not-found-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    height: 85%;
    gap: 20px;
}
.wl-not-found-container h1 {
    font-size: 50px;
    margin: 2% auto 0 auto; 
}
.wl-not-found-bg {
    mask: url(@/assets/not-found.svg);
    mask-size:contain;
    mask-repeat: no-repeat;
    mask-position: center;
    display: flex;
    align-self:center;
    width: 100%;
    height: 350px;
    background: #ddd;
    margin: auto;
}
.wl-not-found-btn {
    white-space: nowrap;
    max-width: 350px;
}
</style>