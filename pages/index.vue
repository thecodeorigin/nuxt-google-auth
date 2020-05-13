<template>
  <b-container fluid>
    <ExampleComponent />
  </b-container>
</template>

<script>
export default {
  name: 'Home',
  components: {
    ExampleComponent: () =>
      import('~/components/specifics/Home/ExampleComponent.vue')
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
