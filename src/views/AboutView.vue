<template>
  <Nav></Nav>
  <div class="wl-content">
    <div class="card wl-card px-5 py-3">
      <h1 class="text-center">About</h1>
      <h2>What is this?</h2>
      <p>Wishr is an easy way to create and share wishlists between friends and family.</p>
      <h2>What do I do?</h2>
      <div class="wl-about-list">
        <div>
          <div class="wl-about-number theme-primary-bg">1</div>Register an account and log in (looks like you made it -
          woohoo!).
        </div>
        <div>
          <div class="wl-about-number theme-primary-bg">2</div>Create your first wishlist using the “Create Wishlist”
          button in the navigation menu.
        </div>
        <div>
          <div class="wl-about-number theme-primary-bg">3</div>When you are ready to share, click on one of your wishlists
          and share it using the “Share List” button at the top.
        </div>
        <div>
          <div class="wl-about-number theme-primary-bg">4</div>Browse wishlists that have been shared with you. Reserve
          items so that everyone but the recipient will know that you’re getting that item off the list!
        </div>
      </div>
      <h2>How much does this cost?</h2>
      <p>Wishr is completely free, forever. Enjoy!</p>
      <div class="wl-about-bg mx-auto my-3"></div>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue'

export default {
  components: { Nav }
}
</script>

<style>


.wl-about-list {
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  margin-bottom: 1rem;
}

.wl-about-list div {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
}

.wl-about-number {
  display: inline;
  color: #fff;
  padding: 5px 15px;
  border-radius: 50%;
  font-weight: bold;
  font-size: 20px;
}

.wl-about-bg {
  mask: url(@/assets/about-bg.svg);
  mask-size: contain;
  mask-repeat: no-repeat;
  display: inline-block;
  height: 17rem;
  background: #a5a5ab;
  width: 100%;
  mask-position: center;
}</style>