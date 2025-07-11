import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import GoogleSignInPlugin from 'vue3-google-login'

const app = createApp(App)

app.use(GoogleSignInPlugin, {
  clientId: '821221913413-jaqh66hd71mkarltpsr9i6ljns9p9mau.apps.googleusercontent.com'
})
.use(router)

app.mount('#app')