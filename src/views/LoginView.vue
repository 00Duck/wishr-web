<template>
    <div class="container-md">
        <div class="card mt-5 mx-auto wl-login-card">
            <div class="wishr-logo wl-login-logo theme-primary-mask"></div>

            <form @submit.prevent="login()" class="card-body py-5">
                <div class="d-grid gap-2 col-sm-10 mx-auto">

                    <div class="form-floating mb-2">
                        <input type="text" class="form-control" v-model="loginModel.UserName" placeholder="User Name">
                        <label for="">User Name</label>
                    </div>
                    <div class="form-floating mb-5">
                        <input type="password" class="form-control" v-model="loginModel.Password"
                            placeholder="Password">
                        <label for="">Password</label>
                    </div>
                    
                </div>

                <div v-if="loading" class="wishr-loading" style="height: 50px;"></div>
                <div v-else class="d-grid gap-2 col-sm-10 mx-auto">
                    <button class="btn btn-primary" type="submit"><span>Log in</span></button>
                    <button class="btn btn-outline-primary" @click="register()" type="button"><span>Register</span></button>
                </div>
                
            </form>

        </div>
    </div>
</template>
<script>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { EventBus } from '@/event-bus';

export default {
    setup() {
        const loginModel = ref({
            "UserName": "",
            "Password": ""
        })
        const resp = ref(null)
        const router = useRouter()
        const loading = ref(false)

        async function login() {
            resp.value = null
            if (loginModel.value.UserName === '' || loginModel.value.Password === '') {
                EventBus.emit('notify', {
                    type: 'error',
                    text: 'You must enter a User Name and Password to log in.'
                })
                return
            }
            loading.value = true
            await axios.post("/api/open/login", loginModel.value)
                .then((response) => {
                    resp.value = response.data
                    if (resp.value.Message !== 'success') {
                        EventBus.emit('notify', {
                            type: 'error',
                            text: resp.value.Message
                        })
                    } else {
                        localStorage.setItem('user', JSON.stringify(resp.value.Data))
                        router.push({ name: "home" })
                    }
                })
                .catch((err) => {
                    EventBus.emit('notify', {
                        type: 'error',
                        text: 'There was a problem attempting to log you in. Please try again later.'
                    })
                    console.log(err)
                })
                .finally(() => {
                    loading.value = false;
                })
        }

        function showMessage() {
            if (resp.value == null || resp.value.Message == 'success') {
                return false;
            }
            return resp.value.Message != '';
        }

        function register() {
            router.push({ name: "register" })
        }

        return { loginModel, login, showMessage, resp, register, loading }
    }
}
</script>
<style>
.wl-login-card {
    max-width: 600px;
}

.wl-login-logo {
    height: 55px;
    width: 55px;
    margin: 2rem auto;
}
</style>