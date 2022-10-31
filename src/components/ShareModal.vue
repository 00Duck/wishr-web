<template>
    <div class="wishr-modal-backdrop">
        <div class="wishr-modal">
            <h2 class="wl-share-title">Share Wishlist</h2>
            <p>Search for friends and family members below. Everyone shown here will be able to view this list!</p>
            <br>
            <div class="wl-share-bar">
                <div>This list is currently shared with:</div>
                <div class="wl-share-users">
                    <div v-for="item in sharedUsers" :key="item.userID" @click="removeSharedUser(item)">
                        <span class="wl-share-user-avatar"></span><span>{{ item.FullName }}</span><span class="wl-share-remove-user"><i class="iconoir-cancel"></i></span>
                    </div>
                </div>
                
            </div>
            <div class="wishr-field">
                <label>Add Person</label>
                <input type="text" placeholder="Start typing to search" />
            </div>
            <div class="wl-shared-btn-group">
                <div class="wishr-btn theme-secondary-bg wl-share-btn" @click="closeModal()">Cancel</div>
                <div class="wishr-btn theme-primary-bg wl-share-btn">Save</div>
            </div>
        </div>
    </div>
    
</template>
<script>
import { ref } from 'vue'

export default {
    setup(props, context) {
        const sharedUsers = ref([{
            "UserID":"1234",
            "UserName": "bob",
            "FullName": "Steve Barley"
        },
        {
            "UserID":"1234",
            "UserName": "bob",
            "FullName": "Bob Barley"
        },
        {
            "UserID":"1234",
            "UserName": "bob",
            "FullName": "Jim Barley"
        }])
        const closeModal = (event) => {
            context.emit("closeModal")
        }
        function addSharedUser(user) {
            sharedUsers.value.push(user)
        }
        function removeSharedUser(del_user) {
            sharedUsers.value = sharedUsers.value.filter(user => {
                return user !== del_user
            })
        }

        return { closeModal, sharedUsers, addSharedUser, removeSharedUser }
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
    }
    .wl-share-users {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 10px;
        margin-bottom: 25px;
    }
    .wl-share-users div {
        background-color: #eee;
        display: flex;
        flex-direction: row;
        gap: 5px;
        border-radius: 12px;
        padding: 1px 0px;
    }

    .wl-share-remove-user {
        border-radius: 12px;
        display: flex;
        align-items: center;
        padding: 0 3px;
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
</style>