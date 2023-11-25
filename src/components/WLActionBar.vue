<template>
    <div class="d-flex wl-action-bar-mobile">
        <button class="btn btn-outline-primary" @click="router.go(-1)"><i class="iconoir-arrow-left-circle"></i>Go back</button>
        <div class="flex-fill"></div>
        <div class="btn-group" role="group" aria-label="Menu Options">
            <button v-if="can_edit" class="btn btn-outline-primary" @click="router.push({name: 'wl-edit', params: {id: id}})"><i class="iconoir-page-edit"></i>Edit List</button>
            <button v-if="can_edit" class="btn btn-outline-primary" @click="$emit('openModal')"><i class="iconoir-share-android"></i>Share List</button>
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

    .wl-action-bar-sticky {
        position: sticky;
        top: 0;
        padding: 5px 0px;
        background-color: white;
        width: 100%;
        z-index: 2;
    }

    @media (max-width: 768px) {
    .wl-action-bar-mobile {
        position: fixed;
        bottom: 0;
        height: 50px;
        left: 0;
        width: 100%;
        background-color: #282e37;
        padding: 5px;
        z-index: 1;
        margin: 0;
        top: initial;
        border-bottom: 0;
    }
    .wl-action-bar-mobile button { 
        background-color: #404652;
        color: white;
        border-color: #3d4451;
        height: 100%;
    }
}
</style>