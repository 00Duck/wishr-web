<template>
    <Nav></Nav>
    <div class="wl-content">
        <div v-if="loading" class="wishr-loading" style="margin-top:10vh;"></div>
        <form v-else class="card wl-card px-5 py-3">
            <WLEditBar :list="list" @leaveForm="leaveForm()" class="mb-4"></WLEditBar>
                <h2 v-if="list.ID != ''" class="d-flex align-content-center justify-content-center">Edit List</h2>
                <h2 v-else class="d-flex align-content-center justify-content-center">Create List</h2>
                <div class="wishr-field">
                    <label class="form-label wl-required">Wishlist name</label>
                    <input type="text" v-model="list.Name" placeholder="" @change="has_changes = true">
                </div>
            <transition-group name="itemlist">
                <div v-for="item, index in list.Items" :key="item.RowKey" class="my-5 wl-list-item-cont">

                    <div class="d-flex flex-row">
                        <div v-if="list.IsOwner" class="d-flex gap-1 mb-4">
                            <button type="button" class="btn btn-outline-primary btn-sm d-flex align-items-center"
                                @click.prevent="moveUp(item, index)" :disabled="index === 0">
                                <span class="iconoir-arrow-up-circle"></span>
                            </button>
                            <button type="button" class="btn btn-outline-primary btn-sm d-flex align-items-center"
                                @click.prevent="moveDown(item, index)" :disabled="index === list.Items.length - 1">
                                <span class="iconoir-arrow-down-circle"></span>
                            </button>

                            <div class="dropdown mx-2">
                                <button class="btn btn-outline-secondary btn-sm d-flex align-items-center" type="button"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                    <span class="iconoir-more-horiz"></span>
                                </button>
                                <ul class="dropdown-menu dropdown-menu-dark">
                                    <li><a class="dropdown-item" href="#" @click.prevent="deleteListItem(item)">Delete
                                            Item</a></li>
                                    <!-- <li><a class="dropdown-item" href="#"><span disabled>Move to Wishlist...</span></a></li> -->
                                </ul>
                            </div>
                            <!-- <button type="button" class="btn btn-outline-danger btn-sm" @click.prevent="deleteListItem(item)">
                                <i class="iconoir-bin-minus"></i><span>Delete Item</span>
                            </button> -->
                        </div>
                        <div class="flex-fill"></div>
                    </div>
                    <div class="px-2">
                        <div class="wishr-field">
                            <label class="form-label wl-required">Item #{{ index + 1 }} name</label>
                            <input type="text" v-model="item.Name" placeholder="" @change="has_changes = true">
                        </div>
                        <div class="wishr-field">
                            <label class="form-label">URL</label>
                            <input type="text" v-model="item.URL" placeholder="" @change="has_changes = true">
                        </div>
                        <div class="wishr-field">
                            <label class="form-label">Notes</label>
                            <input type="text" v-model="item.Notes" placeholder="" @change="has_changes = true">
                        </div>
                        <div class="row g-2">
                            <div class="col-6">
                                <div class="wishr-field">
                                    <label class="form-label">Price</label>
                                    <input type="text" v-model="item.Price" placeholder="" @change="has_changes = true">
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="wishr-field">
                                    <label class="form-label">Quantity</label>
                                    <input type="text" min=1 max=100 @change="enforcePositive(item)" v-model="item.Quantity"
                                        placeholder="">
                                </div>
                            </div>
                        </div>
                        <div class="row g-2">
                            <div class="col-6">
                                <div class="form-check form-switch">
                                    <label class="form-check-label" for="" data-bs-toggle="tooltip" data-bs-placement="top"
                                        data-bs-title="Tooltip on top">Personal Item</label>
                                    <input class="form-check-input" type="checkbox" v-model="item.PersonalItem" @change="has_changes = true">
                                </div>
                            </div>
                            <div class="col-6 wl-edit-list-browse">
                                <img :src="getImageURL(item)" class="wl-list-img">
                                <div class="wl-list-img-btns">
                                    <button type="button" class="btn btn-outline-primary btn-sm"
                                        @click.prevent="openImageUploader(index)">
                                        <span>Upload Image</span>
                                    </button>
                                    <button v-if="item.ImageURL" type="button" class="btn btn-outline-secondary btn-sm"
                                        @click.prevent="removeImage(item)">
                                        <span>Remove Image</span>
                                    </button>
                                    <input type="file" accept="image/*" :id="'imageHandler-' + index"
                                        @change="handleUpload($event, item)" hidden>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition-group>
            <div v-if="list.IsOwner && list.ID != ''" class="py-3 px-3">
                <div class="d-flex flex-row justify-content-center">
                    <button type="button" class="btn btn-primary wl-add-item-btn" @click.prevent="createListItem()"><i
                            class="iconoir-plus"></i><span v-if="list.Items.length > 0">Add another item</span><span
                            v-else>Add an item</span></button>
                </div>
            </div>

        </form>
    </div>
