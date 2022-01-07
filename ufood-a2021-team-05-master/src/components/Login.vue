<template>
  <div class="font-sans min-h-screen antialiased bg-black pt-24 pb-5">
    <div class="flex flex-col justify-center sm:w-96 sm:m-auto mx-5 mb-5 space-y-8">
      <h1 class="font-bold text-center text-4xl text-yellow-500">Welcome to<span class="text-red"> Ufood</span></h1>
      <div class="flex flex-col bg-gray-900 p-10 rounded-lg shadow space-y-6">
        <h1 class="font-bold text-xl text-center">Sign in to your account</h1>
        <div class="flex flex-col space-y-1">
          <input type="text" v-model="loginMail" id="idloginMail" value="loginMail" class=" text-black border-2 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 focus:shadow" placeholder="Email" />
        </div>
        <div class="flex flex-col space-y-1">
          <input type="password" v-model="loginPassword" value="loginPassword" id="idloginPassword" class=" text-black border-2 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 focus:shadow" placeholder="Password" />
        </div>
        <div class="flex flex-col-reverse sm:flex-row sm:justify-between items-center">
          <button class="bg-blue-500 text-white font-bold px-5 py-2 rounded focus:outline-none shadow hover:bg-blue-700 transition-colors" @click="login()">Log In</button>
        </div>
        <div id="msgLogin"></div>
        <h1 class="font-bold text-xl text-center">Create an account</h1>
        <div class="flex flex-col space-y-1">
          <input type="text" v-model="NewUser" value="NewUser" id="idNewUser" class=" text-black border-2 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 focus:shadow" placeholder="Username" />
        </div>
        <div class="flex flex-col space-y-1">
          <input type="text" v-model="NewEmail" value="NewEmail" id="idNewEmail" class="text-black border-2 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 focus:shadow" placeholder="Email" />
        </div>
        <div class="flex flex-col space-y-1">
          <input type="password" v-model="NewPassword" value="NewPassword" id="idNewPassword" class="text-black border-2 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 focus:shadow" placeholder="New Password" />
        </div>
        <div class="flex flex-col-reverse sm:flex-row sm:justify-between items-center">
          <button class="bg-blue-500 text-white font-bold px-5 py-2 rounded focus:outline-none shadow hover:bg-blue-700 transition-colors" @click="create()">Create</button>
        </div>
        <div id="msgCreateAccount"></div>
      </div>
      <div class="flex justify-center text-gray-500 text-sm">
        <p>&copy;2021. All praise pepe.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { postSignup } from "../js/logApi.js"
import { postLogin } from "../js/logApi.js"
import { isTokenValid } from "../js/logApi.js"

export default {
  data() {
    return {
      loginMail: '',
      loginPassword: '',
      NewUser: '',
      NewEmail: '',
      NewPassword: '',
    }
  },
  methods: {
    async login() {
      if (this.loginMail != '' && this.loginPassword != ''){
        await postLogin(this.loginMail, this.loginPassword,() => {
          document.getElementById('msgLogin').innerHTML = "Bad Authentification ! ";
          document.getElementById('msgLogin').innerHTML += "Please enter a valid PASSWORD/USER Combinaison.";
          this.globalLogout();
        });
        if (await isTokenValid()){
          await this.globalLogin();
          this.cleardata();
          this.$router.push('/')
        }
      }
      else{
          document.getElementById('msgLogin').innerHTML = "Please enter a Username and a Password (NO BLANK).";
      }
    },
    async create() {
      if (this.NewUser != '' && this.NewEmail != '' && this.NewPassword != ''){
        await postSignup(this.NewUser, this.NewEmail, this.NewPassword);
        await postLogin(this.NewEmail, this.NewPassword,() => {
          document.getElementById('msgLogin').innerHTML = "Bad Authentification ! ";
          document.getElementById('msgLogin').innerHTML += "Please enter a valid PASSWORD/USER Combinaison.";
          this.globalLogout();
        });
        if (await isTokenValid()){
          await this.globalLogin();
          this.cleardata();
          this.$router.push('/')
        }
      }
      else
      {
        document.getElementById('msgCreateAccount').innerHTML = "Please enter a Username, Email and a Password (NO BLANK). ";
      }
    },
    cleardata(){
      this.loginMail = '';
      this.loginPassword = '';
      this.NewUser = '';
      this.NewEmail = '';
      this.NewPassword = '';
    }
  }
}
</script>
<style scoped></style>
