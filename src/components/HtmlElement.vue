<template>
    <div id="htmlElement" ref='parent'>
        <pdf v-for="i in numPages" :key='i' :src='Pdfsrc' :page='i'></pdf>
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
      Pdfsrc: undefined,
      numPages: 0                  
    }
  },
    mounted: function(){
      var loadingTask = pdf.createLoadingTask(this.src);
      this.Pdfsrc=loadingTask;
      this.Pdfsrc.then(pdf => {
        this.numPages = pdf.numPages;
        console.log(pdf)
      });
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
    #htmlElement span{
      width: 100%
    }
</style>