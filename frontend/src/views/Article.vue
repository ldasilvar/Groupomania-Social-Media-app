<template>
    <div class="container">
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
        
        <div class="card">
            <div v-if="article" class="cards">
                <div v-if="article" class="flex-name-user">
                        <li><img src="../assets/images/profile.png" alt="Profile Avatar" class="avatar-article"></li>
                        <li class="margin-right-5 font-user">{{article.User.fullname}}</li>
                        
    
                </div>
                <div class="margin-top-16">
                    <li class="bold-title">{{article.title}}</li>
                    <li><img :src="article.image" alt="image" class="img-article"></li>
                    <li class="margin-top-16">{{article.content}}</li>
                    <i  @click="deleteArticle"  class="fas fa-trash-alt delete-article-icon" title="Delete your post"></i>
                    <router-link style="text-decoration: none; color: inherit" :to="'/articles/edit/'+ article.id"><i class="fas fa-edit edit-article-icon"></i></router-link>
                    <li class="like font-size-22"><i class="far fa-comment-alt margin-right-comment"> </i><i class="far fa-heart"></i>0</li>
                </div>
            </div>
            
            <!-- <hr width> -->
            
            <div v-for="com in comment" v-bind:key="com.id">
                <div class="comment-article form-comment" v-if="com.articleId === article.id">
                    <div class="user-comment">
                        <li>{{com.User.fullname}}</li>
                                                              
                    </div>
                    <div>
                        <p class="input-comment">{{com.content}}</p>                                  
                    </div>
                    <div>
                      
                      <span id="hover-login" @click="deleteComment(com.id)"><i class="fas fa-trash-alt margin-right-off"></i></span>
                    </div>
                </div>                      
            </div>  
            <div class="comment-article form-comment">
                <div>
                    <input v-model="content" placeholder="Write your comment" class="input-comment" type="text">
                    <i @click="addComment" class="fas fa-plus comment-plus"> Post a comment </i>                                     
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
        props: ['id'],
        data() {
            return {
                article: null,
                comment: [],
                content: "",
                User: ""
            }
        },
        mounted()
        {
            Vue.axios.defaults.headers = {
                'Content-Type' : 'application/json',
                Authorization: "Bearer " + localStorage.getItem('userToken')
            }
            Vue.axios.get(`http://localhost:3000/api/articles/`+ this.$route.params.id)
            .then((data) => {
                this.article = data.data
                
            })
            Vue.axios.get('http://localhost:3000/api/articles/' + this.$route.params.id + '/comments/')
            .then((data) => {
                this.comment = data.data
                
            })
        }, methods: {
            deleteComment: function(commentId) {
                Vue.axios.delete('http://localhost:3000/api/comments/' + commentId)
                .then((data) => {
                    this.comment = data.data;
                    
                    
                    if(data) {
                        alert('Your comment has been deleted');
                        window.location.href=`/articles/${this.$route.params.id}`
                    }
                    
                })
                .catch(error => {
                    switch(error.response.status) {
                        case 500:
                            alert("Only the user who posted this can delete this post");
                            break;
                        }
                })
            },
            updateComment: function(commentId, commentContent) {
                Vue.axios.defaults.headers = {
                    'Content-Type' : 'application/json',
                    Authorization: "Bearer " + localStorage.getItem('userToken')
                }
                Vue.axios.put('https://localhost:3000/api/articles/' + this.$route.params.id + '/comments/' + commentId, {
                    content: commentContent
                })
                .then((data) => {
                    console.log(data)
                    console.log(this.content)
                })
            },
            deleteArticle: function() {
                
                Vue.axios.delete('http://localhost:3000/api/articles/' + this.$route.params.id)
                .then((data) => {
                    this.article.id
                    console.log('data');
                    console.log(data);

                    if(this.article.id) {
                        window.location.href=`/articles`;
                        alert('Your post has been deleted');
                    }
                   
                })
                .catch(error => {
                    switch(error.response.status) {
                        case 500:
                            alert("Only the user who posted this can delete this post");
                            break;
                        }
                })
            },
            addComment: function() {
                Vue.axios.post('http://localhost:3000/api/articles/' + this.$route.params.id + '/comments/', {
                    content: this.content
                })
                .then((response) => {
                    console.log(response);
                    console.log(this.content);
                    if(response) {
                        window.location.href=`/articles`;
                    }
                })
            },
            logoutUser: function() { 
                localStorage.removeItem('userToken');
                localStorage.removeItem('userId');
                delete axios.defaults.headers['Authorization'];
            }
        }
    }
</script>