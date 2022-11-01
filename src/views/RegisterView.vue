<template>
    <div id="main-content">
        <div class="wl-container wl-register-container">
            <h2 class="wl-register-title">Create your Account</h2>
            <br />
            <form action="post" @submit.prevent="submit()">
                <div class="form-error" style="text-align: center;" v-if="validation.ServerErr">{{ validation.ServerErr }}</div>
                <div class="wishr-field">
                    <label class="required">User Name</label>
                    <input type="text" v-model="form.UserName" />
                    <div class="form-error" v-if="validation.UserNameErr">{{ validation.UserNameErr }}</div>
                </div>
                <div class="wishr-field">
                    <label class="required">Full Name</label>
                    <input type="text" v-model="form.FullName" />
                    <div class="form-error" v-if="validation.FullNameErr">{{ validation.FullNameErr }}</div>
                </div>
                <div class="wishr-field">
                    <label class="required">Password</label>
                    <input type="password" v-model="form.Password" />
                    <div class="form-error" v-if="validation.PasswordErr">{{ validation.PasswordErr }}</div>
                </div>
                <div class="wishr-field">
                    <label class="required">Confirm Password</label>
                    <input type="password" v-model="confirmPassword" />
                    <div class="form-error" v-if="validation.ConfirmPasswordErr">{{ validation.ConfirmPasswordErr }}</div>
                </div>
                <div class="wishr-field">
                    <label class="required">Registration Code</label>
                    <input type="text" v-model="form.RegistrationCode" />
                    <div class="form-error" v-if="validation.RegistrationCodeErr">{{ validation.RegistrationCodeErr }}</div>
                </div>
                <br />
                <button type="submit" class="wishr-btn wl-register-btn theme-primary-bg"><i class="iconoir-submit-document"></i><span>Complete Registration</span></button>
            </form>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const router = useRouter()
        const form = ref({
            "UserName": "",
            "Password": "",
            "FullName": "",
            "RegistrationCode": "",
        })
        const confirmPassword = ref('')
        const validation = ref({
            "UserNameErr": "",
            "PasswordErr": "",
            "FullNameErr": "",
            "RegistrationCodeErr": "",
            "ConfirmPasswordErr": "",
            "ServerErr": ""
        })
        function submit() {
            if (validForm()) {
                axios.post("/api/open/register", form.value)
                .then(response => {
                    const data = response.data
                    if (data.Message.indexOf('already in use') !== -1) {
                        validation.value.UserNameErr = data.Message
                        return
                    }
                    if (data.Message !== 'success') {
                        validation.value.ServerErr = data.Message
                        return
                    }
                    router.push({name: 'login'})
                })
                .catch(err => {
                    console.log(err)
                })
            }
        }

        function validForm() {
            validation.value.ServerErr = '' //reset, err comes from server
            validation.value.UserNameErr = form.value.UserName !== '' ? '' : 'User Name must not be empty'
            validation.value.FullNameErr = form.value.FullName !== '' ? '' : 'Full Name must not be empty'
            validation.value.PasswordErr = form.value.Password.length >= 8 ? '' : 'Password must be at least 8 characters'
            validation.value.ConfirmPasswordErr = confirmPassword.value === form.value.Password ? '' : 'Passwords do not match'
            validation.value.RegistrationCodeErr = form.value.RegistrationCode !== '' ? '' : 'Registration Code must not be empty'
            for (let i in validation.value) {
                if (validation.value[i] !== '') {
                    return false
                }
            }
            return true
        }

        return { form, validation, submit, confirmPassword }
    }
}
</script>
<style>
.wl-register-container {
    margin-left: 15%;
    margin-right: 15%;
    padding-bottom: 45px;
    padding-left: 12%;
    padding-right: 12%;
}
.wl-register-title {
    text-align: center;
}
</style>