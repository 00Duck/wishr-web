<template>
    <Nav></Nav>
    <div id="main-content">
        <List :list_url="my_lists_url" :title="my_wl_title"></List>
        <br />
        <List :list_url="shared_lists_url" :title="shared_wl_title"></List>
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

    const shared_lists_url = ref('/api/prot/wishlist')
    const shared_wl_title = ref("Shared with me")

    return { my_lists_url, my_wl_title, shared_lists_url, shared_wl_title }
  }
}
</script>
