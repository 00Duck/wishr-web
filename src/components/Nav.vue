<template>
    <nav class="navbar navbar-dark navbar-expand-lg bg-dark">
        <div class="container-fluid">
            <router-link :to="{ 'name': 'home' }" class="navbar-brand">
                <div class="wishr-logo wl-nav-logo"></div>Wishr
            </router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link :to="{'name': 'home'}" class="wl-link"><i class="iconoir-home-simple-door"></i>Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ 'name': 'wl-create' }" class="wl-link"><i
                                class="iconoir-add-database-script"></i>Create Wishlist</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ 'name': 'profile' }" class="wl-link"><i class="iconoir-profile-circled"></i>My
                            Profile</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ 'name': 'about' }" class="wl-link"><i
                                class="iconoir-question-mark-circle"></i>About</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    setup() {

        return {}
    }
}
</script>

<style>
.navbar-brand {
    display: flex;
}

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
    margin-right: 5px;
    margin-top: 2px;
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
    display: flex;
    flex-direction: row;
    align-items: center;
}

.wl-nav-logo {
    height: 30px;
    width: 30px;
    background: white;
    margin-right: 15px;
}
</style>