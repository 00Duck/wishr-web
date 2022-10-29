<template>
    <div class="wl-edit-bar">
        <div class="wl-edit-item theme-primary" @click="router.go(-1)"><i class="iconoir-arrow-left-circled"></i>Go back</div>
        <div class="wl-space"></div>
        <div class="wl-edit-item theme-primary" @click="saveList(list)"><i class="iconoir-save-floppy-disk"></i>Save List</div>
    </div>
</template>

<script>
    import { useRouter } from 'vue-router';
    export default {
        props: ['list'],
        methods: {
            saveList: (list) => {
                console.log(JSON.stringify(list))
            }
        },
        setup() {
            const router = useRouter()
            return { router }
        }
    }
</script>

<style>
    .wl-edit-bar {
        display: flex;
        flex-direction: row;
        flex-flow: flex-end;
        gap: 25px;
    }
    .wl-edit-bar .wl-edit-item {
        white-space: nowrap;
        cursor: pointer;
    }
    .wl-edit-bar .wl-edit-item:hover {
        text-decoration: underline;
    }
    .wl-edit-bar .wl-edit-item i {
        display: inline-block;
        margin-right: 8px;
        font-size: 20px;
        margin-bottom: -4px;
       
    }
    .wl-edit-bar .wl-space {
        flex: 100%;
    }
</style>