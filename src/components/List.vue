<template>
    <div v-if="loading" class="wishr-loading"></div>
    <div v-else>
        <router-link :to="{ name: 'wl-detail', params: { id: item.ID } }"
            class="wl-list-item card d-flex flex-row my-3 p-2 gap-1" v-for="item in list" :key="item.ID"
            v-if="list.length > 0">
            <div class="wl-icon text-primary d-flex align-items-center me-2"><i class="iconoir-bookmark-book"></i></div>
            <div class="wl-list-item-content">
                <div class="d-flex flex-column flex-wrap">
                    <div class="h3">{{ item.Name }}</div>
                    <small class="text-muted">Last updated {{ new Date(item.UpdatedAt).toDateString() }}</small>
                    <small class="text-primary fs-6" v-if="!item.IsOwner"><b>Shared by {{ item.OwnerFullName }}</b></small>
                </div>
                <div class="flex-fill"></div>
                <h5 class="wl-list-item-count">
                    <div class="badge bg-secondary">{{ item.ItemCount }} Items</div>
                </h5>
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
    components: { },
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
            } catch (err) {
                list_err.value = err.message
            } finally {
                loading.value = false
            }
        })
        return { list, list_err, loading }
    }
}
</script>

<style lang="scss">
.wl-icon i {
    font-size: 3rem;
}


.wl-list-item {
    text-decoration: none;
    color: initial;
}

.wl-list-item:hover {
    color: initial;
}

.wl-list-item-content {
    display: flex;
    flex-direction: row;
    width: 100%;
}

@media (max-width: 768px) {
    .wl-list-item-content {
        flex-direction: column;
        gap: 0.3rem;
    }
    .wl-list-item-count {
        align-self:flex-end;
    }
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
    mask: url(@/assets/cloud-bg.svg);
    mask-size: contain;
    mask-repeat: no-repeat;
    mask-position: center;
    display: flex;
    align-self: center;
    width: 100%;
    height: 250px;
    background: #a5a5ab;
    margin: auto;
}

.wl-bg-share {
    mask: url(@/assets/share.svg);
    mask-size: contain;
    mask-repeat: no-repeat;
    mask-position: center;
    display: flex;
    align-self: center;
    width: 100%;
    height: 220px;
    background: #a5a5ab;
    margin: auto;
}
</style>