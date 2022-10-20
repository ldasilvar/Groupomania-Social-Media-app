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

        <!-- PROFIL -->

        <div class="card-profile">
            <div class="user-profile1">
                <img src="../assets/images/profile.png" alt="myprofile" class="user-profile-img1">
                <p class="img-fontawesome-profil">Upload your profile picture</p>
                <div class="off-and-basket">
                    <form method="put" class="info-user2">
                <div v-if="user">
                    <input v-model="user.fullname" type="text" class="card-info-user2" id="fullname" name="fullname" placeholder="New Full Name" required> 
                </div>
                
                <div v-if="user">
                    <input v-model="user.email" type="text" class="card-info-user2" id="email" name="email" placeholder="New email" required> 
                </div>
    
                    <input @click="updateUser" class="button" type="button" value="Save the changes">
                
            </form>
                </div>
                <router-link style="text-decoration: none; color: inherit" to="/"><span id="hover-login" @click="deleteUser"><i class="fas fa-trash-alt margin-right-off1" title="Delete your profile"></i></span></router-link>
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
                    // console.log(data);
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
                    
                    console.log('this.user.fullname, this.user.fullname')
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
                    delete axios.defaults.headers['Authorization'];
                },
                deleteUser: function() {
                Vue.axios.delete('http://localhost:3000/api/auth/users/' + this.$route.params.id)
                .then((data) => {
                    this.user.id
                    console.log(data);

                    if(this.user.id) {
                        alert('Your account has been deleted!')
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