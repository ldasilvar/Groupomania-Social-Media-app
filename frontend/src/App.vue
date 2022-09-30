<template>

  
  <div id="app">

   <headers/>
    
   <section class="Homepage-info">
    <h1> Welcome to Groupomania's social network, <br> a place where we can all get to know each other a little better</h1>

   </section>

   <router-view></router-view>
<footer class="footer">

  <footers/>

</footer>

  </div>
  
</template>

<script>
import headers from "./components/headers.vue";
import footers from "./components/footers.vue";
export default {
  name:"app",
  components: {
    headers,
    footers,

  }



}




</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  

  background:linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), ("./assets/Images/icon-left-font-monochrome-black.png") no-repeat center center fixed; ;

 
}
.footer{
  width: 100%;
height: 28px;
border-top: 2px solid #E0E0E0;
position: absolute;
bottom: 0px; 
left: 0px; 
text-align: center; 
}
 .footer p{
  font-size: 2rem;
    font-weight: 500;
    line-height: 1.2;
 }
  



</style>
