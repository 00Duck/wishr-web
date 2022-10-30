<template>
    <Nav></Nav>
    <div id="main-content">
        <div class="wl-container">
            <WLActionBar :id="list.ID"></WLActionBar>
            <h1 class="wl-center">{{ list.Name }}</h1>
            <p class="wl-center">Created on {{ new Date(list.CreatedAt).toDateString() }}</p>
            <br />
            <div v-for="item in list.Items" :key="item.ID" class="wl-detail-line">
                <ul>
                    <li>
                        <div class="wl-detail-title">{{ item.Name }}</div>
                        <div class="wl-url">URL: <a :href="item.URL" target="_blank">{{ snipURL(item.URL) }}</a></div>
                        <div class="wl-detail-notes">{{ item.Notes }}</div>
                    </li>
                </ul>
                <div>
                    <div class="wl-pill">Price: <b>{{ item.Price }}</b></div>
                    <div class="wl-pill">Quantity: <b>{{ item.Quantity }}</b></div>
                    <div class="wl-get-item theme-primary-bg">Get this item</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import WLActionBar from '@/components/WLActionBar.vue'
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
import Nav from '@/components/Nav.vue'

export default {
    components: { WLActionBar, Nav },
    methods: {
        snipURL: (url) => {
            if (url.length > 50) {
                return url.substring(0, 50) + '...'
            }
            return url
        },
    },
    setup() {
        const route = useRoute()
        const list = ref({})
        const list_id = ref(route.params.id)
        const list_err = ref(null)

        onMounted(async () => {
            try {
                let data = await fetch('/api/prot/wishlist/' + list_id.value)
                if (!data.ok) {
                    throw Error('Error loading wishlist: ' + data.status + ' ' + data.statusText)
                }
                data = await data.json()
                list.value = data.Data
            } catch (err) {
                list_err.value = err.message
            }
        })
        return { list, list_err }
    }
}
</script>

<style>
.wl-detail-line {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 32px;
}

.wl-detail-line li {
    list-style: none;
    line-height: 30px;
}

.wl-detail-line ul {
    margin: 0;
}

.wl-detail-title {
    font-size: 28px;
}

.wl-detail-title i {
    display: inline-block;
    margin-bottom: -5px;
    text-indent: 125px;

}

.wl-detail-notes {
    font-style: italic;
    color: #aaa;
}

.wl-pill {
    display: block;
    white-space: nowrap;
    font-size: 16px;
}

.wl-get-item {
    color: white;
    display: inline-block;
    padding: 5px 12px;
    border-radius: 10px;
    margin-top: 10px;
}
</style>