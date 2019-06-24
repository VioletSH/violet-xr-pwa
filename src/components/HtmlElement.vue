<template>
    <div id="htmlElement" ref='parent'>
        <pdf :src='src' :page='5'></pdf>
    </div>
</template>


<script>
import pdf from 'vue-pdf'

export default {
components: {
    pdf
},
  name: 'HtmlElement',
  props: {
    title: String,
    src: String,
  },
  data: function () {
    return {
    }
  },
    mounted: function(){
    }
  
}
</script>


<style lang="scss" scoped>
    #htmlElement{
        width:100vw;
        height: 100vh;
        position: absolute;
        top:0;
        left:0;
        overflow: hidden;
        background-color:white; 
        z-index: -1000;
    }
    #htmlElement *{
      width: 80%;
    }
.anim {
  width: 100px;
  height: 100px;
  background-color: red;
  position: relative;
  -webkit-animation-name: example; /* Safari 4.0 - 8.0 */
  -webkit-animation-duration: 4s; /* Safari 4.0 - 8.0 */
  -webkit-animation-iteration-count: infinite; /* Safari 4.0 - 8.0 */
  animation-name: example;
  animation-duration: 4s;
  animation-iteration-count: infinite;
}

/* Safari 4.0 - 8.0 */
@-webkit-keyframes example {
  0%   {background-color:red; left:0px; top:0px;}
  25%  {background-color:yellow; left:80%; top:0px;}
  50%  {background-color:blue; left:80%; top:80%;}
  75%  {background-color:green; left:0px; top:80%;}
  100% {background-color:red; left:0px; top:0px;}
}

/* Standard syntax */
@keyframes example {
  0%   {background-color:red; left:0px; top:0px;}
  25%  {background-color:yellow; left:80%; top:0px;}
  50%  {background-color:blue; left:80%; top:80%;}
  75%  {background-color:green; left:0px; top:80%;}
  100% {background-color:red; left:0px; top:0px;}
}
</style>