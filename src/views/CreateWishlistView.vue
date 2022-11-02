<template>
    <!-- This is a complete hack to get the Edit Wishlist to reload when we're editing
         and click on "Create Wishlist" from the nav menu -->
    <EditWishlistView></EditWishlistView>
</template>
<script>
import EditWishlistView from './EditWishlistView.vue';
export default {
    components: { EditWishlistView }
}
</script>
<style>
    
</style>