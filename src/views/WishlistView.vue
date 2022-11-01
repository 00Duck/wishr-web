<template>
    <ShareModal :list_id="list_id" v-if="share_modal_open" @closeModal="toggleModal(false)"></ShareModal>
    <Nav></Nav>
    <div id="main-content">
        <div v-if="!list" class="wl-container wl-no-list-container">
            <h1>Uh oh!</h1>
            <div class="wl-no-list-bg"></div>
            <p>The list you are trying to view either does not exist or is no longer shared with you.</p>
            <div class="wishr-btn theme-primary-bg wl-no-list-btn" @click="router.push({name: 'home'})"><i class="iconoir-home-simple-door"></i><span>Back to safety</span></div>
        </div>
        <div v-else class="wl-container">
            <WLActionBar :id="list.ID" :can_edit="list.CanEdit" @openModal="toggleModal(true)"></WLActionBar>
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
                    <div class="wl-get-item theme-primary-bg" disabled>Reserve</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import WLActionBar from '@/components/WLActionBar.vue'
import { useRoute, useRouter } from 'vue-router';
import { onMounted } from 'vue';
import Nav from '@/components/Nav.vue'
import ShareModal from '@/components/ShareModal.vue'
import axios from 'axios';

export default {
    components: { WLActionBar, Nav, ShareModal },
    methods: {
        snipURL: (url) => {
            if (url.length > 50) {
                return url.substring(0, 50) + '...'
            }
            return url
        },
    },
    setup(props, context) {
        const route = useRoute()
        const router = useRouter()
        const list = ref(null)
        const list_id = ref(route.params.id)
        const list_err = ref(null)
        const share_modal_open = ref(false)

        onMounted(async () => {
            await axios.get('/api/prot/wishlist/' + list_id.value)
            .then(response => {
                list.value = response.data.Data
            })
            .catch(err => {
                list_err.value = err.message
            })
        })
        function toggleModal(state) {
            share_modal_open.value = state
        }

        return { list, list_err, share_modal_open, toggleModal, list_id, router }
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

.wl-no-list-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    gap: 20px;
}
.wl-no-list-container h1 {
    font-size: 40px;
    margin: 2% auto 0 auto; 
}

.wl-no-list-btn {
    white-space: nowrap;
    max-width: 250px;
}
.wl-no-list-bg {
    mask: url(@/assets/not-found.svg);
    mask-size: contain;
    mask-repeat: no-repeat;
    mask-position: center;
    display: flex;
    align-self:center;
    min-width: 220px;
    height: 220px;
    background: #eee;
    margin-top: 20px;
}
</style>