import Vue from "vue";
import Router from "vue-router";
import i18n from "../i18n";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    // Auth page
    {
      path: "/login",
      name: "Login.vue",
      meta: { layout: "auth" },
      component: () => import("@/components/authPages/Login.vue")
    },
    {
      path: "/registr",
      name: "Registr.vue",
      meta: { layout: "auth" },
      component: () => import("@/components/authPages/Registr.vue")
    },

    // User pages
    {
      path: "/",
      name: "Home",
      meta: { layout: "main" },
      component: () => import("@/components/mainPages/home/Home.vue")
    },
    {
      path: "/user",
      name: "User",
      meta: { layout: "main" },
      component: () => import("@/components/mainPages/user/User.vue")
    },
    {
      path: "/poster",
      name: "Poster",
      meta: { layout: "main" },
      component: () => import("@/components/mainPages/poster/Poster.vue")
    },
    {
      path: "/poster/:way",
      name: "PosterMovie",
      meta: { layout: "main" },
      props: true,
      component: () => import("@/components/mainPages/poster/PosterMovie.vue")
    },
    {
      path: "/schedule",
      name: "Schedule",
      meta: { layout: "main" },
      component: () => import("@/components/mainPages/schedule/Schedule.vue")
    },
    {
      path: "/soon",
      name: "SoonFilms",
      meta: { layout: "main" },
      component: () => import("@/components/mainPages/soon/SoonShawnFilms.vue")
    },
    {
      path: "/cinema",
      name: "Cinemas",
      meta: { layout: "main" },
      component: () => import("@/components/mainPages/cinema/Cinema.vue")
    },
    {
      path: "/cinema/:way",
      name: "CinemaInfo",
      meta: { layout: "main" },
      props: true,
      component: () => import("@/components/mainPages/cinema/CinemaInfo.vue")
    },
    {
      path: "/shares",
      name: "SharesPages",
      meta: { layout: "main" },
      props: true,
      component: () => import("@/components/mainPages/shares/SharePage.vue")
    },
    {
      path: "/aboutcinime",
      name: "AboutCinema",
      meta: { layout: "main" },
      props: true,
      component: () =>
        import("@/components/mainPages/aboutCinema/AboutCinema.vue")
    },
    {
      path: "/news",
      name: "NewsPages",
      meta: { layout: "main" },
      props: true,
      component: () => import("@/components/mainPages/news/NewsPages.vue")
    },
    {
      path: "/cafebar",
      name: "CafeBar",
      meta: { layout: "main" },
      props: true,
      component: () => import("@/components/mainPages/cafebar/CafeBar.vue")
    },
    {
      path: "/viphall",
      name: "VipHall",
      meta: { layout: "main" },
      props: true,
      component: () => import("@/components/mainPages/viphall/VipHall.vue")
    },
    {
      path: "/childroom",
      name: "ChildRoom",
      meta: { layout: "main" },
      props: true,
      component: () => import("@/components/mainPages/childroom/ChildRoom.vue")
    },
    {
      path: "/sharepages",
      name: "SharePages",
      meta: { layout: "main" },
      props: true,
      component: () =>
        import("@/components/mainPages/sharespage/SharePages.vue")
    },

    {
      path: "/langs",
      redirect: `/${i18n.locale}`
    },
    {
      path: "/:lang",
      component: {
        render(c) {
          return c("router-view");
        }
      },
      children: [
        // Admin pages
        {
          path: "/admin/statistic",
          name: "Statistic",
          meta: {
            layout: "admin"
          },
          component: () =>
            import("@/components/adminPages/statistic/Statistic.vue")
        },
        {
          path: "/admin/banners",
          name: "Banners",
          meta: {
            layout: "admin"
          },
          component: () => import("@/components/adminPages/banners/Banners.vue")
        },
        {
          path: "/admin/movies",
          name: "Movies",
          meta: {
            layout: "admin"
          },
          component: () => import("@/components/adminPages/movies/Movies.vue")
        },
        {
          path: "/admin/movies/:way",
          name: "MoviesAddCurrent",
          meta: {
            layout: "admin"
          },
          props: true,
          component: () =>
            import("@/components/adminPages/movies/MoviesAddCurrent.vue")
        },
        {
          path: "/admin/cinema",
          name: "Cinema",
          meta: {
            layout: "admin"
          },
          component: () => import("@/components/adminPages/cinema/Cinema.vue")
        },
        {
          path: "/admin/cinema/:way",
          name: "CinemaAdd",
          meta: {
            layout: "admin"
          },
          props: true,
          component: () =>
            import("@/components/adminPages/cinema/CinemaAdd.vue")
        },
        {
          path: "/admin/cinema/:way",
          name: "HallAdd",
          meta: {
            layout: "admin"
          },
          props: true,
          component: () => import("@/components/adminPages/cinema/HallAdd.vue")
        },
        {
          path: "/admin/tickets",
          name: "Tickets",
          meta: {
            layout: "admin"
          },
          component: () => import("@/components/adminPages/tickets/Tickets.vue")
        },
        {
          path: "/admin/tickets/:way",
          name: "TicketsEdit",
          meta: {
            layout: "admin"
          },
          props: true,
          component: () =>
            import("@/components/adminPages/tickets/TicketsEdit.vue")
        },
        {
          path: "/admin/news",
          name: "News",
          meta: {
            layout: "admin"
          },
          component: () => import("@/components/adminPages/news/News.vue")
        },
        {
          path: "/admin/news/:way",
          name: "NewsAdd",
          meta: {
            layout: "admin"
          },
          props: true,
          component: () => import("@/components/adminPages/news/NewsAdd.vue")
        },
        {
          path: "/admin/shares",
          name: "Shares",
          meta: {
            layout: "admin"
          },
          component: () => import("@/components/adminPages/shares/Shares.vue")
        },
        {
          path: "/admin/shares/:way",
          name: "SharesAdd",
          meta: {
            layout: "admin"
          },
          props: true,
          component: () =>
            import("@/components/adminPages/shares/SharesAdd.vue")
        },
        {
          path: "/admin/pages",
          name: "Pages",
          meta: {
            layout: "admin"
          },
          component: () => import("@/components/adminPages/pages/Pages.vue")
        },
        {
          path: "/admin/pages/:way",
          name: "PagesAddNewPage",
          meta: {
            layout: "admin"
          },
          props: true,
          component: () =>
            import("@/components/adminPages/pages/PagesAddNewPage.vue")
        },
        {
          path: "/admin/pages/:way",
          name: "PagesAddMain",
          meta: {
            layout: "admin"
          },
          props: true,
          component: () =>
            import("@/components/adminPages/pages/PagesAddMain.vue")
        },
        {
          path: "/admin/pages/:way",
          name: "PagesAddNew",
          meta: {
            layout: "admin"
          },
          props: true,
          component: () =>
            import("@/components/adminPages/pages/PagesAddNew.vue")
        },
        {
          path: "/admin/pages/:way",
          name: "PagesAddContacts",
          meta: {
            layout: "admin"
          },
          props: true,
          component: () =>
            import("@/components/adminPages/pages/PagesAddContacts.vue")
        },
        {
          path: "/admin/users",
          name: "Users",
          meta: {
            layout: "admin"
          },
          component: () => import("@/components/adminPages/users/Users.vue")
        },
        {
          path: "/admin/users/:way",
          name: "UsersEdit",
          meta: {
            layout: "admin"
          },
          props: true,
          component: () => import("@/components/adminPages/users/UsersEdit.vue")
        },
        {
          path: "/admin/mailings",
          name: "Mailings",
          meta: {
            layout: "admin"
          },
          props: true,
          component: () =>
            import("@/components/adminPages/mailings/Mailings.vue")
        },
        {
          path: "/admin/mailings/:way",
          name: "MailingsChoose",
          meta: {
            layout: "admin"
          },
          props: true,
          component: () =>
            import("@/components/adminPages/mailings/MailingsChoose.vue")
        }
      ]
    }
  ]
});
