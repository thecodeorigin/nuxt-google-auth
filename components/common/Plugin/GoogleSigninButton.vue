<template>
  <div>
    <!-- Google's default sign in button -->
    <div
      v-show="!isSignedIn"
      id="google-signin-button"
      class="google-signin-button animated fadeIn faster"
    />
    <!-- Custom sign out button -->
    <b-button
      v-if="isSignedIn"
      variant="danger"
      class="google-signout-button p-0 text-left animated fadeIn faster"
      @click="onSignOut"
    >
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        class="google-signout-button-logo"
      >
        <g>
          <path
            fill="#EA4335"
            d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
          />
          <path
            fill="#4285F4"
            d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
          />
          <path
            fill="#FBBC05"
            d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
          />
          <path
            fill="#34A853"
            d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
          />
          <path fill="none" d="M0 0h48v48H0z" />
        </g>
      </svg>
      <span class="google-signout-button-text">
        Sign out
      </span>
    </b-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: '',
      currentUser: {
        name: '',
        email: '',
        first_name: '',
        last_name: '',
        image_url: ''
      }
    }
  },
  computed: {
    isSignedIn() {
      return this.$store.state.currentUser == null ? false : true
    }
  },
  mounted() {
    // window only usable in mounted hook
    if (!window.gapi) {
      return
    } else {
      window.gapi.signin2.render('google-signin-button', {
        onsuccess: this.onsuccess
      })
    }
  },
  methods: {
    onsuccess(user) {
      this.token = window.gapi.auth2
        .getAuthInstance()
        .currentUser.get()
        .getAuthResponse().access_token
      this.currentUser = {
        name: user.getBasicProfile().getName(),
        email: user.getBasicProfile().getEmail(),
        first_name: user.getBasicProfile().getFamilyName(),
        last_name: user.getBasicProfile().getGivenName(),
        image_url: user.getBasicProfile().getImageUrl()
      }
      this.$store.commit('SET_CURRENT_USER', this.currentUser)
      this.$store.commit('SET_ACCESS_TOKEN', this.token)
      alert(`Signed in with ${this.$store.state.currentUser.name}`)
    },
    onSignOut() {
      window.gapi.load('auth2', () => {
        window.gapi.auth2
          .init({
            client_id: process.env.CLIENT_ID
          })
          .then(() => {
            window.gapi.auth2
              .getAuthInstance()
              .signOut()
              .then(() => {
                this.$store.commit('SET_CURRENT_USER', null)
                this.$store.commit('SET_ACCESS_TOKEN', null)
                alert('User signed out.')
              })
          })
      })
    }
  }
}
</script>

<style scoped>
.google-signout-button {
  width: 120px;
  height: 36px;
  border-radius: 0;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
}
.google-signout-button-logo {
  margin: 8px;
  width: 17px;
  height: 17px;
}
.google-signout-button-text {
  font-size: 13px;
  font-size: Roboto;
  font-weight: 500;
  margin-left: 13px;
}
</style>
