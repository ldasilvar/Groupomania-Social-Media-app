<template>
    <div class="container">
        <div class="navbar">
            <div>
               <router-link to="/"><img src="../assets/images/icon-left-font-monochrome-black.png" alt="groupomania" class="logo"></router-link>
            </div>
            <div class="list">
                <div>
                   <ul>
                        <li class='list-navbar hover-login'><router-link style="text-decoration: none; color: inherit" to="/users/signup">Sign Up</router-link></li>
                        <li class="list-navbar hover-login"><router-link style="text-decoration: none; color: inherit" to="/">Login</router-link></li>
                        <li class='list-navbar'><router-link style="text-decoration: none; display: none; color: inherit" to="/"><span class="hover-login" @click="logoutUser"><i class="fas fa-power-off"></i></span></router-link></li>
                    </ul> 
                </div>
               
            </div>
        </div>

        <div class="card-login">
            <form action="http://localhost:3000/api/auth/users/signup" method="post" @click="checkForm" novalidate="true">
                <img src="../assets/images/icon-left-font-monochrome-black.png" alt="logo">
                
                <div v-if="errors.length">
                    <p class="valid-form-signup">Please input the correct information:</p>
                    <ul>
                        <li v-for="error in errors" v-bind:key="error.id">{{error}}</li>
                    </ul>
                </div>
               
                <div>
                    <input v-model="fullname" class="form-email-password" type="text" id="nom" name="nom" placeholder="Full Name*" required>  
                </div>
                <div>
                    <input v-model="email" class="form-email-password" type="text" id="email" name="email" placeholder="Email *" required>  
                </div>
                <div>
                    <input v-model="password" class="form-email-password" type="password" id="password" name="password" placeholder="Password*" required> 
                </div>
            
                <div class="button-form">
                    <input @click="registerUser" class="button" type="button" value="Sign Up">
                    <p class="button-form-text">
                Already registered 
                <router-link style="text-decoration: none; color: black" to="/">sign in?</router-link></p>
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
        name: 'SignupUser',
        data: function() {
            return {
                errors: [],
                fullname: "",
                email: "",
                password: "",
                post: "",
                
            } 
        },
        methods: {
            registerUser: function() {
                Vue.axios.post('http://localhost:3000/api/auth/users/signup', {
                   fullname: this.fullname,  
                   email: this.email, 
                   password: this.password, 
                   post: this.post, 
                   
                })
                .then((response) => {
                    console.log(response);
                    

                    if(response) {
                        alert('Your account has been created!')
                        window.location.href=`/`;
                    }
                })
                .catch(error => {
                    switch(error.response.status) {
                        case 400:
                            console.log("The request could not be completed");
                            break;
                        case 409:
                            alert("User already exists");
                            console.log("User already exists");
                            break;
                        default:
                            console.log("An issue has occured");
                            break;
                    }
                })
            },
            logoutUser: function() {
                localStorage.removeItem('userToken');
                localStorage.removeItem('userId');
                delete axios.defaults.headers.common['Authorization'];
            },
            checkForm: function() {
                this.errors = [];

                if(!this.fullname) {
                    this.errors.push('Please enter your Full Name')
                } else if (this.fullname.length > 13 || this.fullname.length < 3) {
                    this.errors.push('The  name must contain a minimum of 3 letters and a maximum of 13 letters')
                } else if (!this.validfullname(this.fullname)) {
                    this.errors.push('Name must be valid')
                }

                

                if(!this.email) {
                    this.errors.push('Please enter your email')
                } else if (!this.validEmail(this.email)) {
                    this.errors.push("The format of the email must be valid")
                }

                if(!this.password) {
                    this.errors.push('Please enter your password')
                } else if (!this.validPassword(this.password)) {
                    this.errors.push('The password must be at least 8 characters with at least 1 capital letter and 1 number')
                }
            },
            validEmail: function(email) {
                const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return regexEmail.test(email);
            },
            validPassword: function(password) {
                const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
                return regexPassword.test(password);
            },
            validfullname: function(fullname) {
                const regexfullname = /^(?!.*[!@#$%])\s*[A-Za-z0-9_-][A-Za-z0-9 _-]*$/;
                return regexfullname.test(fullname);
            },
           
        }
    }

</script>