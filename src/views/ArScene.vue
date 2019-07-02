<template>
  <div>
    <button v-on:click="goToMenu()" style="position:fixed; top:2rem; left:2rem; z-index: 10000;"> back</button>
    <div class="perms" v-if="askPerms">
      <h2 class="site-title">{{title}}</h2>
      <p>Allow Camera Access?</p>
      <input type='checkbox' id="allow_camera" @change="allowCameraPerm()">
      <label for='allow_camera'></label>
    </div>
    <div class="ar-scene" v-if="allowAR">
      <a-scene embedded arjs='trackingMethod: best; debugUIEnabled: false' vr-mode-ui="enabled: false">
          <a-marker preset='hiro'> <!--Define the marker where the content will appear-->

          <!--Define as PDF src, Google Docs components will export to pdf format and use this  this too
            Look for HtmlElement to Render the PDF (Needs To Rename)-->
           <a-entity 
                      geometry="primitive: plane" 
                      material="shader: html; target: #htmlElement; fps: 10;"
                      rotation="-90 0 0"
                      scale = "3 2 1"
                      v-if="resourceType === 'application/pdf'"
                      >
            </a-entity> 

            <!--Load GLTF Objects, accepts JSON GLTF and Binary GLB-->
            <a-entity :gltf-model='this.src' animation-mixer v-else-if="resourceType === 'model/gltf-binary'||resourceType==='model/gltf+json'"></a-entity>
            <a-image :src='this.src' v-else-if="resourceType.includes('image')"></a-image>
          </a-marker>
        <a-entity camera></a-entity>
      </a-scene>
      <HtmlElement :src="this.pdfUrl" v-if="resourceType === 'application/pdf'"/>
    </div>
    <hr v-if="askPerms">
    <button type="button" v-if="askPerms" @click="changeLayout(true)">Load AR</button>
  </div>
</template>

<script>

import HtmlElement from '../components/HtmlElement'
import Vue from 'vue'
  Vue.config.ignoredElements = [
    'a-scene',
    'a-entity',
    'a-camera',
    'a-marker',
    'a-assets',
    'a-asset-item'
  ]
export default {
  name: 'ArScene',
  props: {
    title: String,
    resourceUrl: String|ArrayBuffer,
    resourceType: String
  },
  components:{
    HtmlElement
  },
  data: function () {
    return {
      askPerms: false,//true
      allowAR: true,//false
      allowCamera: false,

      psdfSrc: Object,
      src:String
    }
  },
  mounted:function(){
    switch(this.resourceType){
      case('application/pdf'):
        this.pdfUrl={data:this.resourceUrl}
        break;
      default:
      this.src=this.resourceUrl
    }
  },
  destroyed:function(){
    //Remove Video element disaling webcam
    var arCamera=document.querySelector('video');
    if(arCamera)
      arCamera.parentNode.removeChild(arCamera)
    //Remove ARjs events onRize view custom.js in public/js
    window.removeEventListeners('resize')
    document.body.removeAttribute("style")
  },
  methods: {
    goToMenu: function(){
      this.$emit('changeView','home')
    },
    changeLayout: function (layout) {
      this.askPerms = false;
      this.allowAR = layout
    },
    allowCameraPerm: function () {
      let self = this;
      // eslint-disable-next-line
      console.log({
        allowCamera: this.allowCamera,
        self: self
      })
      if (this.allowCamera) {
        this.allowCamera = false;
        return false;
      }
      let getCamera = navigator.mediaDevices.getUserMedia || navigator.getUserMedia || 0;
      if (!getCamera) {
        alert('Sorry, your browser does not support getUserMedia');
        return false;
      }
      // Request the camera.
      // eslint-disable-next-line
      navigator.getUserMedia(
        // Constraints
        {
          video: true
        },
        // Success Callback
        function(localMediaStream) {
          self.allowCamera = true;
          // eslint-disable-next-line
          console.log({
            localMediaStream: localMediaStream,
            selfAllowCamera: self.allowCamera
          });
        },
        // Error Callback
        function(err) {
          self.allowCamera = false;
          // Log the error to the console.
          // eslint-disable-next-line
          console.warn('The following error occurred when trying to use getUserMedia: ' + err);
        }
      );
    },
    hitRecieved: function () {
      console.log({
        hitRecieved: true
      });
      window.navigator.vibrate([200, 100, 200]);
    }
  }
}
</script>

<style lang="scss" scoped>
  .perms {
    margin-bottom: 3em;
  }
  hr {
    margin-bottom: 2em;
  }
  #allow_camera {
    display: none;
    &:checked + label {
      background: #2EC4B6;
      &:after {
        transform: translate(100%, 0);
      }
    }
  }
  label[for='allow_camera'] {
    display: block;
    width: 100px;
    height: 50px;
    border-radius: 50px;
    position: relative;
    transition: 0.15s ease-in-out;
    background: rgb(255, 70, 92);
    margin: 0 auto;
    &:after {
      content: '';
      display: block;
      widtH: 50px;
      heighT: 50px;
      border-radius: 50px;
      box-shadow: 0px 1px 10px rgba(black, 0.35);
      background: white;
      transition: 0.15s ease-in-out;
    }
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
  }
  .ar-scene {
    position: relative;
    height: 100vh;
  }
  .target {
    position: absolute;
    top: 50vh;
    left: 50vw;
    width: 100px;
    height: 100px;
    background-color: rgb(45, 206, 255);
    border-radius: 50%;
    transform: translate3d(-50%, -50%, 0);
    cursor: crosshair;
    &:active:after {
      transform: scale(.75);
    }
    &:after {
      position: absolute;
      top: 0;
      left: 0;
      content: '';
      width: 100%;
      height: 100%;
      background-color: #2effea;
      border-radius: 50%;
      transform: scale(.5);
      transition: transform .25s;
    }
  }
</style>
