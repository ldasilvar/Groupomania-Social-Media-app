<template>
  <div class="nav">
    <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">Groupomania</b-navbar-brand>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="#">Login</b-nav-item>
        <b-nav-item href="#">Sign Up</b-nav-item>
      </b-navbar-nav>

        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>User</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      
    </b-collapse>
  </b-navbar>
    
  </div>
</template>

<script>
export default {
  name: 'headers-nav'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>
