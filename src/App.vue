<template>
  <div id="app">
    <!--<div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>-->
    <Login @changeView='changeView' @setUser='setUser' v-if="layout === 'login'"/>
    <MainMenu title="Violet xR" :user='user' @setResource='setResource' @changeView='changeView' v-else-if="layout === 'home'"/>
    <ArScene title="Paintball AR" :resourceUrl='resource.url' :resourceType='resource.type'  @changeView='changeView' v-else-if="layout === 'ar'"/>
  </div>
</template>


<script>
import './services/google-api' //initialize Google API Services 

//Components
import MainMenu from './views/MainMenu.vue'
import ArScene from './views/ArScene.vue'
import Login from './views/Login.vue'

export default {
  name: 'app',
  components: {
    MainMenu,
    ArScene,
    Login
  },
  data: function () {
    return {
      layout: 'login',
      resource: null,
      user: null,
    }
  },
  methods: {
    changeView: function (layout) {
      this.layout = layout;
    },
    setResource: function (resource){
      this.resource = resource;
    },
    setUser: function (user){
      this.user = user;
    }
  }
}
</script>


<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
