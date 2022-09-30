<template>
  
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand >
      <img href="#" class="icon" src="../assets/Images/Navbaricon.png" alt="Groupomania logo">
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse class="ml-auto" id="nav-collapse" is-nav>
      <b-navbar-nav>

        <router-link class="nav-link pr-3" to="/login">Log in</router-link>
        <router-link class="btn btn-outline-primary" to="/signup">Sign up</router-link>

      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="mr-auto">

        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>User</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>

</template>

<script>
export default {
  name: 'headers-nav'
}
</script>

<!-- // < Add "scoped" attribute to limit CSS to this component only  -->
  <style scoped lang="scss">
 .navbar {
  width: 100%;
 padding: 15px;
 background-color: #47443b!important;
 justify-content: space-between;
	box-shadow: 0 2px 4px rgba(0,0,0,0.3);
  border: 2px solid gray!important;
  border-top-left-radius: 25%;
  border-top-right-radius: 25% ;
 
 
 }
 .nav-collapse.navbar-collapse.collapse{
  justify-content: space-between!important;
 }
 .icon{
  display: inline-block;
  width: 18em;
  height: 4em;
  vertical-align: text-top;
  margin-right:34em;
 }

 .btn.btn-outline-primary{
      // color: #568deb!important;
      // border-color: #113f8a!important;
    --bs-btn-hover-color: #fff;
    --bs-btn-hover-bg: #0d6efd;
    --bs-btn-hover-border-color: #0d6efd;
    

 }
 
</style> -->
