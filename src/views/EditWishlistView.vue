<template>
    <Nav></Nav>
    <div id="main-content">
        <div v-if="loading" class="wishr-loading" style="margin-top:10vh;"></div>
        <form v-else>
            <div class="wl-container wl-form">
                <WLEditBar :list="list"></WLEditBar>
                <div class="wl-top-form-field">
                    <label class="theme-primary">Wishlist Name</label>
                    <input type="text" required v-model="list.Name">
                </div>
            </div>
            <div class="wl-form-item wl-container" v-for="item in list.Items" :key="item.ID">
                <div class="wl-field flex-100"><div class="wl-btn-space"></div><div v-if="list.IsOwner" class="wishr-icon-link theme-delete" @click.prevent="deleteListItem(item)"><i class="iconoir-remove-empty"></i><span>Delete Item</span></div></div>
                <div class="wl-field flex-100">
                    <label class="theme-primary">Item Name</label>
                    <input type="text" required v-model="item.Name" placeholder="Name">
                </div>
                <div class="wl-field flex-100">
                    <label class="theme-primary">URL</label>
                    <input type="text" required v-model="item.URL" placeholder="URL">
                </div>
                <div class="wl-field flex-100">
                    <label class="theme-primary">Notes</label>
                    <input type="text" v-model="item.Notes" placeholder="Notes">
                </div>
                <div class="wl-field flex-50">
                    <label class="theme-primary">Price</label>
                    <input type="text" required v-model="item.Price" placeholder="Price">
                </div>
                <div class="wl-field flex-50">
                    <label class="theme-primary">Quantity</label>
                    <input type="text" min="1" max="100" @change="enforcePositive(item)" required v-model="item.Quantity" placeholder="Quantity">
                </div>
                <div class="wl-field flex-50">
                    <label class="theme-primary tooltip"><i class="iconoir-question-mark-circle wl-info-icon" title="Select to hide this item from others."></i>Personal Item</label>
                    <input type="checkbox" v-model="item.PersonalItem" style="width:15px;">
                </div>
            </div>
            <button type="button" v-if="list.IsOwner" class="wishr-btn theme-primary-bg" @click.prevent="createListItem()"><i class="iconoir-plus"></i><span v-if="list.Items.length > 0">Add another item</span><span v-else>Add an item</span></button>
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
            } catch(e) {
                item.Quantity = 1
            }
            if (item.Quantity < 1) {
                item.Quantity = 1
            }
            if (item.Quantity > 100) {
                item.Quantity = 100
            }
        }

        return { list, list_err, createListItem, deleteListItem, loading, enforcePositive }
    }
}
</script>

<style>
.wl-form {
    display: flex;
    flex-direction: column;
}
.wl-form, .wl-form-item {
    margin-bottom: 15px;
}

.wl-form input {
    padding: 10px 10px 10px 0px;
    border: 0;
    border-bottom: 1px solid #ddd;
    margin-bottom: 10px;
    color: #666;
    width: 100%;
}
.wl-form label {
    white-space: nowrap;
    padding: 5px 5px 5px 0px;
}
.wl-top-form-field {
    margin-top:20px;
    padding-left: calc(10% - 20px);
    padding-right: calc(10% - 20px);
}

.wl-form-item {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 5px;
    padding-left: 10%;
    padding-right: 10%;
}
.wl-field {
    display: flex;
    flex-direction: row;
    margin-bottom: 5px;
}

.wl-delete-btn {
    background-color: transparent;
    border: 0;
    white-space: nowrap;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}
.wl-delete-btn:hover {
    text-decoration: underline;
}
.wl-btn-space {
    flex: 100%;
}

.wl-form-item input {
    padding: 5px 5px 5px 0px;
    border: 0;
    border-bottom: 1px solid #ddd;
    color: #666;
    width: 100%;
}

.wl-form-item label {
    white-space: nowrap;
    padding: 5px 5px 5px 0px;
    min-width: 80px;
}
.flex-100 {
    flex: 100%;
}
.flex-50 {
    flex: 48%;
}

.wl-field i {
    display: inline-block;
    font-size: 18px;
    margin-right: 5px;
}

.wl-info-icon {
    font-size: 14px!important;
    cursor: pointer;
}

</style>