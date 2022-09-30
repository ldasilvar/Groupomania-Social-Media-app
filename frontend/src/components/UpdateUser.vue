<template>
    <div class="container">
        <!-- NAVBAR -->
        <div class="navbar">
            <div>
               <router-link to="/articles"><img src="../assets/images/icon-left-font-monochrome-black.png" alt="groupomania" class="logo"></router-link>
            </div>
            <div class="list">
                <div>
                   <ul>
                        <li class='list-navbar hover-login'><router-link style="text-decoration: none; color: inherit" to="/users/signup">Signup</router-link></li>
                        <li class="list-navbar hover-login"><router-link style="text-decoration: none; color: inherit" to="/">Login</router-link></li>
                        <li class='list-navbar'><router-link style="text-decoration: none; color: inherit" to="/"><span class="hover-login" @click="logoutUser"><i class="fas fa-power-off"></i></span></router-link></li>
                    </ul> 
                </div>
                <div class="dropdown">
                   <img src="../assets/images/profile.png" alt="Profile Avatar" class="avatar">
                   <div name="login-signup" id="login-signup" class="list-login-signup">
                       <router-link style="text-decoration: none; color: inherit" to="/users/myprofile"><li class="hover-profil">profil</li></router-link>
                   </div>
                </div>
            </div>
        </div>

        <!-- PROFIL -->

        <div class="card-profile">
            <div class="user-profile">
                <img src="../assets/images/—Pngtree—vector users icon_4144740.png" alt="myprofile" class="user-profile-img">
                <p class="img-fontawesome-profil"><i class="fas fa-images"></i></p>
                <div class="off-and-basket">
                    <router-link style="text-decoration: none; color: inherit" to="/"><span id="hover-login" @click="logoutUser"><i class="fas fa-power-off"></i></span></router-link>
                </div>
            </div>
            
            <form method="put" class="info-user">
                <div>
                    <input v-model="user.fullname" type="text" class="card-info-user" id="fullname" name="fullname" placeholder="New Full Name" required> 
                </div>
                
                <div>
                    <input v-model="user.email" type="text" class="card-info-user" id="email" name="email" placeholder="New email" required> 
                </div>
                <div>
                    <input v-model="user.post" type="text" class="card-info-user" id="post" name="post" placeholder="New post" required> 
                </div>
               
                <div class="button-form">
                    <input @click="updateUser" class="button" type="button" value="Save the changes">
                </div>
            </form>
        </div>

    </div>
</template>

<script>
    import Vue from 'vue';
    import axios from 'axios';
    import VueAxios from 'vue-axios';

    Vue.use(VueAxios, axios)
        export default {
            data() {
                return {
                    user: null,
                    fullname: "",
                    email: "",
                    post: "",
                   
                }
            },
            mounted()
            {
                Vue.axios.defaults.headers = {
                    'Content-Type' : 'application/json',
                    Authorization: "Bearer " + localStorage.getItem('userToken')
                }
                Vue.axios.get(`http://localhost:3000/api/auth/users/myprofile`)
                .then((data) => {
                    this.user = data.data
                    console.log(data);
                })
            }, methods: 
            {
            updateUser: function() {
                Vue.axios.defaults.headers = {
                    'Content-Type' : 'application/json',
                    Authorization: "Bearer " + localStorage.getItem('userToken')
                }

                Vue.axios.put(`http://localhost:3000/api/auth/users/edit/`+ this.$route.params.id, {
                    fullname: this.user.fullname,
                    email: this.user.email,
                    post: this.user.post,
                    
                })
                .then((data) => {
                    console.log(data)
                    console.log(this.user.fullname, this.user.fullname)

                    if(data) {
                        alert('Your profile has been updated');
                        window.location.href=`/users/myprofile`;
                    }
                })
            },
            logoutUser: function() {
                    localStorage.removeItem('userToken');
                    localStorage.removeItem('userId');
                    delete axios.defaults.headers.common['Authorization'];
                }
            }
        }
</script>