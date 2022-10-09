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
            <form method="put">
                <div>
                    <input v-model="article.title" class="form-title-content" type="text" id="title" name="title" placeholder="New Title" required>  
                </div>
                <div>
                    <input v-model="article.content" class="form-title-content" id="content" type="text" name="content" placeholder="New content" required>  
                </div>
                <div>
                    <input type="file" crossorigin="anonymous" ref="files" id="image" name="inputImage" @change="selectedImageFile">                    
                </div>
                <div class="button-form">
                    <input @click="updateArticle" class="button" type="button" value="Update">
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
        props: ['id'],
        data() {
            return {
                article: null,
                title: "",
                content: "",
                image:""
            }
        }, mounted()
        {
            Vue.axios.defaults.headers = {
                'Content-Type' : 'application/json',
                Authorization: "Bearer " + localStorage.getItem('userToken')
            }
            Vue.axios.get(`http://localhost:3000/api/articles/`+ this.$route.params.id)
            .then((data) => {
                this.article = data.data
                console.log(data);
            })
        }, 
        methods: {
            updateArticle: function() {
                Vue.axios.defaults.headers = {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem('userToken')
                }
                console.log(this.$route.params.id)
                // let imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
                Vue.axios.put(`http://localhost:3000/api/articles/edit/`+ this.$route.params.id, {
                    title: this.article.title,
                    content: this.article.content,
                    image: this.image,
                })
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