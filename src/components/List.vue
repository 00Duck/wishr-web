<template>
    <h2 class="wl-list-title">{{ title }}</h2>
    <router-link :to="{ name: 'wl-detail', params: { id: item.id } }" class="wl-list-item wl-container" v-for="item in lists" :key="item.id">
        <div class="wl-icon theme-primary"><i class="iconoir-bookmark-book"></i></div>
        <div class="wl-content">
            <div>
                <div class="wl-title">{{ item.name }}</div>
                <div class="wl-small">Created on {{ item.created }}</div>
            </div>
            <div>{{ item.items.length }} Items</div>
        </div>
    </router-link>
</template>

<script>
    export default {
        props: ['title', 'lists']
    }
</script>

<style>
    .wl-list-title {
        border-bottom: 1px solid rgba(150, 150, 150, 0.3);
        padding-bottom: 10px;
        margin-bottom: 25px;
        font-size: 30px;
    }
    .wl-list-item {
        text-decoration: none;
        margin-bottom: 10px;
        display:flex;
        flex-flow: row;
    }
    .wl-icon {
        flex: 0;
        font-size: 50px;
        margin-right: 10px;
    }
    .wl-content {
        flex: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .wl-title {
        font-size: 24px;
        font-weight: bold;
    }
    .wl-small {
        color: #aaa;
        font-size: 12px;
        font-style: italic;
    }
</style>