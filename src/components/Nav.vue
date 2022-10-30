<template>
    <div class="wl-nav">
        <h3>Wishr</h3>
        <router-link :to="{'name': 'home'}" class="wl-link"><i class="iconoir-home-simple-door"></i>Home</router-link>
        <router-link :to="{'name': 'wl-create'}" class="wl-link"><i class="iconoir-open-book"></i>Create Wishlist</router-link>
        <router-link :to="{'name': 'profile'}" class="wl-link"><i class="iconoir-profile-circled"></i>My Profile</router-link>
        <router-link :to="{'name': 'about'}" class="wl-link"><i class="iconoir-question-mark-circle"></i>About</router-link>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style>
    .wl-nav {
        min-width: 215px;
        color: #eee;
        background-color: #212529;
        padding: 16px;
        height: initial;
        position: relative;
    }
    .wl-link {
        display: block;
        padding: 12px;
        cursor: pointer;
        border-radius: 8px;
        color: white;
        text-decoration: none;
    }
    .wl-link i {
        display: inline-block;
        margin-right: 10px;
        margin-top:2px;
        margin-bottom: -5px;
        font-size: 22px;
    }
    .wl-nav .router-link-exact-active {
        background-color: #0059e3;
    }
    .wl-nav h3 {
        font-size: 28px;
        padding: 0 0 16px 0;
        margin-top: 0;
        border-bottom: 1px solid rgb(250, 250, 250, 0.5);
    }
</style>