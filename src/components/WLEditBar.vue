<template>
    <div class="d-flex wl-edit-bar-mobile">
        <button class="btn btn-outline-primary" type="button" @click="router.go(-1)"><i
                class="iconoir-arrow-left-circle"></i>Go back</button>
        <div class="flex-fill"></div>
        <div v-if="list.ID && list.ID != '' && list.IsOwner" class="btn-group" role="group" aria-label="Menu Options">
            <button type="button" class="btn btn-outline-danger"
                @click="deleteList()"><i class="iconoir-remove-database-script"></i>Delete List</button>
            <button type="button" class="btn btn-outline-primary"
                @click="saveList()"><i class="iconoir-save-floppy-disk"></i>Save List</button>
        </div>
        <div v-if="list.ID == ''">
            <button type="button" class="btn btn-outline-primary"
                @click="createList()"><i class="iconoir-add-database-script"></i>Create List</button>
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';
import axios from 'axios';
import { EventBus } from '@/event-bus';

export default {
    props: ['list'],
    setup(props, context) {
        const router = useRouter()
        async function createList() {
            props.list.ItemCount = props.list.Items.length
            if (!validForm()) return
            await axios.post('/api/prot/wishlist', props.list)
                .then(response => {
                    EventBus.emit('notify', {
                        type: 'info',
                        text: 'Wishlist created!'
                    })
                    router.push({ name: "wl-edit", params: { id: response.data.Data } })
                })
                .catch(err => {
                    console.log(err)
                })
        }
        async function saveList() {
            props.list.ItemCount = props.list.Items.length
            if (!validForm()) return
            context.emit('leaveForm')
            await axios.post('/api/prot/wishlist', props.list)
                .then(response => {
                    EventBus.emit('notify', {
                        type: 'info',
                        text: 'Wishlist saved.'
                    })
                    router.push({ name: "wl-detail", params: { id: response.data.Data } })
                })
                .catch(err => {
                    console.log(err)
                })
        }

        async function deleteList() {
            if (confirm("Are you sure you want to delete this list?")) {
                context.emit('leaveForm')
                await axios.delete('/api/prot/wishlist/' + props.list.ID)
                    .then(response => {
                        EventBus.emit('notify', {
                            type: 'info',
                            text: 'Wishlist has been deleted.'
                        })
                        router.push({ name: "home" })
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        }

        function validForm() {
            if (props.list.Name == '') {
                EventBus.emit('notify', {
                    type: 'error',
                    text: 'You must enter a wish list name.'
                })
                return false
            }
            if (props.list.AccessMode == '') {
                EventBus.emit('notify', {
                    type: 'error',
                    text: 'You must enter a wish list sharing mode.'
                })
                return false
            }
            for (let i = 0; i < props.list.Items.length; i++) {
                let item = props.list.Items[i]
                if (item.Name == '') {
                    EventBus.emit('notify', {
                        type: 'error',
                        text: 'All wishlist items must have a name.'
                    })
                    return false
                }
            }
            return true
        }

        return { router, createList, saveList, deleteList }
    }
}
</script>

<style>
.wl-edit-bar {
    display: flex;
    flex-direction: row;
    flex-flow: flex-end;
    gap: 1rem;
}

.wl-edit-bar .wl-edit-item {
    white-space: nowrap;
    cursor: pointer;
}

.wl-edit-bar .wl-edit-item:hover {
    text-decoration: underline;
}

.wl-edit-bar .wl-edit-item i {
    display: inline-block;
    margin-right: 8px;
    font-size: 20px;
    margin-bottom: -4px;

}

.wl-edit-bar .wl-space {
    flex: 100%;
}

.wl-edit-bar-sticky {
    position: sticky;
    top: 0;
    padding: 5px 0px;
    background-color: white;
    width: 100%;
    z-index: 2;
}

@media (max-width: 768px) {
    .wl-edit-bar-mobile {
        position: fixed;
        height: 50px;
        bottom: 0;
        top:auto;
        left: 0;
        width: 100%;
        background-color: #282e37;
        padding: 5px;
        z-index: 1;
        margin: 0!important;
        top: initial;
        border-bottom: 0;
    }
    .wl-edit-bar-mobile button { 
        background-color: #404652;
        color: white;
        border-color: #3d4451;
        height: 100%;
    }
}

</style>