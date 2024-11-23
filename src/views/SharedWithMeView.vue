<template>
  <Nav></Nav>
  <div class="wl-content">
    <div class="wl-card py-3">
      <HeaderBar :title="shared_wl_title" :icon_name="shared_list_icon" ></HeaderBar>
      <List :list_url="shared_lists_url" :title="shared_wl_title" :list_empty_msg="shared_list_empty"
        :bg="shared_list_bg" ></List>

    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { onMounted, ref } from 'vue'
import List from '@/components/List.vue'
import Nav from '@/components/Nav.vue'
import { useRouter } from 'vue-router'
import HeaderBar from '@/components/HeaderBar.vue'

export default {
  components: { List, Nav, HeaderBar },
  setup() {

    const router = useRouter()

    onMounted(async () => {

    })

    const shared_lists_url = ref('/api/prot/wishlist/shared')
    const shared_wl_title = ref("Shared With Me")
    const shared_list_empty = ref("No one has shared anything with you yet. Ask others to share their lists with you!")
    const shared_list_bg = ref('wl-bg-share')
    const shared_list_icon = ref('iconoir-share-android')

    return {
      shared_lists_url, shared_wl_title, shared_list_empty, shared_list_bg, shared_list_icon
    }
  }
}
</script>
<style></style>