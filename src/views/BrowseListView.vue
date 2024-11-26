<template>
  <Nav></Nav>
  <div class="wl-content">
    <div class="wl-card py-3">
      <HeaderBar :title="'Browse Public Wish Lists'" :icon_name="'iconoir-community'"></HeaderBar>
      <div class="card py-3 px-3">
        <div class="table-responsive">
          <table class="table align-middle wl-table">
            <thead>
              <tr>
                <th>Wish List</th>
                <th>List Owner</th>
                <th>Items</th>
                <th>Created On</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="loading">
                <td colspan=4>
                  <div class="wishr-loading"></div>
                </td>
              </tr>
              <tr v-else-if="!loading && list.length == 0">
                <td colspan=4>
                  <div class="d-flex justify-content-center p-4">There are no public lists available.</div>
                </td>
              </tr>
              <tr v-else v-for="item in list" :key="item.ID" v-if="list.length > 0" class="position-relative">
                <td>
                  <router-link :to="{ name: 'wl-detail', params: { id: item.ID } }" class="wl-primary-link">
                    <div class="d-flex align-items-center text-nowrap">
                      <div class="wl-avatar">
                        <i class="iconoir-bookmark-book"></i>
                      </div>
                      <div class="ms-3">
                        <div>{{ item.Name }}</div>
                        <small class="text-muted">Last updated {{ new Date(item.UpdatedAt).toDateString() }}</small>
                      </div>
                    </div>
                  </router-link>
                </td>
                <td>
                  <div class="d-flex align-items-center text-nowrap">
                    <div class="wl-user-badge">
                      <span class="wl-user-badge-avatar"></span><span class="wl-user-badge-name">{{ item.OwnerFullName
                        }}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="d-flex align-items-center text-nowrap">
                    <div class="badge bg-secondary">{{ item.ItemCount }} Items</div>
                  </div>
                </td>
                <td>
                  <div class="d-flex align-items-center text-nowrap">{{ getFormattedDate(item.CreatedAt) }}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import { onMounted, ref } from 'vue'
import Nav from '@/components/Nav.vue'
import HeaderBar from '@/components/HeaderBar.vue'

export default {
  components: { Nav, HeaderBar },
  setup() {
    const list = ref([])
    const list_err = ref(null)
    const loading = ref(true)
    const list_url = ref('/api/prot/wishlist/browse')

    onMounted(async () => {
      await axios.get(list_url.value)
        .then(response => {
          list.value = response.data.Data
        })
        .catch(err => {
          list_err.value = err.message
        })
        .finally(() => {
          loading.value = false
        })
    })

    function getFormattedDate(dt) {
      let date = new Date(dt);
      return (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getFullYear()
    }

    return { list, loading, getFormattedDate }
  }
}
</script>
<style>
.wl-table {
  th {
    color: #676f7e;
    font-weight: normal;
    padding: 1rem 1.5rem 1rem 0.5rem;
  }

  .wl-primary-link {
    text-decoration: none;
  }

  .wl-avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    border-radius: 50%;
    background-color: #63738a;
    height: 40px;
    min-width: 40px;
    width: 40px;

    i[class^="iconoir-"] {
      font-size: 1.5rem;
      color: #FFF;
    }
  }
}

.wl-user-badge {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 5px;
  background-color: #eee;
  padding: 1px 1px 1px 0px;
  border-radius: 12px;
  align-content: center;

  .wl-user-badge-name {
    padding-right: 5px;
  }

  .wl-user-badge-avatar {
    background-image: url(@/assets/avatar.svg);
    display: inline-block;
    width: 22px;
    background-size: cover;
    background-repeat: no-repeat;
    height: 22px;
  }

}
</style>