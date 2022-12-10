<template>
    <div class="d-flex">
        <button class="btn btn-outline-primary btn-sm" @click="router.go(-1)"><i class="iconoir-arrow-left-circled"></i>Go back</button>
        <div class="flex-fill"></div>
        <div class="btn-group" role="group" aria-label="Menu Options">
            <button v-if="can_edit" class="btn btn-outline-primary btn-sm" @click="router.push({name: 'wl-edit', params: {id: id}})"><i class="iconoir-page-edit"></i>Edit List</button>
            <button v-if="can_edit" class="btn btn-outline-primary btn-sm" @click="$emit('openModal')"><i class="iconoir-share-android"></i>Share List</button>
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';

    export default {
        props: ['id', 'can_edit'],
        setup(props) {
            const router = useRouter()
            
            return { router }
        }
    }
</script>

<style>
    .wl-action-bar {
        display: flex;
        flex-direction: row;
        flex-flow: flex-end;
        gap: 1rem;
    }
    .wl-action-item {
        white-space: nowrap;
        cursor: pointer;
    }
    .wl-action-item:hover {
        text-decoration: underline;
    }
    .wl-action-item i {
        display: inline-block;
        margin-right: 8px;
        font-size: 20px;
        margin-bottom: -4px;
       
    }
    .wl-space {
        flex: 100%;
    }
</style>