<template>
    <div class="container my-3">
        <div class="card p-5">
            <h2 class="d-flex align-content-center justify-content-center mb-3"><span v-if="allowed">Create a New Password</span><span v-else>Uh oh!</span></h2>
            <form v-if="allowed" action="post" @submit.prevent="submit()" class="row g-2">
                <div class="form-error col-md-12" style="text-align: center;" v-if="validation.ServerErr">{{
                    validation.ServerErr }}</div>

                <div class="wishr-field col-md-6">
                    <label class="required">New Password</label>
                    <input type="password" v-model="form.NewPassword" placeholder="Minimum 8 characters" />
                    <div class="form-error" v-if="validation.PasswordErr">{{ validation.PasswordErr }}</div>
                </div>
                <div class="col-md-6"></div>
                <div class="wishr-field col-md-6">
                    <label class="required">Confirm New Password</label>
                    <input type="password" v-model="form.ConfirmNewPassword" />
                    <div class="form-error" v-if="validation.ConfirmPasswordErr">{{ validation.ConfirmPasswordErr }}</div>
                </div>
                <div class="col-md-6"></div>
                
                <div v-if="!loading" class="d-flex justify-content-center">
                    <button type="submit" class="btn btn-primary"><i class="iconoir-submit-document"></i><span>Reset
                            Password</span></button>
                </div>
                <div v-else class="wishr-loading col-md-12" style="height: 50px;"></div>
            </form>
            <div v-if="!allowed" class="d-flex flex-column align-items-center">
                <div class="wl-not-found-bg mb-5"></div>
                <p>You are seeing this message because your password reset link has expired or is invalid.</p>
                <p>Please contact the site administrator if you would like to reset your password.</p>
                <div class="btn btn-primary" @click="router.push({name: 'home'})"><i class="iconoir-home-simple-door"></i><span>Go home</span></div>
            </div>
        </div>
    </div>
</template>
<script>
import { EventBus } from '@/event-bus';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';

export default {

    setup() {
        const router = useRouter()
        const route = useRoute()
        const form = ref({
            "NewPassword": "",
            "ConfirmNewPassword": "",
        })
        const validation = ref({
            "NewPasswordErr": "",
            "ConfirmNewPasswordErr": "",
            "ServerErr": ""
        })
        const allowed = ref(false)
        const loading = ref(false)

        onMounted(async () => {
            axios.get("/api/open/passwordreset/" + route.params.token)
            .then(resp => {
                if (resp.status !== 200) {
                    allowed.value = false
                } else {
                    allowed.value = true
                }
            })
            .catch(err => {
                allowed.value = false
            })
        })

        function submit() {
            if (validForm()) {
                loading.value = true
                axios.post("/api/open/passwordreset/" + route.params.token, { Password: form.value.NewPassword + '' } )
                    .then(resp => {
                        EventBus.emit('notify', {
                            type: 'info',
                            text: 'Your password has been reset! Please sign in again.'
                        })
                        loading.value = false
                        router.push({ name: 'login' })
                    })
                    .catch(err => {
                        EventBus.emit('notify', {
                            type: 'error',
                            text: 'There was a problem resetting your password. Please contact the site admin or try again later. Error: ' + err
                        })
                        loading.value = false
                        console.log(err)
                    })
            }
        }

        function validForm() {
            validation.value.ServerErr = '' //reset, err comes from server
            validation.value.PasswordErr = form.value.NewPassword.length >= 8 ? '' : 'Password must be at least 8 characters'
            validation.value.ConfirmPasswordErr = form.value.NewPassword === form.value.ConfirmNewPassword ? '' : 'Passwords do not match'
            for (let i in validation.value) {
                if (validation.value[i] !== '') {
                    return false
                }
            }
            return true
        }

        return { form, validation, submit, router, allowed, loading }
    }
}
</script>
<style>

.wl-not-found-bg {
    mask: url(@/assets/not-found.svg);
    mask-size:contain;
    mask-repeat: no-repeat;
    mask-position: center;
    display: flex;
    align-self:center;
    width: 100%;
    height: 250px;
    background: #a5a5ab;
    margin: auto;
}
</style>