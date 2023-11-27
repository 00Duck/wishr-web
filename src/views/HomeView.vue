<template>
  <Nav></Nav>
  <div class="wl-content">
    <div class="wl-card py-3">
      <ul class="nav nav-pills flex-row flex-nowrap justify-content-center" id="myTab" role="tablist">
        <li class="nav-item z-1" role="presentation">
          <button class="nav-link active" id="my-list-tab" data-bs-toggle="tab" data-bs-target="#my-list-tab-pane" type="button"
            role="tab" aria-controls="my-list-tab-pane" aria-selected="false" @click.prevent="setTabPref('my-list-tab')">My Wishlists</button>
        </li>
        <li class="nav-item z-1" role="presentation">
          <button class="nav-link" id="shared-list-tab" data-bs-toggle="tab" data-bs-target="#shared-list-tab-pane"
            type="button" role="tab" aria-controls="shared-list-tab-pane" aria-selected="false" @click.prevent="setTabPref('shared-list-tab')">Shared with me</button>
        </li>
        
        <!-- <li class="nav-item" role="presentation">
        <button class="nav-link" id="my-group-tab" data-bs-toggle="tab" data-bs-target="#my-group-tab-pane" type="button"
          role="tab" aria-controls="my-group-tab-pane" aria-selected="false">My Groups</button>
      </li> -->
      </ul>
      <div class="tab-content" id="home-content">
        <div class="tab-pane fade show active" id="my-list-tab-pane" role="tabpanel" aria-labelledby="my-list-tab" tabindex="0">
          <List :list_url="my_lists_url" :title="my_wl_title" :list_empty_msg="my_list_empty" :bg="my_list_bg"></List>
          <div class="d-flex justify-content-center">
            <button class="btn btn-primary z-1" @click.prevent="goCreateWishlist()"><i class="iconoir-database-script"></i>Create a Wishlist!</button>
          </div>
        </div>
        <div class="tab-pane fade" id="shared-list-tab-pane" role="tabpanel" aria-labelledby="shared-list-tab"
          tabindex="0">
          <List :list_url="shared_lists_url" :title="shared_wl_title" :list_empty_msg="shared_list_empty"
            :bg="shared_list_bg"></List>
        </div>
        
        <!-- <div class="tab-pane fade" id="my-group-tab-pane" role="tabpanel" aria-labelledby="my-group-tab" tabindex="0">
        ...
      </div> -->
      </div>
    </div>


  </div>
  <!-- <div class="container my-3">
    <List :list_url="my_lists_url" :title="my_wl_title" :list_empty_msg="my_list_empty" :bg="my_list_bg"></List>
    <br />
    <List :list_url="shared_lists_url" :title="shared_wl_title" :list_empty_msg="shared_list_empty" :bg="shared_list_bg">
    </List>
  </div> -->
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
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
      try {
        let tabPref = localStorage.getItem('wishlist_tab_preference')
        if (!tabPref || tabPref == '') {
          document.getElementById("my-list-tab").click()
          return
        }
        document.getElementById(tabPref).click()
      } catch(e) {
        console.log(e)
      }
    })

    function setTabPref(id) {
      try {
        localStorage.setItem('wishlist_tab_preference', id)
      } catch (e) {
        console.log(e)
      }
    }

    function goCreateWishlist() {
      router.push('/wishlist/create')
    }

    const my_lists_url = ref('/api/prot/wishlist')
    const my_wl_title = ref("My Wishlists")
    const my_list_empty = ref("There's nothing to see here yet. Create a new list to get started!")
    const my_list_bg = ref('wl-bg-my-wishlist')

    const shared_lists_url = ref('/api/prot/wishlist/shared')
    const shared_wl_title = ref("Shared with me")
    const shared_list_empty = ref("No one has shared anything with you yet. Ask others to share their lists with you!")
    const shared_list_bg = ref('wl-bg-share')

    return {
      my_lists_url, my_wl_title, my_list_empty, my_list_bg,
      shared_lists_url, shared_wl_title, shared_list_empty, shared_list_bg, setTabPref, goCreateWishlist
    }
  }
}
</script>
<style>
button.nav-link {
  font-size: calc(.80rem + .3vw) !important;
}
</style>