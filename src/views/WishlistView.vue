<template>
    <ShareModal :list_id="list_id" v-if="share_modal_open" @closeModal="toggleModal(false)"></ShareModal>
    <Nav></Nav>
    <div class="wl-content">
        <div v-if="loading" class="wishr-loading" style="margin-top:10vh"></div>
        <div v-else-if="!list" class="card wl-card px-5 py-3 d-flex flex-column align-items-center gap-4">
            <h1>Uh oh!</h1>
            <div class="wl-no-list-bg"></div>
            <p>The list you are trying to view either does not exist or is no longer shared with you.</p>
            <div class="btn btn-primary btn-lg" @click="router.push({ name: 'home' })"><i
                    class="iconoir-home-simple-door"></i><span>Back to safety</span></div>
        </div>
        <div v-else class="card wl-card px-5 py-3">
            <WLActionBar :id="list.ID" :can_edit="list.IsOwner" @openModal="toggleModal(true)"></WLActionBar>
            <h1 class="text-center my-3">{{ list.Name }}</h1>
            <div class="text-center d-flex flex-row flex-wrap justify-content-center gap-2 mt-1 mb-3">
                <div class="wishr-badge" v-if="!list.IsOwner">
                    <div>Shared by</div>
                    <div class="wishr-badge-green">{{ list.OwnerFullName }}</div>
                </div>
                <div class="wishr-badge">
                    <div>Created on</div>
                    <div class="wishr-badge-purple">{{ new Date(list.CreatedAt).toDateString() }}</div>
                </div>
                <div class="wishr-badge">
                    <div>Last updated</div>
                    <div class="wishr-badge-blue">{{ new Date(list.UpdatedAt).toDateString() }}</div>
                </div>
            </div>

            <div class="row my-3" v-if="list.Items.length == 0">No items have been added yet. Edit the list and get wishing!</div>
            <div v-for="item in list.Items" :key="item.ID" class="row justify-content-between my-3"
                v-show="!item.PersonalItem || (item.PersonalItem && list.IsOwner)">
                <div class="col-md-10 col-xs-12 wl-img-txt-box">
                    <div class="wl-view-img-box"><img :src="getImageURL(item)" class="wl-list-img"></div>
                    <div>
                        <div class="fs-4">{{ item.Name }}</div>
                        <div class="fs-6 fw-lighter mb-2">{{ item.Notes }}</div>
                        <div class="badge bg-secondary mb-2">Wants {{ item.Quantity }} <span v-if="item.Price">@ {{
                            item.Price }} ea.</span></div>
                        <div v-if="item.PersonalItem && list.IsOwner" class="wl-item-hidden mb-2"><i
                                class="iconoir-eye-off"></i><span>Item is only visible to you</span></div>
                    </div>

                </div>
                <div class="col-md-2 col-xs-12 text-end gy-2">
                    <div v-if="list.Owner !== current_user.ID" class="d-flex flex-column gap-1">
                        <a :href="getURL(item.URL)" class="btn btn-outline-primary" rel="noreferrer" target="_blank"
                            v-if="item.URL"><i class="iconoir-navigator"></i>Visit link</a>
                        <button type="button" @click.prevent="reserveItem(item)" v-if="item.ReservedBy == ''"
                            class="btn btn-primary"><i class="iconoir-gift"></i><span>Reserve item</span></button>
                        <button type="button" @click.prevent="unreserveItem(item)"
                            v-else-if="item.ReservedBy == current_user.ID" class="btn btn-danger"><i
                                class="iconoir-remove-from-cart"></i><span>Release item</span></button>
                        <div v-else>
                            <button type="button" class="btn btn-primary" style="width:100%;" disabled><i class="iconoir-gift"></i><span>Reserve item</span></button>
                            <div class="wl-reserved-txt mt-1"><span>Someone else is getting this</span></div>
                        </div>
                    </div>
                    <div v-else class="d-flex flex-column gap-1">
                        <a :href="getURL(item.URL)" class="btn btn-outline-primary" rel="noreferrer" target="_blank"
                            v-if="item.URL"><i class="iconoir-navigator"></i>Visit link</a>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import { onUnmounted, ref } from 'vue';
import WLActionBar from '@/components/WLActionBar.vue'
import { useRoute, useRouter } from 'vue-router';
import { onMounted } from 'vue';
import Nav from '@/components/Nav.vue'
import ShareModal from '@/components/ShareModal.vue'
import axios from 'axios';
import { EventBus } from '@/event-bus';
import debounce from 'lodash/debounce';


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
            let debounceScroll = debounce(scrollActionMenu, 50)
            window.addEventListener('scroll', debounceScroll)
            refresh()
        })

        onUnmounted(async() => {
            window.removeEventListener('scroll', debounceScroll)
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

        function scrollActionMenu(event) {
            let el = document.querySelector('.wl-action-bar-mobile')
            window.scrollY > 50 ? el.classList.add('wl-action-bar-sticky') : el.classList.remove('wl-action-bar-sticky')
        }

        function getImageURL(item) {
            if (item.ImageURL != '') {
                return '/api/open' + item.ImageURL
            }
            return require('@/assets/wishlist-item-no-img.svg')
        }

        function toggleModal(state) {
            share_modal_open.value = state
        }

        function getURL(url) {
            if (!url || url == '') { return '' }
            if (url.indexOf('/') === 0) { url = url.substring(1, url.length) }
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
                return { 'ID': '', 'UserName': '', 'FullName': '' }
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

        return {
            list, list_err, share_modal_open, toggleModal, list_id, router, loading,
            getURL, snipURL, current_user, reserveItem, unreserveItem, getImageURL
        }
    }
}
</script>

<style>
.wl-reserved-txt {
    font-size: .75rem;
    color: var(--bs-secondary);
    font-weight: bold;

}
.wl-no-list-bg {
    mask: url(@/assets/not-found.svg);
    mask-size: contain;
    mask-repeat: no-repeat;
    mask-position: center;
    display: flex;
    align-self: center;
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

.wl-img-txt-box {
    display: flex;
    flex-direction: row;
    gap: 2%;
    align-items: center;
}

.wl-list-img {
    max-width: 80px;
    max-height: 80px;
}

/* keeps all images centered within the box, and adds space when the image isn't exactly 80x80 */
.wl-view-img-box {
    min-height: 80px;
    min-width: 80px;
    display: flex;
    flex-direction: row;
    justify-content: center;
}

@media (max-width: 768px) {
    .wl-view-img-box {
        max-height: 200px;
        max-width: 200px;
        align-self: center;
    }
    .wl-list-img {
        max-width: 100%;
        max-height: 200px;
    }
    .wl-img-txt-box { 
        flex-direction: column;
        align-items: flex-start;
    }
    .wl-img-txt-box img {
        align-self: center;
    }
}

</style>