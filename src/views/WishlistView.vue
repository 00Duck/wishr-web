<template>
    <ShareModal :list_id="list_id" v-if="share_modal_open" @closeModal="toggleModal(false)"></ShareModal>
    <Nav></Nav>
    <div id="main-content">
        <div v-if="loading" class="wishr-loading" style="margin-top:10vh"></div>
        <div v-else-if="!list" class="wl-container wl-no-list-container">
            <h1>Uh oh!</h1>
            <div class="wl-no-list-bg"></div>
            <p>The list you are trying to view either does not exist or is no longer shared with you.</p>
            <div class="wishr-btn theme-primary-bg wl-no-list-btn" @click="router.push({name: 'home'})"><i class="iconoir-home-simple-door"></i><span>Back to safety</span></div>
        </div>
        <div v-else class="wl-container">
            <WLActionBar :id="list.ID" :can_edit="list.IsOwner" @openModal="toggleModal(true)"></WLActionBar>
            <h1 class="wl-center">{{ list.Name }}</h1>
            <div class="wl-list-info wl-center">
                <span v-if="!list.IsOwner">Created by {{ list.OwnerFullName }} on {{ new Date(list.CreatedAt).toDateString() }}</span>
                <span><b>Last Updated</b> {{ new Date(list.UpdatedAt).toDateString()}}</span>
            </div>
            <br />
            <div v-for="item in list.Items" :key="item.ID" class="wl-detail-line" v-show="!item.PersonalItem || (item.PersonalItem && list.IsOwner)">
                <ul>
                    <li>
                        <div class="wl-detail-title">{{ item.Name }}</div>
                        <div class="wl-url"><a :href="getURL(item.URL)" rel="noreferrer" target="_blank">{{ snipURL(item.URL) }}</a></div>
                        <div class="wl-detail-notes">{{ item.Notes }}</div>
                        <div v-if="item.PersonalItem && list.IsOwner" class="wl-item-hidden"><i class="iconoir-eye-off"></i><span>Item is only visible to you</span></div>
                    </li>
                </ul>
                <div>
                    <div class="wl-pill">Price: <b>{{ item.Price }}</b></div>
                    <div class="wl-pill">Quantity: <b>{{ item.Quantity }}</b></div>
                    <div v-if="list.Owner !== current_user.ID">
                        <button type="button" @click.prevent="reserveItem(item)" v-if="item.ReservedBy == ''" class="wishr-btn wl-get-item theme-primary-bg"><i class="iconoir-gift"></i><span>Reserve</span></button>
                        <button type="button" @click.prevent="unreserveItem(item)" v-else-if="item.ReservedBy == current_user.ID" class="wishr-btn wl-get-item theme-delete-bg"><i class="iconoir-remove-from-cart"></i><span>Remove Reservation</span></button>
                        <div v-else class="wl-reserve-notify"><i class="iconoir-info-empty"></i><span><b>{{ item.ReservedByFullName }}</b> is getting this item</span></div>
                    </div> 
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
import { EventBus } from '@/event-bus';

export default {
    components: { WLActionBar, Nav, ShareModal },
    setup(props, context) {
        const loading = ref(true)
        const route = useRoute()
        const router = useRouter()
        const list = ref(null)
        const list_id = ref(route.params.id)
        const list_err = ref(null)
        const share_modal_open = ref(false)
        const current_user = ref(getCurrentUser())

        onMounted(async () => {
            refresh()
        })

        async function refresh() {
            await axios.get('/api/prot/wishlist/' + list_id.value)
            .then(response => {
                list.value = response.data.Data
            })
            .catch(err => {
                list_err.value = err.message
            })
            .finally(() => {
                loading.value = false
            })
        }

        function toggleModal(state) {
            share_modal_open.value = state
        }

        function getURL(url) {
            if (!url || url == '') { return '' }
            if (url.indexOf('/') === 0) { url = url.substring(1, url.length)}
            if (url.indexOf('http') !== 0) {
                url = 'https://' + url
            }
            return url
        }

        function snipURL(url) {
            if (url.length > 50) {
                return url.substring(0, 50) + '...'
            }
            return url
        }

        function getCurrentUser() {
            try {
                let user = localStorage.getItem('user')
                return JSON.parse(user)
            } catch (e) {
                return {'ID': '', 'UserName': '', 'FullName': ''}
            }
        }

        async function reserveItem(item) {
            await axios.post('/api/prot/wishlist_item/reserve', item)
            .then(response => {
                if (response.data.Message != 'success') {
                    EventBus.emit('notify', {
                        type: 'error',
                        text: response.data.Message,
                    })
                }
                refresh()
            })
            .catch(err => {
                console.log(err)
            })
        }

        async function unreserveItem(item) {
            await axios.post('/api/prot/wishlist_item/unreserve', item)
            .then(response => {
                refresh()
            })
            .catch(err => {
                console.log(err)
            })
        }

        return { list, list_err, share_modal_open, toggleModal, list_id, router, loading,
            getURL, snipURL, current_user, reserveItem, unreserveItem }
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
    font-size: 22px;
}

.wl-detail-title i {
    display: inline-block;
    margin-bottom: -5px;
    text-indent: 125px;

}

.wl-list-info {
    display: flex;
    flex-direction: column;
    gap: 3px;
}

.wl-detail-notes {
    font-style: italic;
    color: #aaa;
}

.wl-pill {
    display: block;
    white-space: nowrap;
    font-size: 16px;
    text-align: end;
}

.wl-get-item {
    margin-top: 5px;
    padding: 5px 10px;
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

.wl-item-hidden {
    color: tomato;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
}
.wl-item-hidden i {
    font-size: 22px;
}

.wl-reserve-notify {
    padding: 5px 10px;
    background-color: #eee;
    color: #888;
    border-radius: 10px;
    cursor: not-allowed;
    display: flex;
    flex-direction: row;
    gap: 5px;
    align-items: center;
}
.wl-reserve-notify i {
    font-size: 22px;   
}
</style>