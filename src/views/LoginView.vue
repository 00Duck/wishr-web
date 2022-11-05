<template>
    <div id="main-content">
        <div class="wl-login-container">
            <h2 class="theme-primary">
                <div class="wishr-logo wl-login-logo theme-primary-mask"></div>
            </h2>
            <form @submit.prevent="login()">
                <div class="wishr-field">
                    <label class="">User Name</label>
                    <input type="text" v-model="loginModel.UserName" />
                </div>

                <div class="wishr-field">
                    <label class="">Password</label>
                    <input type="password" v-model="loginModel.Password" />
                </div>
                <div v-if="loading" class="wishr-loading" style="height: 50px;"></div>
                <button type="submit" class="theme-primary-bg wl-login-btn wishr-btn"><i class="iconoir-log-in"></i><span>Log in</span></button>
                <div @click="register()" class="theme-primary wishr-icon-link wl-register"><i class="iconoir-add-database-script"></i><span>Register</span></div>
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
                    router.push({name: "home"})
                }                
            })
            .catch( (err) => {
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
            router.push({name: "register"})
        }

        return { loginModel, login, showMessage, resp, register, loading }
    }
}
</script>
<style>
.wl-login-container {
    background-color: white;
    padding: 40px;
    border-radius: 10px;
    color: #777;
    margin: 10vh auto 0 auto;
    width: 40%;
    max-width: 500px;
}

.wl-login-container h2 {
    width: 100%;
    text-align: center;
    margin: 0 auto 10px auto;
}

.wl-login-btn {
    margin-top: 50px;
}

.wl-register {
    margin: 20px auto 0 auto;
    justify-content: center;
}

.wl-login-logo {
    height: 55px;
    width: 55px;
}
</style>