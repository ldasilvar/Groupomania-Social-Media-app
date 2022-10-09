<template>
    <div class="container">
        <div class="navbar">
            <div>
                <router-link to="/articles"><img src="../assets/images/icon-left-font-monochrome-black.png" alt="groupomania" class="logo"></router-link>
            </div>
            <div class="list">
                <div class="dropdown">
                   <img src="../assets/images/profile.png" alt="Profile Avatar" class="avatar">
                   <div name="login-signup" id="login-signup" class="list-login-signup">
                       <router-link style="text-decoration: none; color: inherit" to="/users/myprofile"><li class="hover-profil">Profile</li></router-link>
                   </div>
                </div>
                <div>
                   <ul>
                        
                        <li class='list-navbar'><router-link style="text-decoration: none; color: inherit" to="/"><span class="hover-login" @click="logoutUser">Sign out <i class="fa-solid fa-right-from-bracket"></i></span></router-link></li>
                    </ul> 
                </div>
                
            </div>
        </div>


        <!-- <div>
            <tr v-for="loginUser.fullname in list" v-bind:key="User.fullname.id">
            
                <h1>
                    Welcome back {{User.fullname}}
                </h1>
            </tr>

        </div> -->
    

        <div class="card-evenement">
            <router-link to="/new" style="text-decoration: none; color: inherit"><p>Make a new post</p></router-link>
            
        </div> 
        
        <div class="card">
            <table>
                <tr v-for="item in list" v-bind:key="item.id">
                    <router-link style="text-decoration: none; color: inherit" :to="'/articles/' + item.id">
                        <div class="cards">
                            <ul>
                                <div class="flex-name-user">
                                    <li><img src="../assets/images/profile.png" alt="avatar" class="avatar-article"></li>
                                    <li class="margin-right-5 font-user">{{item.User.fullname}}</li>
                                    
                                </div>
                                <div class="margin-top-16">
                                    <li class="bold-title">{{item.title}}</li>
                                    <li><img :src="item.image" alt="image" class="img-article"></li>
                                    <li class="margin-top-16">{{item.content}}</li>
                                    <li class="like font-size-22"><i class="far fa-heart like-hover"></i>{{item.likes}}</li>
                                </div>
                                <hr>
                                <div class="comment-hover">
                                    <p><i class="far fa-comment-alt margin-right-comment"></i></p>
                                    <div class="bloc-comment" v-for="com in comment" v-bind:key="com.id">
                                        <div class="comment-article form-comment" v-if="com.articleId === item.id">
                                            <div class="user-comment">
                                                <li>{{com.User.fullname}}</li>
                                                                                       
                                            </div>
                                            <div>
                                                <p class="input-comment">{{com.content}}</p>                                  
                                            </div>                                         
                                        </div> 
                                    </div>                                      
                                </div>
                               
                            </ul>
                        </div>
                   </router-link>
                    
                </tr>
            </table> 
        </div>
        
    </div> 
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios)
    export default {
        name: 'Articles',
        data()
        {
            return {
            list: undefined, 
            comment: undefined, 
            content: ""
            }
        }, 
        mounted()
        {
            Vue.axios.defaults.headers = {
                'Content-Type' : 'application/json',
                Authorization: "Bearer " + localStorage.getItem('userToken')
            }
            Vue.axios.get('http://localhost:3000/api/articles')
            .then((response) => {
                this.list = response.data
                console.log(response);
            })
            Vue.axios.get('http://localhost:3000/api/articles/' + this.$route.params.id + '/comments/')
            .then((response) => {
                this.comment = response.data
                console.log(response);
            })
        }, 
        methods: {
            logoutUser: function() {
                localStorage.removeItem('userToken');
                localStorage.removeItem('userId');
                delete axios.defaults.headers.common['Authorization'];
            }
        },
    }
</script>
<style lang="scss">

</style>
