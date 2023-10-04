<template>
    <Nav></Nav>
    <div class="wl-content">
        <div class="card wl-card px-3 py-3">
            <h1 class="text-center">My Profile</h1>
            <div v-if="loading" class="wishr-loading" style="margin:10px auto;"></div>
            <div v-else-if="!profile">
                Something went wrong
            </div>
            <div v-else class="py-4">
                <div class="wl-profile-avatar"></div>
                <!-- <div class="wl-profile-avatar" @mouseenter="toggleOverlay(true)" @mouseleave="toggleOverlay(false)" @click="openFileUpload()">
                    <div class="wl-profile-avatar-overlay" v-if="overlay">Upload Avatar</div>
                </div>
                <input ref="fileUploadData" type="file" id="avatarUpload" @change="handleUpload" hidden> -->
                <div class="row my-3 justify-content-center mt-4">
                    <div class="col-8">
                        <div class="form-floating mb-2">
                            <input type="text" class="form-control" :value="profile.ID" placeholder="Item Name" disabled>
                            <label>User ID</label>
                        </div>
                        <div class="form-floating mb-2">
                            <input type="text" class="form-control" v-model="profile.UserName" placeholder="User name" disabled>
                            <label>User name</label>
                        </div>
                        <div class="form-floating mb-2">
                            <input type="text" class="form-control" v-model="profile.FullName" placeholder="Full name" disabled>
                            <label>Full name</label>
                        </div>
                        <div class="d-flex flex-row gap-2 justify-content-center mt-4">
                            <button type="button" @click.prevent="logOut()" class="btn btn-danger wl-logout-btn">
                                <i class="iconoir-log-out"></i><span>Log Out</span>
                            </button>
                        </div>
                    </div>
                </div>                
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
        const overlay = ref(false)
        const fileUploadData = ref(null)

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
            // await loadProfileAvatar()
        })

        async function logOut() {
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

        function toggleOverlay(val) {
            overlay.value = val
        }

        function openFileUpload() {
            document.getElementById("avatarUpload").click()
        }

        async function loadProfileAvatar() {
            await fetch('/api/prot/upload/profile')
                .then(async response => {
                    const element = document.querySelector(".wl-profile-avatar")
                    element.style.backgroundImage = response

                })
                .catch(err => {
                    console.log(err)
                })
        }

        async function handleUpload() {
            const formData = new FormData()
            const file = fileUploadData.value.files[0]
            formData.append("file", file)

            await axios.post('/api/prot/upload/profile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                    if (response.data.Message !== 'success') {
                        EventBus.emit('notify', {
                            type: 'error',
                            text: response.data.Message,
                        })
                    } else {
                        loadProfileAvatar()
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }

        return { loading, profile, logOut, toggleOverlay, overlay, openFileUpload, handleUpload, fileUploadData }
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

.wl-profile-avatar-overlay {
    background-color: rgb(0, 0, 0, 0.6);
    color: #FFF;
    text-align: center;
    height: 100%;
    width: 100%;
    border-radius: 50%;

    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.wl-logout-btn {
    width: 100%;
    max-width: 400px;
}

</style>