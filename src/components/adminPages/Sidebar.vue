<template>
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="info">
          <a href="#" class="d-block">KinoCMS</a>
        </div>
      </div>
      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul
          class="nav nav-pills nav-sidebar flex-column"
          data-widget="treeview"
          role="menu"
        >
          <router-link
            class="nav-link"
            active-class="active"
            :to="{ name: 'Statistic' }"
          >
            <p>{{ $t("sidebar.statistics") }}</p>
          </router-link>
          <router-link
            class="nav-link"
            active-class="active"
            :to="{ name: 'Banners' }"
          >
            <p>{{ $t("sidebar.banners") }}</p>
          </router-link>
          <router-link
            class="nav-link"
            active-class="active"
            :to="{ name: 'Movies' }"
          >
            <p>{{ $t("sidebar.films") }}</p>
          </router-link>
          <router-link
            class="nav-link"
            active-class="active"
            :to="{ name: 'Cinema' }"
          >
            <p>{{ $t("sidebar.cinemas") }}</p>
          </router-link>
          <router-link
            class="nav-link"
            active-class="active"
            :to="{ name: 'Tickets' }"
          >
            <p>Tickets</p>
          </router-link>
          <router-link
            class="nav-link"
            active-class="active"
            :to="{ name: 'News' }"
          >
            <p>{{ $t("sidebar.news") }}</p>
          </router-link>
          <router-link
            class="nav-link"
            active-class="active"
            :to="{ name: 'Shares' }"
          >
            <p>{{ $t("sidebar.discounts") }}</p>
          </router-link>
          <router-link
            class="nav-link"
            active-class="active"
            :to="{ name: 'Pages' }"
          >
            <p>{{ $t("sidebar.pages") }}</p>
          </router-link>
          <router-link
            class="nav-link"
            active-class="active"
            :to="{ name: 'Users' }"
          >
            <p>{{ $t("sidebar.users") }}</p>
          </router-link>
          <router-link
            class="nav-link"
            active-class="active"
            :to="{ name: 'Mailings' }"
          >
            <p>{{ $t("sidebar.mailing") }}</p>
          </router-link>
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>
</template>

<script>
export default {
  name: "Sidebar"
  // data: () => ({
  //   links: [
  //     { title1: "Статистика", url: "/admin/statistic" },
  //     { title2: "Баннеры ",  url: "/admin/banners" },
  //     { title3: "Фильмы", url: "/admin/movies" },
  //     { title4: "Кинотеатры", url: "/admin/cinema" },
  //     { title5: "Новости", url: "/admin/news" },
  //     { title6: "Акции", url: "/admin/shares" },
  //     { title7: "Страницы", url: "/admin/pages" },
  //     { title8: "Пользователи", url: "/admin/users" },
  //     { title9: "Рассылки", url: "/admin/mailings" }
  //   ]
  // })
};
</script>

<style lang="scss" scoped>
.active {
  background: white;
}
.nav-pills .nav-link {
  color: white;
}
.d-block {
  font-size: 28px;
}
</style>
