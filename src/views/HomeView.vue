<template>
    <Nav></Nav>
    <div class="container my-3">
        <List :list_url="my_lists_url" :title="my_wl_title" :list_empty_msg="my_list_empty" :bg="my_list_bg"></List>
        <br />
        <List :list_url="shared_lists_url" :title="shared_wl_title" :list_empty_msg="shared_list_empty" :bg="shared_list_bg"></List>
    </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { ref } from 'vue'
import List from '@/components/List.vue'
import Nav from '@/components/Nav.vue'

export default {
  name: 'HomeView',
  components: { List, Nav },
  setup() {
    const my_lists_url = ref('/api/prot/wishlist')
    const my_wl_title = ref("My Wishlists")
    const my_list_empty = ref("There's nothing to see here yet. Create a new list to get started!")
    const my_list_bg = ref('wl-bg-my-wishlist')

    const shared_lists_url = ref('/api/prot/wishlist/shared')
    const shared_wl_title = ref("Shared with me")
    const shared_list_empty = ref("No one has shared anything with you.")
    const shared_list_bg = ref('wl-bg-sad')

    return { my_lists_url, my_wl_title, my_list_empty, my_list_bg,
       shared_lists_url, shared_wl_title, shared_list_empty, shared_list_bg }
  }
}
</script>
