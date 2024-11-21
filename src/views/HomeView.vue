<template>
  <Nav></Nav>
  <div class="wl-content">
    <div class="wl-card py-3">
      <List :list_url="my_lists_url" :title="my_wl_title" :list_empty_msg="my_list_empty" :bg="my_list_bg"></List>
      <div class="d-flex justify-content-center">
        <button class="btn btn-primary z-1" @click.prevent="goCreateWishlist()"><i class="iconoir-database-script"></i>Create a Wishlist!</button>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { onMounted, ref } from 'vue'
import List from '@/components/List.vue'
import Nav from '@/components/Nav.vue'
import { useRouter } from 'vue-router'

export default {
  name: 'HomeView',
  components: { List, Nav },
  setup() {

    const router = useRouter()

    onMounted(async () => {
    })

    function goCreateWishlist() {
      router.push('/wishlist/create')
    }

    const my_lists_url = ref('/api/prot/wishlist')
    const my_wl_title = ref("My Wishlists")
    const my_list_empty = ref("There's nothing to see here yet. Create a new list to get started!")
    const my_list_bg = ref('wl-bg-my-wishlist')

    return {
      my_lists_url, my_wl_title, my_list_empty, my_list_bg, goCreateWishlist
    }
  }
}
</script>
<style>
</style>