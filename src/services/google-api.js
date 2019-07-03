import Vue from 'vue'
import VueGoogleApi from 'vue-google-api'

const config = {
    apiKey: 'AIzaSyC1G_oKI6Lf5HlCk87jWDmXz1QS_faoXq8 ',
    clientId: '445333639249-8bgcaqod82do6g6dhih4v4n6hg5haub0.apps.googleusercontent.com',
    scope: 'profile email https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive'
  }
Vue.use(VueGoogleApi, config)

var getFileFromGoogle= (remoteUrl,gapi)=>{
    var splitedUrl = remoteUrl.split('/')
    var fileId = splitedUrl.reduce((a, b) => a.length > b.length ? a : b, '');

    if(splitedUrl.includes('drive.google.com')){
      return gapi.request({
        path: 'https://www.googleapis.com/drive/v3/files/'+fileId+'?alt=media',
        method: 'GET',
      }).then(response => {
        return response.body
      })
    }
    else if(splitedUrl.includes('docs.google.com')){
      return gapi.request({
        path: 'https://www.googleapis.com/drive/v3/files/'+fileId+'/export',
        method: 'GET',
        params: {
          mimeType: 'application/pdf'
        }
      }).then(response => {
        console.log(response.body)
        console.log('from Docs Google API v3')
        return response.body
      })
    }
}
export {getFileFromGoogle}