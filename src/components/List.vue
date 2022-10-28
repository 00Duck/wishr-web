<template>
    <h2 class="wl-list-title">{{ title }}</h2>
    <router-link :to="{ name: 'wl-detail', params: { id: item.ID } }" class="wl-list-item wl-container" v-for="item in list" :key="item.ID" v-if="list.length > 0">
        <div class="wl-icon theme-primary"><i class="iconoir-bookmark-book"></i></div>
        <div class="wl-content">
            <div>
                <div class="wl-title">{{ item.Name }}</div>
                <div class="wl-small">Created on {{ item.CreatedAt }}</div>
            </div>
            <div>{{ item.ItemCount }} Items</div>
        </div>
    </router-link>
    <div v-if="list.length === 0 && list_err === null">
        <div>You don't have any lists yet. Create a new list to get started!</div>
    </div>
    <div v-if="list_err !== null">
        <div>{{ list_err }}</div>
    </div>
</template>

<script>
    import { ref } from 'vue'
    import { onMounted } from 'vue'

    export default {
        props: ['title', 'list_url'],
        setup(props) {
            const list = ref([])
            const list_err = ref(null)

            onMounted(async () => {
                try {
                    let data = await fetch(props.list_url)
                    if (!data.ok) {
                        console.log(data)
                        throw Error('Error loading list: ' + data.status + ' ' + data.statusText)
                    }
                    data = await data.json()
                    list.value = data.Data
                    console.log(data)
                } catch(err) {
                    list_err.value = err.message
                }
            })
            return { list, list_err }
        }
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