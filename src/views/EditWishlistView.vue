<template>
    <Nav></Nav>
    <div class="container my-3">
        <div v-if="loading" class="wishr-loading" style="margin-top:10vh;"></div>
        <form v-else>
            <div class="card p-4 my-3">
                <WLEditBar :list="list" class="mb-4"></WLEditBar>
                <div class="form-floating mx-4">
                    <input type="text" class="form-control" v-model="list.Name" placeholder="Wishlist name">
                    <label class="text-primary">Wishlist name</label>
                </div>
            </div>
            <div class="card px-5 py-3 my-3" v-for="item, index in list.Items" :key="item.ID">
                <div class="d-flex flex-row">
                    <div class="flex-fill"></div>
                    <div v-if="list.IsOwner" class="btn-group mb-4" role="group" aria-label="List order menu">
                        <button type="button" class="btn btn-outline-primary btn-sm"
                            @click.prevent="moveUp(item, index)" :disabled="index === 0">
                            <i class="iconoir-arrow-up-circle"></i><span>Up</span>
                        </button>
                        <button type="button" class="btn btn-outline-primary btn-sm"
                            @click.prevent="moveDown(item, index)" :disabled="index === list.Items.length - 1">
                            <i class="iconoir-arrow-down-circle"></i><span>Down</span>
                        </button>
                        <button type="button" class="btn btn-outline-danger btn-sm"
                            @click.prevent="deleteListItem(item)">
                            <i class="iconoir-bin-minus"></i><span>Delete Item</span>
                        </button>
                    </div>
                </div>
                <div class="form-floating mb-2">
                    <input type="text" class="form-control" v-model="item.Name" placeholder="Item Name">
                    <label class="text-primary">Item name</label>
                </div>
                <div class="form-floating mb-2">
                    <input type="text" class="form-control" v-model="item.URL" placeholder="URL">
                    <label class="text-primary">URL</label>
                </div>
                <div class="form-floating mb-2">
                    <input type="text" class="form-control" v-model="item.Notes" placeholder="Notes">
                    <label class="text-primary">Notes</label>
                </div>
                <div class="row g-2">
                    <div class="col-6">
                        <div class="form-floating mb-2">
                            <input type="text" class="form-control" v-model="item.Price" placeholder="Price">
                            <label class="text-primary">Price</label>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="form-floating mb-2">
                            <input type="text" min="1" max="100" @change="enforcePositive(item)" class="form-control"
                                v-model="item.Quantity" placeholder="Quantity">
                            <label class="text-primary">Quantity</label>
                        </div>
                    </div>
                </div>
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" v-model="item.PersonalItem">
                    <label class="form-check-label text-primary" for="" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Tooltip on top">Personal Item</label>
                </div>
            </div>
            <div class="wl-sticky-space"></div>
            <div v-if="list.IsOwner" class="wl-sticky-btn">
                <div class="d-flex flex-column p-3 gap-2 justify-content-center wl-sticky-bg">
                    <button type="button" class="btn btn-primary" @click.prevent="createListItem()"><i
                            class="iconoir-plus"></i><span v-if="list.Items.length > 0">Add another item</span><span
                            v-else>Add an item</span></button>
                </div>
            </div>

        </form>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
import WLEditBar from '@/components/WLEditBar.vue'
import Nav from '@/components/Nav.vue'

export default {
    components: { WLEditBar, Nav },
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

        onMounted(async () => {
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
                } catch (err) {
                    list_err.value = err.message
                } finally {
                    loading.value = false
                }
            } else {
                loading.value = false
            }
        })

        function createListItem() {
            list.value.Items.push({
                WishList: "",
                Name: "",
                URL: "",
                Notes: "",
                Price: "",
                Quantity: 1,
                Order: list.value.Items.length + 1,
                PersonalItem: false
            })
        }

        function deleteListItem(del_item) {
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
        }

        //ensures the list remains properly ordered. However it comes in is the new, trusted order
        function setListItemOrder(list) {
            if (!list.hasOwnProperty('Items')) { return }
            for (let i = 0; i < list.Items.length; i++) {
                list.Items[i].Order = i + 1
            }
        }

        function moveUp(item, index) {
            if (index === 0) { return }

            item.Order = list.value.Items[index - 1].Order
            list.value.Items[index - 1].Order = index + 1

            list.value.Items.sort((a, b) => a.Order - b.Order)
        }

        function moveDown(item, index) {
            if (index === list.value.Items.length - 1) { return }

            item.Order = list.value.Items[index + 1].Order
            list.value.Items[index + 1].Order = index + 1

            list.value.Items.sort((a, b) => a.Order - b.Order)
        }

        return { list, list_err, createListItem, deleteListItem, loading, enforcePositive, moveUp, moveDown }
    }
}
</script>

<style>
.wl-sticky-btn {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
}

.wl-sticky-space {
    height: 3rem;
}

.wl-sticky-bg {
    background-color: #FFFFFF;
}

.wl-info-icon {
    font-size: 16px !important;
    cursor: pointer;
}
</style>