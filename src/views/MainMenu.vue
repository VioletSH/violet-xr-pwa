<template>
  <div class="paintball">
    <div style="position:absolute;top:0.5em;right:0.5em;display:flex;align-items:center;z-index:10">
        <h2 class="site-title">{{title}}</h2>
      <span>{{user.name}}</span>
      <img :src="user.image"/>
    </div>
    <button v-on:click='switchxR' style="position:absolute;top:0.5em;left:0.5em;z-index:10">switchxR</button>

    <!--AR-->
    <!--AR-->
    <a-scene arjs="" v-if="isAR" >
      <!--Cursor & camera-->
      <a-entity camera look-controls wasd-controls='fly:true'>
        <a-entity
        animation__click="property: scale; startEvents: click; easing: easeInCubic; dur: 150; from: 0.1 0.1 0.1; to: 1 1 1"
        animation__fusing="property: scale; startEvents: fusing; easing: easeInCubic; dur: 1500; from: 1 1 1; to: 0.1 0.1 0.1"
        animation__mouseleave="property: scale; startEvents: mouseleave; easing: easeInCubic; dur: 500; to: 1 1 1"
        cursor="fuse: true;"
        material="color: #8800FF; shader: flat"
        position="0 0 -10"
        geometry="primitive: ring; radiusInner: 0.1; radiusOuter: 0.15"
        raycaster="far: 20; interval: 1000; objects: .clickable"
        >
        </a-entity>
      </a-entity>

      <!--menu--> 
      <a-marker preset='hiro'> <!--Define the marker where the content will appear-->
        <a-entity ref="menu" position="0 0 0">
            <a-hexgrid :src="hexMap"
            v-pre
            ></a-hexgrid>
        </a-entity>
      </a-marker>
    </a-scene>



    <!--VR-->
    <!-- arjs="none" will throw and error, but is a way to disable it -->
    <a-scene arjs="none" v-else>
      <!--Cursor & camera-->
      <a-entity camera look-controls wasd-controls='fly:true'>
        <a-entity
        animation__click="property: scale; startEvents: click; easing: easeInCubic; dur: 150; from: 0.1 0.1 0.1; to: 1 1 1"
        animation__fusing="property: scale; startEvents: fusing; easing: easeInCubic; dur: 1500; from: 1 1 1; to: 0.1 0.1 0.1"
        animation__mouseleave="property: scale; startEvents: mouseleave; easing: easeInCubic; dur: 500; to: 1 1 1"
        cursor="fuse: true;"
        material="color: #8800FF; shader: flat"
        position="0 0 -3"
        geometry="primitive: ring; radiusInner: 0.1; radiusOuter: 0.15"
        raycaster="far: 20; interval: 1000; objects: .clickable"
        >
        </a-entity>
      </a-entity>

      <!--menu--> 
      <a-entity ref="menu" position="0 0 -5">
          <a-hexgrid :src="hexMap"
          v-pre
          ></a-hexgrid>
      </a-entity>

      <!--The Sky is beauty :)-->
      <a-sky color="black"></a-sky>
    </a-scene>
  </div>
</template>

<script>
import * as SERVICES from '../services/backend-api'
import {getFileFromGoogle} from '../services/google-api'

import hexMap from '../assets/json/hex-map.json'

import {createMenuLayout} from '../assets/js/createHexMenu' 

export default {
  name: 'MainMenu',
  props: {
    title: String,
    user: Object,
    isAR: Boolean,
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
    this.displayCursos(1)
  },
  methods:{
    displayCursos:function(id){
    var menu = this.$refs.menu
    let isMenuLoaded = false;
    SERVICES.getCursos(1)
    .then(response=>{
      var tempData=[]
      response.data.forEach(element => {
        tempData.push({text:element.abreviatura,id:element.id})
      });
      this.items = tempData
      createMenuLayout(menu,tempData,this.displayModules)
      }
    )
    },
    displayModules:function(id){
      var menu = this.$refs.menu
      SERVICES.getModulos(id)
      .then(response=>{
      var tempData=[]
      response.data.forEach(element => {
        tempData.push({text:element.nombre,id:element.id})
      });
      this.items = tempData
      createMenuLayout(menu,tempData,this.displayActivities)
      })
    },
    displayActivities:function(id){
      var menu = this.$refs.menu
      SERVICES.getActividades(id)
      .then(response=>{
      var tempData=[]
      response.data.forEach(element => {
        tempData.push({text:element.nombre,id:element.id})
      });
      this.items = tempData
      createMenuLayout(menu,tempData,this.displayContents)
      })
    },
    displayContents:function(id){
      var menu = this.$refs.menu
      this.subSubSubItems=[]
      SERVICES.getContenidos(id)
      .then(response=>{
      var tempData=[]
      response.data.forEach(element => {
        tempData.push({text:element.peticion.tipoContenido,id:element.peticion})//rename id for consistense
      });
      this.items = tempData
      createMenuLayout(menu,tempData,this.setResource)
      })
    },
    setResource:function(item){
      //Updates the url and creates a new object
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
          this.$emit('setResource',resource)
          this.$emit('changeView','ar')
        })
      }
    },
    switchxR:function(){
      this.$emit('switchxR','')
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
