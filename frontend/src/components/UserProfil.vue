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
                        <li class='list-navbar hover-login'><router-link style="text-decoration: none; color: inherit" to="/users/signup">Sign Up</router-link></li>
                        <li class="list-navbar hover-login"><router-link style="text-decoration: none; color: inherit" to="/">Login</router-link></li>
                        <li class='list-navbar'><router-link style="text-decoration: none; color: inherit" to="/"><span class="hover-login" @click="logoutUser"><i class="fas fa-power-off"></i></span></router-link></li>
                    </ul> 
                </div>
                <div class="dropdown">
                   <img src="../assets/images/profile.png" alt="Profile Avatar" class="avatar">
                   <div name="login-signup" id="login-signup" class="list-login-signup">
                       <router-link style="text-decoration: none; color: inherit" to="/users/myprofile"><li class="hover-profil">Profile</li></router-link>
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
                    <router-link style="text-decoration: none; color: inherit" :to="'/users/edit/' + user.id"><span id="hover-login"><i class="fas fa-edit margin-right-off"></i></span></router-link>
                    <router-link style="text-decoration: none; color: inherit" to="/"><span id="hover-login" @click="deleteUser"><i class="fas fa-trash-alt margin-right-off"></i></span></router-link>
                    <router-link style="text-decoration: none; color: inherit" to="/"><span id="hover-login" @click="logoutUser"><i class="fas fa-power-off"></i></span></router-link>
                </div>
            </div>
            
            <div class="info-user">
                <div class="card-info-user">
                    <p>{{user.fullname}}</p>
                </div>
                
                <div class="card-info-user">
                    <p>{{user.email}}</p>
                </div>
                <div class="card-info-user">
                    <p>{{user.post}}</p>
                </div>
                
            </div>
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
                user: null
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
        }, methods: {
            logoutUser: function() {
                localStorage.removeItem('userToken');
                localStorage.removeItem('userId');
                delete axios.defaults.headers.common['Authorization'];
            },
            deleteUser: function() {
                Vue.axios.delete('http://localhost:3000/api/auth/users/' + this.$route.params.id)
                .then((data) => {
                    this.user.id
                    console.log(data);

                    if(this.user.id) {
                        window.location.href=`/articles`;
                        localStorage.removeItem('userToken');
                        localStorage.removeItem('userId');
                        delete axios.defaults.headers.common['Authorization'];
                    }
                });
            }
        }
    }
</script>
