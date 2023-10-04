<template>
    <div v-show="msg.show" class="wl-notif" @click="closeBanner()">
        <div class="d-flex"><i class="iconoir-info-empty" :class="{'theme-primary': msg.type == 'info', 'theme-delete': msg.type == 'error'}"></i></div>
        <div>{{msg.text}}</div>
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
    .wl-notif {
        position: fixed;
        bottom: 0;
        right: 0;
        color: #FFF;
        background-color: var(--bs-dark);
        border-radius: 6px;
        padding: 10px 20px;
        margin: 0;
        margin-right: 0px;
        margin-bottom: 0px;
        display: flex;
        margin-right: 10px;
        margin-bottom: 10px;
        max-width: 400px;
        width: 100%;
        flex-direction: row;
        align-items: center;
        gap: 5px;
        z-index: 1;
    }

    @media (max-width: 768px) {
        .wl-notif {
            bottom: 50px;
        }
    }
</style>