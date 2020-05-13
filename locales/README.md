# The i18n plugin for multi-language websites

## Setup i18n for your project (normal use)
Declare language packs that you would use in your project in 
``` bash 
~/store/index.js 
```
like so:
``` javascript
export const state = () => ({
  locales: ['en', 'vi'],
  locale: 'vi'
})
```
you need to create some language JSON files so you can get all the translate text and stuff, create
``` bash 
~/locales/en.json
# and
~/locales/vi.json
# and what ever language you want of course, remember, those JSON files must have match properties
# if you have a "tilte" in English, make you have a "title" in Vietnamese, as well as other languages 
```
and then use it as a plugin at:
``` bash 
~/plugins/i18n.js 
```

``` javascript
import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export default ({ app, store }) => {
  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch
  app.i18n = new VueI18n({
    locale: store.state.locale,
    fallbackLocale: 'en',
    messages: {
      en: require('~/locales/en.json'),
      vi: require('~/locales/vi.json')
    }
  })

  app.i18n.path = (link) => {
    if (app.i18n.locale === app.i18n.fallbackLocale) {
      return `/${link}`
    }

    return `/${app.i18n.locale}/${link}`
  }
}
```

also, you need to add the plugin in
``` bash 
nuxt.config.js 
```
like so:

``` javascript
plugins: [
'~/plugins/i18n.js'
],
```

Then you are ready to go!
Give it a go, i set my default to Vietnamese (vi), so 

``` vue
<template>
  <div class="container">
    <p class="text-secondary my-1">{{$t('home.introduction')}}</p>
    <button class="btn btn-success" @click="$i18n.locale = 'en'">Click to change to English</button>
  </div>
</template>
```

if you want to change your language via url, like something.com/en or something.com/vi
you must add a mutation in
``` bash 
~/store/index.js 
```
like so:
``` javascript
export const state = () => ({
  locales: ['en', 'vi'],
  locale: 'vi'
})

export const mutations = {
  SET_LANG (state, locale) {
    if (state.locales.includes(locale)) {
      state.locale = locale
    }
  }
}
```

a middleware:
``` bash 
~/middleware/i18n.js 
```

``` javascript
export default function ({ isHMR, app, store, route, params, error, redirect }) {
    const defaultLocale = app.i18n.fallbackLocale
    // If middleware is called from hot module replacement, ignore it
    if (isHMR) { return }
    // Get locale from params
    const locale = params.lang || defaultLocale
    if (!store.state.locales.includes(locale)) {
      return error({ message: 'This page could not be found.', statusCode: 404 })
    }
    // Set locale
    store.commit('SET_LANG', locale)
    app.i18n.locale = store.state.locale
    // If route is /<defaultLocale>/... -> redirect to /...
    if (locale === defaultLocale && route.fullPath.indexOf('/' + defaultLocale) === 0) {
      const toReplace = '^/' + defaultLocale + (route.fullPath.indexOf('/' + defaultLocale + '/') === 0 ? '/' : '')
      const re = new RegExp(toReplace)
      return redirect(
        route.fullPath.replace(re, '/')
      )
    }
}
```
add some more code to:
``` bash 
~/plugins/i18n.js 
```

``` javascript
import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export default ({ app, store }) => {
  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch
  app.i18n = new VueI18n({
    locale: store.state.locale,
    fallbackLocale: 'en',
    messages: {
      en: require('~/locales/en.json'),
      vi: require('~/locales/vi.json')
    }
  })

  app.i18n.path = (link) => {
    if (app.i18n.locale === app.i18n.fallbackLocale) {
      return `/${link}`
    }

    return `/${app.i18n.locale}/${link}`
  }
}
```

and
``` bash 
nuxt.config.js 
```
``` javascript
plugins: [
'~/plugins/i18n.js'
],
// ...
router: {
middleware: 'i18n'
},
generate: {
routes: [
    '/', '/something', '/en', '/en/something']
}
```

Have fun!
# More at Nuxt with i18n
https://nuxtjs.org/examples/i18n