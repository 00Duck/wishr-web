<template>
    <Nav></Nav>
    <div id="main-content">
        <div class="wl-container">
            <h1 class="wl-center">My Profile</h1>
            <div v-if="loading" class="wishr-loading" style="margin:10px auto;"></div>
            <div v-else-if="!profile">
                Something went wrong
            </div>
            <div v-else class="wl-profile-container">
                <div class="wl-profile-avatar"></div>
                <div>
                    <div class="wishr-field">
                        <label>User ID</label>
                        <input type="text" :value="profile.ID" readonly>
                    </div>
                    <div class="wishr-field">
                        <label>User Name</label>
                        <input type="text" v-model="profile.UserName" readonly>
                    </div>
                    <div class="wishr-field">
                        <label>Full Name</label>
                        <input type="text" v-model="profile.FullName" readonly>
                    </div>
                </div>
                <br />
                <button type="button" @click.prevent="logOut()" class="wishr-btn theme-delete-bg wl-log-out"><i class="iconoir-log-out"></i><span>Log Out</span></button>
            </div>
        </div>
    </div>
</template>

<script>
import Nav from '@/components/Nav.vue'
import { EventBus } from '@/event-bus';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
    components: { Nav },
    setup() {
        const loading = ref(true)
        const profile = ref(null)
        const router = useRouter()
        onMounted(async () => {
            await axios.get('/api/prot/profile')
            .then(response => {
                profile.value = response.data.Data
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                loading.value = false
            })
        })

        async function logOut() {
            await axios.post('/api/open/logout')
            .then(response => {
                EventBus.emit('notify', {
                    type: 'info',
                    text: 'You have been logged out.'
                })
                localStorage.removeItem('user')
                router.push({name:'login'})
            })
            .catch(err => {
                console.log(error)
            })
        }
        return { loading, profile, logOut }
    }
}
</script>

<style>
.wl-profile-avatar {
    background-image: url(@/assets/avatar.svg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    height: 200px;
    width: 200px;
    margin: auto;
}

.wl-profile-container {
    padding: 50px 13%;
}

.wl-profile-container input:read-only {
    color: #999;
    cursor: not-allowed;
}
.wl-log-out {
    margin: auto;
}
</style>