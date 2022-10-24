<template>
  <List :lists="my_lists" :title="my_wl_title"></List>
  <br />
  <List :lists="shared_lists" :title="shared_wl_title"></List>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

import { ref } from 'vue'
import List from '@/components/List.vue'

export default {
  name: 'HomeView',
  components: { List },
  setup() {
    let my_lists = ref([
      {"name": "Christmas Wishlist 2022", "items": [{"name": "", "url": "", "price": "", "quantity": "", "notes": ""}], "id": 123, "created": "2022-04-05"},
      {"name": "Christmas Wishlist 2021", "items": [{"name": "", "url": "", "price": "", "quantity": "", "notes": ""}], "id": 345, "created": "2022-04-05"},
      {"name": "Christmas Wishlist 2020", "items": [{"name": "", "url": "", "price": "", "quantity": "", "notes": ""}], "id": 456, "created": "2022-04-05"},
    ])
    let my_wl_title = ref("My Wishlists")

    let shared_lists = ref([
      {"name": "Sally's Wishlist 2022", "items": [{"name": "", "url": "", "price": "", "quantity": "", "notes": ""}], "id": 654, "created": "2022-04-05"},
      {"name": "Mark's Wishlist 2021", "items": [{"name": "", "url": "", "price": "", "quantity": "", "notes": ""}], "id": 765, "created": "2022-04-05"},
      {"name": "John's Stuff", "items": [{"name": "", "url": "", "price": "", "quantity": "", "notes": ""}], "id": 876, "created": "2022-04-05"},
    ])
    let shared_wl_title = ref("Shared with me")

    return { shared_lists, shared_wl_title, my_lists, my_wl_title }
  }
}
</script>
