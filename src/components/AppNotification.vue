<template>
    <div v-show="msg.show" class="alert alert-dismissible wishr-alert" :class="{'alert-info': msg.type == 'info', 'alert-danger': msg.type == 'error'}">
        <div>{{msg.text}}</div>
        <div class="wishr-msg-space"></div>
        <!-- <div class="wishr-msg-close" @click="close()"><i class="iconoir-cancel"></i></div> -->
        <button type="button" class="btn-close" aria-label="Close" @click="closeBanner()"></button>
    </div>
</template>
<script>
import { EventBus } from '@/event-bus';
import { onMounted, ref } from 'vue';

export default {
    setup() {
        const msg = ref({
            show: false,
            type: '',
            text: ''
        })

        onMounted(() => {
            EventBus.on('notify', data => {
                msg.value.show = true
                msg.value.type = data.type
                msg.value.text = data.text

                setTimeout(() => {
                    closeBanner()
                }, 5000)
            })
        })

        function closeBanner() {
            msg.value.show = false
            msg.value.type = ''
            msg.value.text = ''
        }

        return { msg, closeBanner }
    }
}
</script>
<style>
    .wishr-alert {
        top: 0;
        position: absolute !important;
        z-index: 1;
        width: 100%;
    }
</style>