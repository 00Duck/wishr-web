<template>
    <h2 class="wl-list-title">{{ title }}</h2>
    <div v-if="loading" class="wishr-loading"></div>
    <div v-else>
        <router-link :to="{ name: 'wl-detail', params: { id: item.ID } }" class="wl-list-item wl-container" v-for="item in list" :key="item.ID" v-if="list.length > 0">
            <div class="wl-icon theme-primary"><i class="iconoir-bookmark-book"></i></div>
            <div class="wl-content">
                <div>
                    <div class="wl-title">{{ item.Name }}</div>
                    <div class="wl-small" v-if="!item.IsOwner">Shared by <b>{{ item.OwnerFullName }}</b></div>
                    <div class="wl-small">Last updated on {{ new Date(item.UpdatedAt).toDateString() }}</div>
                </div>
                <div>{{ item.ItemCount }} Items</div>
            </div>
        </router-link>
        <div v-if="list.length === 0 && list_err === null">
            <div :class="bg"></div>
            <div class="wl-empty-msg">{{ list_empty_msg }}</div>
        </div>
        <div v-if="list_err !== null">
            <div>{{ list_err }}</div>
        </div>
    </div>
    
</template>

<script>
    import { ref } from 'vue'
    import { onMounted } from 'vue'

    export default {
        props: ['title', 'list_url', 'list_empty_msg', 'bg'],
        setup(props) {
            const list = ref([])
            const list_err = ref(null)
            const loading = ref(true)

            onMounted(async () => {
                try {
                    let data = await fetch(props.list_url)
                    if (!data.ok) {
                        throw Error('Error loading list: ' + data.status + ' ' + data.statusText)
                    }
                    data = await data.json()
                    list.value = data.Data
                } catch(err) {
                    list_err.value = err.message
                } finally {
                    loading.value = false
                }
            })
            return { list, list_err, loading }
        }
    }
</script>

<style>
    .wl-list-title {
        /* border-bottom: 1px solid rgba(150, 150, 150, 0.3); */
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

    .wl-empty-msg {
        text-align: center;
        margin-bottom: 20px;
        margin-top: 40px;
        color: #888;
        font-size: 18px;
    }

    .wl-bg-my-wishlist {
        mask:url(@/assets/cloud-bg.svg);
        mask-size:contain;
        mask-repeat: no-repeat;
        mask-position: center;
        display: flex;
        align-self:center;
        width: 100%;
        height: 250px;
        background: #ddd;
        margin: auto;
    }
    .wl-bg-sad {
        mask:url(@/assets/sad-bg.svg);
        mask-size:contain;
        mask-repeat: no-repeat;
        mask-position: center;
        display: flex;
        align-self:center;
        width: 100%;
        height: 230px;
        background: #ddd;
        margin: auto;
    }
</style>