</template>

<script>
import { onUnmounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
import axios from 'axios';
import { EventBus } from '@/event-bus';
import WLEditBar from '@/components/WLEditBar.vue'
import Nav from '@/components/Nav.vue'
import debounce from 'lodash/debounce'

export default {
    components: { WLEditBar, Nav },
    beforeRouteLeave(to, from) {
        if (this.has_changes) {
            const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
            if (!answer) return false
        }
    },
    setup() {
        const route = useRoute()
        const list = ref({
            ID: "",
            Name: "",
            ItemCount: 0,
            Items: [],
            Owner: "",
            PersonalItem: false,
            IsOwner: true
        })
        const list_id = ref(route.params.id)
        const list_err = ref(null)
        const loading = ref(true)
        const has_changes = ref(false)

        onMounted(async () => {
            let debounceScroll = debounce(scrollEditMenu, 50)
            window.addEventListener('scroll', debounceScroll)
            //If there's no ID, we're in "create mode". Else we're in edit mode
            // and need to fetch the ID of the list to edit
            if (list_id.value) {
                try {
                    let data = await fetch('/api/prot/wishlist/' + list_id.value)
                    if (!data.ok) {
                        throw Error('Error loading wishlist: ' + data.status + ' ' + data.statusText)
                    }
                    data = await data.json()
                    list.value = data.Data
                    setListItemOrder(list.value)
                    setRowKeysWhereEmpty(list.value)
                } catch (err) {
                    list_err.value = err.message
                } finally {
                    loading.value = false
                }
            } else {
                loading.value = false
            }
        })

        onUnmounted(async () => {
            window.removeEventListener('scroll', debounceScroll)
        })

        function scrollEditMenu(event) {
            let el = document.querySelector('.wl-edit-bar-mobile')
            console.log(window.scrollY)
            window.scrollY > 50 ? el.classList.add('wl-edit-bar-sticky') : el.classList.remove('wl-edit-bar-sticky')
        }

        function createListItem() {
            list.value.Items.push({
                WishList: "",
                Name: "",
                URL: "",
                Notes: "",
                Price: "",
                ImageURL: "",
                Quantity: 1,
                Order: list.value.Items.length + 1,
                PersonalItem: false,
                RowKey: generateRowKey()
            })
            has_changes.value = true
        }

        async function deleteListItem(del_item) {
            if (!confirm("Are you sure you want to delete this item?")) {
                return
            }
            has_changes.value = true
            if (del_item.ImageURL != '') {
                await axios.post('/api/prot/images/delete', { ImageURL: del_item.ImageURL })
                    .catch(err => {
                        console.log(err)
                    })
            }
            list.value.Items = list.value.Items.filter((item) => {
                return item != del_item
            })
        }

        function enforcePositive(item) {
            try {
                item.Quantity = parseInt(item.Quantity, 10)
                if (isNaN(item.Quantity)) {
                    item.Quantity = 1
                }
            } catch (e) {
                item.Quantity = 1
            }
            if (item.Quantity < 1) {
                item.Quantity = 1
            }
            if (item.Quantity > 100) {
                item.Quantity = 100
            }
            has_changes.value = true
        }

        //ensures the list remains properly ordered. However it comes in is the new, trusted order
        function setListItemOrder(list) {
            if (!list.hasOwnProperty('Items')) { return }
            for (let i = 0; i < list.Items.length; i++) {
                list.Items[i].Order = i + 1
            }
        }

        //ensures we have a unique ID for all rows so that transition animations work
        function setRowKeysWhereEmpty(list) {
            if (!list.hasOwnProperty('Items')) { return }
            for (let i = 0; i < list.Items.length; i++) {
                if (list.Items[i].RowKey == '') list.Items[i].RowKey = generateRowKey()
            }
            console.log(list)
        }

        function moveUp(item, index) {
            if (index === 0) { return }

            item.Order = list.value.Items[index - 1].Order
            list.value.Items[index - 1].Order = index + 1

            list.value.Items.sort((a, b) => a.Order - b.Order)
            has_changes.value = true
        }

        function moveDown(item, index) {
            if (index === list.value.Items.length - 1) { return }

            item.Order = list.value.Items[index + 1].Order
            list.value.Items[index + 1].Order = index + 1

            list.value.Items.sort((a, b) => a.Order - b.Order)
            has_changes.value = true
        }

        function openImageUploader(itemID) {
            document.getElementById("imageHandler-" + itemID).click()
        }

        async function handleUpload(event, item) {
            if (item.ImageURL != '') {
                await axios.post('/api/prot/images/delete', { ImageURL: item.ImageURL })
                    .catch(err => {
                        console.log(err)
                    })
            }
            const formData = new FormData()
            const file = event.target.files[0]
            formData.append("file", file)
            let msgType = 'error'
            let msgText = ''
            await axios.post('/api/prot/images/wishlist_items/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                    if (response.data.Message !== 'success') {
                        msgType = 'error'
                        msgText = response.data.Message
                    } else {
                        msgType = 'info'
                        msgText = 'Your image has been successfully uploaded.',
                            item.ImageURL = response.data.Data
                        has_changes.value = true
                    }
                    EventBus.emit('notify', {
                        type: msgType,
                        text: msgText,
                    })
                })
                .catch(err => {
                    console.log(err)
                })
            if (msgType == 'info') { //do a save to make sure we capture the imageURL in the right spot
                await axios.post('/api/prot/wishlist', list.value)
                    .catch(err => {
                        console.log(err)
                    })
            }
        }

        function getImageURL(item) {
            if (item.ImageURL != '') {
                return '/api/open' + item.ImageURL
            }
            return ''
        }

        async function removeImage(item) {
            try {
                await axios.post('/api/prot/images/delete', { ImageURL: item.ImageURL })
                    .then(resp => {
                        EventBus.emit('notify', {
                            type: 'info',
                            text: resp.data.Data,
                        })
                    })
                item.ImageURL = ''
                await axios.post('/api/prot/wishlist', list.value)
            } catch (e) {
                console.log(e)
            }
        }

        function generateRowKey() {
            let str = (Math.random() * 10 ** 10) * (performance.now()) + new Date().toISOString()
            let hash = 0
            for (let i = 0; i < str.length; i++) {
                hash = ((hash << 5) - hash) + str.charCodeAt(i)
                hash |= 0
            }
            return Math.abs(hash) + ''
        }

        function leaveForm() {
            has_changes.value = false
        }

        return { list, list_err, createListItem, deleteListItem, loading, enforcePositive, moveUp, moveDown, handleUpload, getImageURL, openImageUploader, removeImage, has_changes, leaveForm }
    }
}
</script>

<style lang="scss">
/* Transitions for itemlist transition group */
.wl-list-item-cont {
    background-color: #FFF;
}

.itemlist-move,
.itemlist-enter-active,
.itemlist-leave-active {
    transition: all 0.5s ease;
}

.itemlist-enter-from,
.itemlist-leave-to {
    opacity: 0;
    transform: translateX(-1000px);
}

.itemlist-leave-active {
    position: absolute;
}

/* END ANIMATION */

.form-label {
    margin-bottom: 0rem;
}


.wl-info-icon {
    font-size: 16px !important;
    cursor: pointer;
}

.wl-add-item-btn {
    width: 100%;
    max-width: 400px;
}

div.wl-btn-row {
    border-left: 0 !important;
}

.wl-list-img {
    max-width: 80px;
    max-height: 80px;
}

.wl-list-img-btns {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1%;
}

.wl-edit-list-browse {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.wl-edit-list-browse input {
    color: red;
}

@media (max-width: 768px) {
    .wl-list-img-btns {
        flex-direction: column;
        gap: 2px;
    }
}
</style>