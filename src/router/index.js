import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [

    {
      path: "/admin/statistic",
      name: "Statistic",
      meta: { layout: "admin" },
      component: () =>
        import("@/components/adminPages/statistic/Statistic.vue"),
    },
    {
      path: "/admin/banners",
      name: "Banners",
      meta: { layout: "admin" },
      component: () => import("@/components/adminPages/banners/Banners.vue"),
    },
    {
      path: "/admin/movies",
      name: "Movies",
      meta: { layout: "admin" },
      component: () => import("@/components/adminPages/movies/Movies.vue"),
    },
    {
      path: "/admin/cinema",
      name: "Cinema",
      meta: { layout: "admin" },
      component: () => import("@/components/adminPages/cinema/Cinema.vue"),
    },
    {
      path: "/admin/news",
      name: "News",
      meta: { layout: "admin" },
      component: () => import("@/components/adminPages/news/News.vue"),
    },
    {
      path: "/admin/news/:way",
      name: "NewsAdd",
      meta: { layout: "admin" },
      props: true,
      component: () => import("@/components/adminPages/news/NewsAdd.vue"),
    },
    {
      path: "/admin/shares",
      name: "Shares",
      meta: { layout: "admin" },
      component: () => import("@/components/adminPages/shares/Shares.vue"),
    },
    {
      path: "/admin/shares/:way",
      name: "SharesAdd",
      meta: { layout: "admin" },
      props: true,
      component: () => import("@/components/adminPages/shares/SharesAdd.vue"),
    },
    {
      path: "/admin/pages",
      name: "Pages",
      meta: { layout: "admin" },
      component: () => import("@/components/pages/Pages.vue"),
    },
    {
      path: "/admin/pages/:way",
      name: "PagesAddNewPage",
      meta: { layout: "admin" },
      props: true,
      component: () =>
        import("@/components/pages/PagesAddNewPage.vue"),
    },

    {
      path: "/admin/users",
      name: "Users",
      meta: { layout: "admin" },
      component: () => import("@/components/adminPages/users/Users.vue"),
    },
    {
      path: "/admin/mailings",
      name: "Mailings",
      meta: { layout: "admin" },
      props: true,
      component: () => import("@/components/adminPages/mailings/Mailings.vue"),
    },

  ],
});
