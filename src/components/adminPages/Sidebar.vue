<template>
  <aside class="main-sidebar">
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
          :to="link.url "
        >
        {{ link.title }}
        </router-link>
      </ul>
    </nav>
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
aside {
  margin-top: 86px;
}
.active {
  background: #e4e3e3;
}
</style>
