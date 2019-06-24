<template>
  <div class="paintball">
    <div style="position:absolute;top:0.5em;right:0.5em;display:flex;align-items:center">
      <span>{{user.name}}</span>
      <img :src="user.image"/>
    </div>

    <h2 class="site-title">{{title}}</h2>

    <h2>Select items</h2>

    <div class="container">
      <div>
        <div v-for="item in items" v-bind:key='"M"+item.id'>
          <button v-on:click="displayModules(item.id)">{{item.abreviatura}}</button>
        </div>
      </div>

      <div>
        <div v-for="item in subItems" v-bind:key='"A"+item.id'>
          <button v-on:click="displayActivities(item.id)" style="background-color:red">{{item.nombre}}</button>
        </div>
      </div>

      <div>
        <div v-for="item in subSubItems" v-bind:key='"C"+item.id'>
          <button v-on:click="displayContents(item.id)" style="background-color:green">{{item.nombre}}</button>
        </div>
      </div>

      <div>
        <div v-for="item in subSubSubItems" v-bind:key='"R"+item.id'>
          <button  v-on:click="setResource(item.peticion)" style="background-color:black">{{item.peticion.tipoContenido}}</button>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import * as SERVICES from '../services/backend-api'
import {getFileFromGoogle} from '../services/google-api'
export default {
  name: 'MainMenu',
  props: {
    title: String,
    user: Object
  },
  data: function () {
    return {
      items: [],
      subItems:[],
      subSubItems:[],
      subSubSubItems:[],
    }
  },
  mounted:function(){
    SERVICES.getCursos(1)
    .then(response=>this.items=response.data)
  },
  methods:{
    displayModules:function(id){
      SERVICES.getModulos(id)
      .then(response=>this.subItems=response.data)
    },
    displayActivities:function(id){
      this.subSubItems=[]
      SERVICES.getActividades(id)
      .then(response=>this.subSubItems=response.data)
    },
    displayContents:function(id){
      this.subSubSubItems=[]
      SERVICES.getContenidos(id)
      .then(response=>this.subSubSubItems=response.data)
    },
    setResource(item){
      //Updates the url and creates a new object
      //if(item.tipoContenido==='model/gltf+json'||item.tipoContenido==='model/gltf+binary')
      if (item.tipoContenido=== 'model/gltf-binary' || item.tipoContenido==='model/gltf+json')
      {
        var resource={
          type:item.tipoContenido,
          url:item.url
        }
        this.$emit('setResource',resource)
        this.$emit('changeView','ar')
      }
      else{
        getFileFromGoogle(item.url,this.$gapi)
        .then(url=>{
          var resource={
            type:item.tipoContenido,
            url:url
          }
          console.log(url)
          this.$emit('setResource',resource)
          this.$emit('changeView','ar')
        })
      }
    }
  }
}
</script>

<style scoped>
  .container{
    display: flex;
  }
  .container div{
    display: inherit;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    margin: 0.5em;
  }
  .site-title {
    text-transform: uppercase;
  }
  .paintball {
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
  }
  button {
    font-size: 20px;
    display: block;
    border: none;
    color: #fff;
    background-color: hsla(248, 100%, 76%, 1);
    border-radius: 6px;
    margin: 0 auto .5em;
    padding: .5em 1em;
    box-shadow: 4px 4px 0px #000;
    transition: .25s;
  }
  button:hover {
    box-shadow: 2px 2px 0px #000;
    cursor: pointer;
  }
</style>
