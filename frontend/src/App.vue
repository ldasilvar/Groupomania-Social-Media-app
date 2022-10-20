<template>
  <div id="app">
  
      <router-view></router-view>

  <footer class="footer">
    <div class="social-icons">
                <ul>
                    <li><a href="www.gmail.com"><i class="fa fa-google"></i></a></li>
                    <li><a href="facebook.com"><i class="fa fa-facebook"></i></a></li>
                    <li><a href="twitter.com"><i class="fa fa-twitter"></i></a></li>
                </ul>

<p>  © Groupomania 2022 </p> 
    </div>
</footer>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
@import './assets/scss/style.css';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  margin-top: 60px;
  input:focus::placeholder {
  color: transparent;
}
}
.footer{

width: 100%;
border-top: 2px solid #E0E0E0;
bottom: 0px; 
left: 0px; 
text-align: center; 
 position:relative;
 
 
}

 .footer p{
  font-size: 2rem;
    font-weight: 500;
    line-height: 1.2;
 }
 .footer ul li{

  display: inline-block;
  padding:1em 3em;
 }
</style>
