<template>
    <div class="wl-action-bar">
        <div class="wl-action-item theme-primary"><i class="iconoir-arrow-left-circled"></i>Go back</div>
        <div class="wl-space"></div>
        <div class="wl-action-item theme-primary"><i class="iconoir-page-edit"></i>Edit List</div>
        <div class="wl-action-item theme-primary"><i class="iconoir-share-android"></i>Share List</div>
    </div>
</template>

<script>
    export default {
        props: ['id'],
        setup() {

        }
    }
</script>

<style>
    .wl-action-bar {
        display: flex;
        flex-direction: row;
        flex-flow: flex-end;
        gap: 25px;
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