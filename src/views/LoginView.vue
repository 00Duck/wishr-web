<template>
    <div id="main-content">
        <div class="wl-login-container">
            <h2 class="theme-primary">Wishr</h2>
            <form @submit.prevent="login()">
                <div class="wl-login-field">
                    <label class="">User Name</label>
                    <input type="text" v-model="loginModel.UserName" />
                </div>

                <div class="wl-login-field">
                    <label class="">Password</label>
                    <input type="password" v-model="loginModel.Password" />
                </div>
                <div class="wl-login-msg theme-delete" v-if="showMessage()">{{ resp.Message }}</div>
                <button class="theme-primary-bg wl-login-btn"><i class="iconoir-log-in"></i><span>Log in</span></button>
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

        return { loginModel, login, showMessage, resp }
    }
}
</script>
<style>
.wl-login-container {
    background-color: white;
    padding: 40px;
    border-radius: 10px;
    color: #777;
    margin: 20vh auto 0 auto;
    width: 40%;
}

.wl-login-container h2 {
    width: 100%;
    text-align: center;
    margin: 0 auto 10px auto;
}

.wl-login-field {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
}

.wl-login-field input {
    padding: 10px 10px 10px 2px;
    border: 0;
    border-bottom: 1px solid #ddd;
    margin-bottom: 10px;
    color: #666;
    width: 100%;
}

.wl-login-btn {
    width: 100%;
    color: #fff;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    border: 0;
    cursor: pointer;
    margin-top: 50px;
    font-weight: bold;
}

.wl-login-msg {
    font-style: italic;
    font-size: 14px;
}
</style>