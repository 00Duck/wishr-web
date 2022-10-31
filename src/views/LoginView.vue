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
                <div class="wl-login-msg theme-delete" v-if="showMessage()">{{ resp.Message }}</div>
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

export default {
    setup() {
        const loginModel = ref({
            "UserName": "",
            "Password": ""
        })
        const resp = ref(null)
        const router = useRouter()

        async function login() {
            resp.value = null
            if (loginModel.value.UserName === '' || loginModel.value.Password === '') {
                resp.value = {Message: 'You must enter a User Name and Password to log in.'}
                return
            }
            await axios.post("/api/open/login", loginModel.value)
            .then((response) => {
                resp.value = response.data
                if (!resp.value.Message || resp.value.Message !== 'success') {
                    resp.value = {Message: 'There was a problem attempting to log you in. Please try again later.'}
                } else {
                    router.push({name: "home"})
                }                
            })
            .catch( (err) => {
                resp.value = {Message: 'There was a problem attempting to log you in. Please try again later. Error: ' + err}
                console.log(err)
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

        return { loginModel, login, showMessage, resp, register }
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
}

.wl-login-container h2 {
    width: 100%;
    text-align: center;
    margin: 0 auto 10px auto;
}

.wl-login-btn {
    margin-top: 50px;
}

.wl-login-msg {
    font-style: italic;
    font-size: 14px;
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