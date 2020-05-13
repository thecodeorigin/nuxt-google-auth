<template>
  <b-container
    fluid
    class="p-0 text-center bg-dark text-light"
    style="position: fixed; bottom: 0"
  >
    <p class="my-1">
      {{ $t('home.footer') }}
    </p>
  </b-container>
</template>

<script>
export default {
  name: 'Footer'
}
</script>
