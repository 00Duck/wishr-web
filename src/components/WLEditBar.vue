<template>
    <div class="wl-edit-bar">
        <div class="wl-edit-item theme-primary" @click="router.go(-1)"><i class="iconoir-arrow-left-circled"></i>Go back</div>
        <div class="wl-space"></div>
        <div v-if="list.ID && list.ID != '' && list.CanEdit" class="wl-edit-item theme-delete" @click="deleteList()"><i class="iconoir-remove-database-script"></i>Delete List</div>
        <div v-if="list.CanEdit || list.ID == ''" class="wl-edit-item theme-primary" @click="saveList()"><i class="iconoir-save-floppy-disk"></i>Save List</div>
    </div>
</template>

<script>
    import { useRouter } from 'vue-router';
    import axios from 'axios';

    export default {
        props: ['list'],
        setup(props) {
            const router = useRouter()
            async function saveList() {
                props.list.ItemCount = props.list.Items.length
                await axios.post('/api/prot/wishlist', props.list)
                .then(response => {
                    router.push({name: "wl-detail", params:{id: response.data.Data}})
                })
                .catch(err => {
                    console.log(err)
                })
            }

            async function deleteList() {
                if (confirm("Are you sure you want to delete this list?")) {
                    await axios.delete('/api/prot/wishlist/' + props.list.ID)
                    .then(response => {
                        router.push({name: "home"})
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
        gap: 25px;
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
</style>