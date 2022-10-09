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

        <div class="card-display-article"> 
            <form action="http://localhost:3000/api/articles/new" method="post">
                
                <div>
                    <input v-model="title" class="form-title-content" type="text" id="titre" name="titre" placeholder="Title" required>  
                </div>
                <div>
                    <input v-model="content" lass="form-title-content" id="content" type="text" name="contenu" placeholder="Write your post here" required>  
                </div>
                <div class="inputImageButton">
                    <input type="file" crossorigin="anonymous" ref="files" id="image" name="inputImage" @change="selectedImageFile">                    
                </div>
                <div class="button-form">
                    <input @click="createArticle" class="button" type="button" value="Post">
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
        name: 'NewArticle',
        data: function() {
            return {
                title: "",
                content: "",
                image: ""
            }
        },
        methods: {
            createArticle: function() {
                const formData = new FormData();
                formData.append("image", this.image);
                formData.append("title", this.title);
                formData.append("content", this.content);
                console.log(formData.get("content"));
                console.log(formData.get("image"));
                console.log(formData.get("title"));

                Vue.axios.defaults.headers = {
                    'Content-Type' : 'application/json',
                    Authorization: "Bearer " + localStorage.getItem('userToken')
                }

                Vue.axios.post('http://localhost:3000/api/articles/new', formData)
                .then((response) => {
    

                    if(response) {
                        window.location.href=`/articles`;
                    }
                })
            },
            logoutUser: function() {
                localStorage.removeItem('userToken');
                localStorage.removeItem('userId');
                delete axios.defaults.headers.common['Authorization'];
            },
            selectedImageFile: function(e) {
                this.image = e.target.files[0];
                console.log(this.image);
            }
        }
    }

</script>