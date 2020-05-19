<template>
  <b-navbar toggleable="lg" type="dark" variant="success">
    <b-navbar-brand>
      <nuxt-link to="/" class="text-light" style="text-decoration: none">
        {{ $t('home.navbar') }}
      </nuxt-link>
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse" />

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <a
          href="https://github.com/thecodeorigin/nuxt-google-auth"
          class="text-light"
          target="blank"
        >
          Github
        </a>
        <a
          href="https://developers.google.com/identity/sign-in/web"
          class="text-light ml-3"
          target="blank"
        >
          Google's docs
        </a>
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
