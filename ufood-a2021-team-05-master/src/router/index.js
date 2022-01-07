import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home";
import Restaurant from "@/components/Restaurant";
import User from "@/components/User";
import Login from "@/components/Login";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: '/restaurant/:id',
      name: "Restaurant",
      component: Restaurant,
    },
    {
      path: "/user",
      name: "User",
      component: User,
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
  ],
});
