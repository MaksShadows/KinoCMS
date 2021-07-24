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
            v-for="link in links"
            :key="link.url"
            active-class="active"
            :to="link.url"
          >
            {{ link.title }}
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
  name: "Sidebar",
  data: () => ({
    links: [
      { title: "Статистика", url: "/admin/statistic" },
      { title: "Баннеры", url: "/admin/banners" },
      { title: "Фильмы", url: "/admin/movies" },
      { title: "Кинотеатры", url: "/admin/cinema" },
      { title: "Новости", url: "/admin/news" },
      { title: "Акции", url: "/admin/shares" },
      { title: "Страницы", url: "/admin/pages" },
      { title: "Пользователи", url: "/admin/users" },
      { title: "Рассылки", url: "/admin/mailings" },
    ],
  }),
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