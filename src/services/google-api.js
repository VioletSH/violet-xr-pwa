import Vue from 'vue'
import VueGoogleApi from 'vue-google-api'

const config = {
    apiKey: 'AIzaSyC1G_oKI6Lf5HlCk87jWDmXz1QS_faoXq8 ',
    clientId: '445333639249-8bgcaqod82do6g6dhih4v4n6hg5haub0.apps.googleusercontent.com',
    scope: 'profile email https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive'
  }
Vue.use(VueGoogleApi, config)