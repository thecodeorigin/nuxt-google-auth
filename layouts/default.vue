<template>
  <b-container fluid class="p-0">
    <Navbar />
    <nuxt />
    <Footer />
  </b-container>
</template>

<script>
export default {
  components: {
    Navbar: () => import('~/components/common/Layout/Navbar.vue'),
    Footer: () => import('~/components/common/Layout/Footer.vue')
  }
}
</script>
