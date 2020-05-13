<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand>
      <nuxt-link to="/" class="text-light" style="text-decoration: none">
        {{ $t('home.navbar') }}
      </nuxt-link>
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse" />

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <nuxt-link to="/introduction" class="text-light">
          Introduction
        </nuxt-link>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-button
          v-if="$i18n.locale == 'en'"
          size="sm"
          style="border-radius: 2rem"
          variant="danger"
          @click="$i18n.locale = 'vi'"
        >
          {{ $t('home.lang') }}
        </b-button>
        <b-button
          v-if="$i18n.locale == 'vi'"
          size="sm"
          style="border-radius: 2rem"
          variant="danger"
          @click="$i18n.locale = 'en'"
        >
          {{ $t('home.lang') }}
        </b-button>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>
