<template>
    <div class="d-flex wl-edit-bar-mobile">
        <button class="btn btn-outline-primary btn-sm" type="button" @click="router.go(-1)"><i
                class="iconoir-arrow-left-circle"></i>Go back</button>
        <div class="flex-fill"></div>
        <div class="btn-group" role="group" aria-label="Menu Options">
            <button v-if="list.ID && list.ID != '' && list.IsOwner" type="button" class="btn btn-outline-danger btn-sm"
                @click="deleteList()"><i class="iconoir-remove-database-script"></i>Delete List</button>
            <button v-if="list.IsOwner || list.ID == ''" type="button" class="btn btn-outline-primary btn-sm"
                @click="saveList()"><i class="iconoir-save-floppy-disk"></i>Save List</button>
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';
import axios from 'axios';
import { EventBus } from '@/event-bus';

export default {
    props: ['list'],
    setup(props) {
        const router = useRouter()
        async function saveList() {
            props.list.ItemCount = props.list.Items.length
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
        return { router, saveList, deleteList }
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
@media (max-width: 768px) {
    .wl-edit-bar-mobile {
        position: fixed;
        bottom: -24px;
        height: 50px;
        left: 0;
        width: 100%;
        background-color: white;
        padding: 5px;
        z-index: 1;
    }
}

</style>