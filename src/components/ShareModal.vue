<template>
    <div class="wishr-modal-backdrop">
        <div class="wishr-modal">
            <h2 class="wl-share-title">Share Wishlist</h2>
            <p>Search for friends and family members below. Everyone shown here will be able to view this list!</p>
            <br>
            <div class="wl-share-bar">
                <div v-if="sharedUsers.length == 0">
                    This list is not currently shared.
                </div>
                <div v-else>
                    <div>This list is shared with:</div><br>
                    <div class="wl-share-users">
                        <div v-for="item in sharedUsers" :key="item.userID">
                            <span class="wl-share-user-avatar"></span><span>{{ item.FullName }}</span><span @click="removeSharedUser(item)" class="wl-share-remove-user"><i class="iconoir-cancel"></i></span>
                        </div>
                    </div>
                </div>
                
            </div>
            <div class="wishr-field">
                <label>Add Person</label>
                <input type="text" placeholder="Start typing to search" v-model="search" @input="filterResults()" />
                <ul v-if="search != ''" class="wl-autocomplete-results">
                    <li class="wl-autocomplete-result" @click="addSharedUser(item)" v-for="item in results" :key="item.UserID">{{ item.FullName }}</li>
                </ul>
            </div>
            <div class="wl-shared-btn-group">
                <div class="wishr-btn theme-secondary-bg wl-share-btn" @click="closeModal()">Cancel</div>
                <div class="wishr-btn theme-primary-bg wl-share-btn" @click="sendSharedUsers()">Save</div>
            </div>
        </div>
    </div>
    
</template>
<script>
import { EventBus } from '@/event-bus'
import axios from 'axios'
import { onMounted, ref } from 'vue'

export default {
    props: ['list_id'],
    setup(props, context) {
        const search = ref('')
        const sharedUsers = ref([])
        const selectableUsers = ref([])
        const results = ref([])

        onMounted( async () => {
            //get selectable users
            await axios.get('/api/prot/user/shared/selectable/' + props.list_id)
            .then(response => {
                selectableUsers.value = response.data.Data
            })
            .catch(err => {
                selectableUsers.value = []
                console.log(err)
            })
            //get users who have already been shared this list
            await axios.get('/api/prot/user/shared/' + props.list_id)
            .then(response => {
                sharedUsers.value = response.data.Data
            })
            .catch(err => {
                sharedUsers.value = []
                console.log(err)
            })
        })
        
        const closeModal = (event) => {
            context.emit("closeModal")
        }
        function addSharedUser(sel_user) {
            sharedUsers.value.push(sel_user)
            selectableUsers.value = selectableUsers.value.filter(user => {
                return user !== sel_user
            })
            results.value = results.value.filter(user => {
                return user !== sel_user
            })
            search.value = ''
        }
        function removeSharedUser(del_user) {
            selectableUsers.value.push(del_user)
            results.value.push(del_user)
            sharedUsers.value = sharedUsers.value.filter(user => {
                return user !== del_user
            })
        }

        function filterResults() {
            results.value = selectableUsers.value.filter(user => {
                return user.FullName.toLowerCase().indexOf(search.value.toLowerCase()) > -1
            })
        }

        function sendSharedUsers() {
            console.log(sharedUsers.value)
            axios.post('/api/prot/user/shared/' + props.list_id, sharedUsers.value)
            .then(response => {
                EventBus.emit('notify', {
                    type: 'info',
                    text: 'Wishlist share settings updated.'
                })
                closeModal()
            })
            .catch(err => {
                console.log(err)
            })
        }

        return { search, sharedUsers, results, closeModal, addSharedUser,
            removeSharedUser, filterResults, sendSharedUsers }
    }
}
</script>
<style>
    .wl-share-title {
        text-align: center;
    }
    .wl-shared-btn-group {
        margin-top: 40px;
        display: flex;
        flex-direction: row;
        gap: 10px;
        justify-content: flex-end;
    }
    .wl-share-btn {
        flex: 0.2;
    }
    .wl-share-bar {
        display: flex;
        flex-direction: column;
        gap: 15px;
        margin-bottom: 25px;
    }
    .wl-share-users {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 10px;
    }
    .wl-share-users div {
        background-color: #eee;
        display: flex;
        flex-direction: row;
        gap: 5px;
        border-radius: 12px;
        padding: 1px 0px;
    }

    .wl-share-users>div>span {
        display: flex;
        align-self: center;
    }

    .wl-share-remove-user {
        border-radius: 12px;
        display: flex;
        align-items: center;
        padding: 3px 3px;
    }
    .wl-share-remove-user:hover {
        background-color: #ccc;
        cursor: hover;
    }
    .wl-share-user-avatar {
        background-image: url(@/assets/avatar.svg);
        display: inline-block;
        width: 22px;
        background-size: cover;
        background-repeat: no-repeat;
        height: 22px;
    }

    .wl-autocomplete-results {
        padding: 0;
        margin: 0;
        border: 1px solid #eee;
        height: 120px;
        overflow: auto;
    }

    .wl-autocomplete-result {
        list-style: none;
        text-align: left;
        padding: 4px 2px;
        cursor: pointer;
    }
    .wl-autocomplete-result.is-active, .wl-autocomplete-result:hover {
        background-color: #0059e3;
        color: white;
    }
</style>