<template>
    <div id="htmlElement" ref='parent' v-on:click='nextPage'>
        <pdf :src="src" :page="currentPage" @num-pages="numPages=$event"></pdf>        
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
    src: Object,
  },
  data: function () {
    return {
      currentPage:1,
      numPages: 0                  
    }
  },
  mounted: function(){
    // var loadingTask = pdf.createLoadingTask(this.src);
    // this.Pdfsrc=loadingTask;
    // this.Pdfsrc.then(pdf => {
    //   this.numPages = pdf.numPages;
    //   console.log(pdf)
    // });
  },
  methods:{
    nextPage:function(){
      if(this.currentPage<this.numPages)
        this.currentPage++;
    },
    previousPage:function(){
      if(this.currentPage>1)
        this.currentPage--;
    }
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