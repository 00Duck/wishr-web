<template>
    <nav class="navbar navbar-dark navbar-expand-md bg-dark bg-navbar-wishr wl-nav">
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
                        <router-link :to="{ 'name': 'home' }" class="wl-link"><i
                                class="iconoir-home-simple-door"></i>Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ 'name': 'wl-create' }" class="wl-link"><i
                                class="iconoir-add-database-script"></i>Create Wishlist</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ 'name': 'profile' }" class="wl-link"><i class="iconoir-profile-circle"></i>My
                            Profile</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ 'name': 'about' }" class="wl-link"><i
                                class="iconoir-info-empty"></i>About</router-link>
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
    background: #FFF;
    margin-right: 15px;
}

.navbar-nav .router-link-exact-active {
    color: #FFF!important;
    background-color: var(--bs-link-hover-color);
}

.navbar-nav a:hover {
    color: #FFF;
    text-decoration-style:solid;
    text-decoration-line: underline;
}

.navbar-collapse {
    margin-top: 5px;
}

@media (min-width: 768px) {
    .wl-nav {
        position: fixed !important;
        min-width: 200px;
        max-width: 200px;
        z-index: 1;
        height: 100%;
        padding-left: 10px !important;
        left: 0;
        top: 0;
        align-content: flex-start;
    }
    .navbar-expand-md {
        flex-wrap: wrap!important;
        justify-content: flex-start;
    }
    .navbar-expand-md .navbar-nav {
        flex-direction: column!important;
        justify-content: flex-start;
    }
    .navbar .container-fluid {
        flex-direction: column;
        align-items: flex-start!important;
    }
}
</style>