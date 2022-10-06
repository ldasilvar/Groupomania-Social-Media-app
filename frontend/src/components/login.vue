<template>
    <div class="container">
        <div class="navbar">
            <div>
               <router-link to="/articles"><img src="../assets/images/icon-left-font-monochrome-black.png" alt="groupomania" class="logo"></router-link>
            </div>
            <div class="list">
                <div>
                   <ul>
                        <li class='list-navbar hover-login'><router-link style="text-decoration: none; color: inherit" to="/users/signup">Sign Up</router-link></li>
                        <li class="list-navbar hover-login"><router-link style="text-decoration: none; color: inherit" to="/">Login</router-link></li>
                        <li class='list-navbar'><router-link style="text-decoration: none; display: none; color: inherit" to="/"><span class="hover-login" @click="logoutUser"><i class="fas fa-power-off"></i></span></router-link></li>
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

        <div class="card-login">
            <form method="post" action="http://localhost:3000/api/auth/users/login">
                <img src="../assets/images/icon-left-font-monochrome-black.png" alt="">
                <div>
                    <input v-model="email" class="form-email-password"  type="text" id="email" name="email" placeholder="Enter your email" required>
                </div>
                <div>
                    <input v-model="password" class="form-email-password input-password" type="password" id="password" name="password" placeholder="Enter your password" required> 
                </div>
                <div class="button-form">
                    <input @click.prevent="loginUser" class="button" type="button" value="Login">
                    <p class="button-form-text">
                Not registered?
                <router-link style="text-decoration: none; color: black" to="/users/signup">Register here</router-link></p>
                </div>
                <div>
                    <p class="p-form-login">Your email or password is incorrect !</p>
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
        name: 'LoginUser',
        data: function() {
            return {
                email: "",
                password: ""
            }
        },
        methods: {
            loginUser: function() {
                axios.post('http://localhost:3000/api/auth/users/login', 
                { email: this.email, 
                password: this.password 
                })
                .then((response) => {
                    console.log(response)
                    this.data = response.data
                    const token = response.data.token;
                    // console.log(token);

                    if(response) {
                        alert('Login Succesful');
                    }

                    if(token != null) {
                        localStorage.setItem('userToken', token);
                        localStorage.setItem('userId', response.data.userId);
                        window.location.href=`/articles`;
                    } else {
                        window.location.href=`/`;
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
