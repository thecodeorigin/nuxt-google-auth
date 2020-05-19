<template>
  <b-container fluid>
    <ExampleComponent />
    <GoogleSigninButton />
  </b-container>
</template>

<script>
export default {
  name: 'Home',
  components: {
    ExampleComponent: () =>
      import('~/components/specifics/Home/ExampleComponent.vue'),
    GoogleSigninButton: () =>
      import('../components/common/Plugin/GoogleSigninButton')
  },
  created() {
    // Global function and variable from mixins
    // this.sayHello("Rim")
    // console.log(this.baseUrl)
  },
  head() {
    return {
      title: 'Home page',
      description: 'A short dummy description'
    }
  }
}
</script>
