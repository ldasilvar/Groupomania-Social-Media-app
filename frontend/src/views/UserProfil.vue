<template>
    <div class="container">
        <!-- NAVBAR -->
        <div class="navbar">
            <div>
               <router-link to="/articles"><img src="../assets/images/icon-left-font-monochrome-black.png" alt="groupomania" class="logo"></router-link>
            </div>
            <div class="list">
                <div class="dropdown">
                    <router-link style="text-decoration: none; color: inherit" to="/users/myprofile"><img src="../assets/images/profile.png" alt="Profile photo" class="avatar" title="Go to My Profile details"></router-link>
                   
                </div>
                <div>
                   <ul>
                    <li class='list-navbar'><router-link style="text-decoration: none; color: inherit" to="/"><span class="hover-login" @click="logoutUser">Sign out <i class="fa-solid fa-right-from-bracket"></i></span></router-link></li>
                    </ul> 
                </div>
                
            </div>
        </div>

        <div class="card-evenement">
            <router-link to="/articles" style="text-decoration: none; color: inherit"><p>Go Back to Articles</p></router-link>
            
        </div> 

        <!-- PROFIL -->

        <div class="card-profile">
            <div class="user-profile">
                <img src="../assets/images/profile.png" alt="myprofile" class="user-profile-img">
                <p class="img-fontawesome-profil">Upload your profile picture</p>
                <div class="info-user">
                <div v-if="user" class="card-info-user">
                    <p>{{user.fullname}}</p>
                </div>
                
                <div v-if="user" class="card-info-user">
                    <p>{{user.email}}</p>
                </div> 
                
            </div>
                <div v-if="user" class="off-and-basket">
                    <router-link style="text-decoration: none; color: inherit" :to="'/users/edit/' + user.id"><span id="hover-login"><i class="fas fa-edit margin-right-off" title="Edit your profile"></i></span></router-link>
                    <router-link style="text-decoration: none; color: inherit" to="/"><span id="hover-login" @click="deleteUser"><i class="fas fa-trash-alt margin-right-off" title="Delete your profile"></i></span></router-link>
                    
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
                delete axios.defaults.headers['Authorization'];
            },
            deleteUser: function() {
                Vue.axios.delete('http://localhost:3000/api/auth/users/' + this.$route.params.id)
                .then((data) => {
                    this.user.id
                    console.log(data);

                    if(this.user.id) {
                        
                        alert('Your account has been deleted!')
                        window.location.href=`/`;
                        localStorage.removeItem('userToken');
                        localStorage.removeItem('userId');
                        delete axios.defaults.headers.common['Authorization'];
                    }
                });
            }
        }
    }
</script>
