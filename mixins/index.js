import Vue from 'vue'
Vue.mixin({
  data() {
    return {
      baseUrl: 'http://localhost:3000',
      apiUrl: 'http://localhost:8000'
    }
  },
  methods: {
    sayHello(name) {
      // eslint-disable-next-line
      console.log(`Hello ${name}, I'm printed from Vue-Mixin`)
    }
    // Add more global helpers here
  }
})
