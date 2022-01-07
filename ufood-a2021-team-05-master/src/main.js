import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueCookies from 'vue-cookies';
import "./index.css";
import { getTokenInfo} from "./js/logApi.js";
import { isTokenValid } from "./js/logApi.js"
Vue.config.productionTip = false;
Vue.use(VueCookies);

Vue.mixin({
  methods: {
    globalLogout: async function(){
      VueCookies.set('token', null);
      this.$root.isLoggedIn = false;
      this.$root.name = '';
      this.$root.email = '';
      this.$root.token = '';
      this.$root.id = '';
      this.$router.push('/login');
    },
    globalLogin: async function(){
      if(await isTokenValid()) {
        this.$root.isLoggedIn = true;
        const tokendata = await getTokenInfo();
        this.$root.name = tokendata.name;
        this.$root.email = tokendata.email;
        this.$root.token = tokendata.token;
        this.$root.id = tokendata.id;
      }else{
        VueCookies.set('token', null);
        this.$root.isLoggedIn = false;
        this.$root.name = '';
        this.$root.email = '';
        this.$root.token = '';
        this.$root.id = '';
      }
    },
  }
});

// set default config
VueCookies.config('1d')

new Vue({
  data:{
    isLoggedIn: false,
    name: '',
    email: '',
    id: '',
    token: '',
  },
  router,
  render: (h) => h(App),
}).$mount("#app");
