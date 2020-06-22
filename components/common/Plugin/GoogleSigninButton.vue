<template>
  <div>
    <!-- Custom sign in button -->
    <div v-show="!isSignedIn" id="gSignInWrapper">
      <div id="google-signin-button">
        <!--  -->
        <b-button
          :size="options.size"
          :variant="options.variant.signedIn"
          :disabled="isSignedIn && doneLoading"
          class="customGPlusSignIn google-button google-signin-button animated fadeIn faster"
        >
          <span v-if="!doneLoading" class="google-signin-button-spinner mr-1">
            <b-spinner
              :variant="options.variant.loading"
              style="width: 1rem; height: 1rem"
            />
          </span>
          <slot name="signin-inner">
            <span class="google-signin-button-text">
              Sign in
            </span>
          </slot>
        </b-button>
      </div>
    </div>
    <!-- Custom sign out button -->
    <div v-show="isSignedIn" id="gSignOutWrapper" @click="onSignOut">
      <!--  -->
      <!--  -->
      <b-button
        :size="options.size"
        :variant="options.variant.signedOut"
        :disabled="!isSignedIn && doneLoading"
        class="google-button google-signout-button animated fadeIn faster"
      >
        <span v-if="!doneLoading" class="google-signin-button-spinner mr-1">
          <b-spinner
            :variant="options.variant.loading"
            style="width: 1rem; height: 1rem"
          />
        </span>
        <slot name="signout-inner">
          <span class="google-signout-button-text">
            Sign out
          </span>
        </slot>
      </b-button>
    </div>
  </div>
</template>

<script>
// https://developers.google.com/identity/sign-in/web/sign-in
export default {
  props: {
    options: {
      type: Object,
      default: function() {
        return {
          size: 'sm',
          variant: {
            loading: 'light',
            signedIn: 'success',
            signedOut: 'danger'
          }
        }
      }
    }
  },
  data() {
    return {
      doneLoading: false,
      isSignedIn: false,
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
  mounted() {
    // window only usable in mounted hook
    if (!window.gapi) {
      return
    } else {
      // Sign in the user if they are currently signed in.
      window.gapi.load('auth2', () => {
        window.gapi.auth2
          .init({
            client_id: process.env.CLIENT_ID
          })
          .then(() => {
            this.doneLoading = true
            // Check if signed in and did have id_token stored
            if (
              window.gapi.auth2.getAuthInstance().isSignedIn.get() &&
              localStorage.getItem('currentUser') != null &&
              localStorage.getItem('token') != null
            ) {
              this.isSignedIn = true
            } else {
              this.isSignedIn = false
              this.initAuthButton()
            }
          })
      })
      //
    }
  },
  methods: {
    initAuthButton() {
      //
      if (process.client) {
        //
        window.gapi.load('auth2', () => {
          var element = document.getElementById('google-signin-button')
          window.gapi.auth2
            .init({
              client_id: process.env.CLIENT_ID
            })
            .then((auth2) => {
              auth2.attachClickHandler(
                element,
                {},
                () => {
                  this.onsuccess(
                    window.gapi.auth2.getAuthInstance().currentUser.get()
                  )
                },
                (error) => {
                  console.log(JSON.stringify(error, undefined, 2))
                }
              )
            })
        })
      }
    },
    onsuccess(user) {
      // Get token
      this.token = window.gapi.auth2
        .getAuthInstance()
        .currentUser.get()
        .getAuthResponse().id_token
      // Get current user
      this.currentUser = {
        name: user.getBasicProfile().getName(),
        email: user.getBasicProfile().getEmail(),
        first_name: user.getBasicProfile().getFamilyName(),
        last_name: user.getBasicProfile().getGivenName(),
        image_url: user.getBasicProfile().getImageUrl()
      }
      // Store token and current user
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
      localStorage.setItem('token', this.token)
      this.isSignedIn = true
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
                // Remove token and current user
                localStorage.removeItem('currentUser')
                localStorage.removeItem('token')
                this.isSignedIn = false
                // Re-init signin button
                this.initAuthButton()
                alert('User signed out.')
              })
          })
      })
    }
  }
}
</script>
