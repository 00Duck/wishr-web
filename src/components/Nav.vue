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
                    <li class="nav-item-space"></li>
                    <li class="nav-item-header">My Wish Lists</li>
                    <li class="nav-item">
                        <router-link :to="{ 'name': 'home' }" class="wl-link"><i class="iconoir-home-simple-door"></i>My
                            Lists</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ 'name': 'wl-create' }" class="wl-link"><i
                                class="iconoir-add-database-script"></i>Create Wish List</router-link>
                    </li>
                    <li class="nav-item-space"></li>
                    <li class="nav-item-header">Other Wish Lists</li>
                    <li class="nav-item">
                        <router-link :to="{ 'name': 'wl-shared' }" class="wl-link"><i
                                class="iconoir-share-android"></i>Shared With Me</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ 'name': 'wl-browse' }" class="wl-link"><i
                                class="iconoir-community"></i>Browse Public Lists</router-link>
                    </li>
                    <li class="nav-item-space"></li>
                    <li class="nav-item">
                        <router-link :to="{ 'name': 'profile' }" class="wl-link"><i
                                class="iconoir-profile-circle"></i>My Profile</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ 'name': 'about' }" class="wl-link"><i
                                class="iconoir-info-empty"></i>About</router-link>
                    </li>
                    <li class="nav-item">
                        <a @click.prevent="logOut()" class="wl-link">
                            <i class="iconoir-log-out"></i><span>Log Out</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import { EventBus } from '@/event-bus';
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const router = useRouter()

        async function logOut() {
            if (confirm('Are you sure you want to log out?')) {
                await axios.post('/api/open/logout')
                    .then(response => {
                        EventBus.emit('notify', {
                            type: 'info',
                            text: 'You have been logged out.'
                        })
                        localStorage.removeItem('user')
                        router.push({ name: 'login' })
                    })
                    .catch(err => {
                        console.log(error)
                    })
            }

        }

        return { logOut }
    }
}
</script>

<style>
.navbar-brand {
    display: flex;
}

.wl-link {
    display: block;
    padding: 10px;
    cursor: pointer;
    border-radius: 8px;
    color: white;
    text-decoration: none;
}

.wl-link i,
.nav-item-header i {
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
    color: #FFF !important;
    background-color: var(--bs-link-hover-color);
}

.navbar-nav a:hover:not(.router-link-active) {
    color: #FFF;
    /* text-decoration-style:solid;
    text-decoration-line: underline; */
    background-color: rgba(77, 86, 98, 0.502);
}

.navbar-collapse {
    margin-top: 5px;
}

.nav-item-header {
    color: #B5B5B5;
    font-size: 14px;
    text-transform: uppercase;
    font-weight: 500;
}

.nav-item-header:after {
    content: " ";
    width: 100%;
    height: 1px;
    background-color: #B5B5B5;
    display: block;
    margin-top: 10px;
    margin-bottom: 10px;
}

.nav-item-space {
    margin: 20px 0px;
}

@media (min-width: 768px) {
    .wl-nav {
        position: fixed !important;
        min-width: 200px;
        max-width: 250px;
        z-index: 1;
        height: 100%;
        left: 0;
        top: 0;
        align-content: flex-start;
    }

    .navbar-expand-md {
        flex-wrap: wrap !important;
        justify-content: flex-start;
    }

    .navbar-expand-md .navbar-nav {
        flex-direction: column !important;
        justify-content: flex-start;
    }

    .navbar .container-fluid {
        flex-direction: column;
        align-items: flex-start !important;
    }
}
</style>