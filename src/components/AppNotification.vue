<template>
    <div v-show="msg.show" class="wishr-msg" :class="{'wishr-msg-info': msg.type == 'info', 'wishr-msg-error': msg.type == 'error'}">
        <div>{{msg.text}}</div>
        <div class="wishr-msg-space"></div>
        <div class="wishr-msg-close" @click="close()"><i class="iconoir-cancel"></i></div>
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
                    close()
                }, 8000)
            })
        })

        function close() {
            msg.value = {
                show: false,
                type: '',
                text: ''
            }
        }

        return { msg, close }
    }
}
</script>
<style>
    .wishr-msg {
        position: fixed;
        width: 95%;
        z-index: 3;
        padding: 6px 9px;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;
        left: 50%;
        transform: translateX(-50%);
        margin-top: 5px;
        border-radius: 10px;
    }
    .wishr-msg-close i {
        display: inline;
        font-size: 22px;
        cursor: pointer;
    }

    .wishr-msg-info {
        border: 1px solid rgb(51, 139, 255);
        background-color: rgb(172, 207, 253, 0.87);
        color: rgb(0, 110, 255);
    }
    .wishr-msg-error {
        border: 1px solid red;
        background-color: rgb(255, 194, 194);
        color: red;
    }
</style>