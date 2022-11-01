<template>
    <Nav></Nav>
    <div id="main-content">
        <form>
            <div class="wl-container wl-form">
                <WLEditBar :list="list"></WLEditBar>
                <label class="theme-primary">Wishlist Name</label>
                <input type="text" required v-model="list.Name">
            </div>
            <div class="wl-form-item wl-container" v-for="item in list.Items" :key="item.ID">
                <div class="wl-field flex-100"><div class="wl-btn-space"></div><button v-if="list.CanEdit" class="wl-delete-btn theme-delete" @click.prevent="deleteListItem(item)"><i class="iconoir-remove-empty"></i><span>Delete Item</span></button></div>
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
                    <input type="text" required v-model="item.Quantity" placeholder="Quantity">
                </div>
            </div>
        </form>
        <button v-if="list.CanEdit" class="wishr-btn theme-primary-bg" @click.prevent="createListItem()"><i class="iconoir-plus"></i><span v-if="list.Items.length > 0">Add another item</span><span v-else>Add an item</span></button>
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
        })
        const list_id = ref(route.params.id)
        const list_err = ref(null)

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
                }
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
            })
        }

        function deleteListItem(del_item) {
            list.value.Items = list.value.Items.filter((item) => {
                return item != del_item
            })
        }

        return { list, list_err, createListItem, deleteListItem }
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
    margin-top:20px;
    white-space: nowrap;
    padding: 5px 5px 5px 0px;
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

.wl-field i { /* Mostly for delete button icon */
    display: inline-block;
    font-size: 18px;
    margin-right: 5px;
}

</style>