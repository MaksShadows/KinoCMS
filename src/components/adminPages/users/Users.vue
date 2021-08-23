<template>
  <div class="users-list">
    <h3>Пользователи</h3>
    <div class="title title-main">
      <div class="title__item">ID</div>
      <div class="title__item">Дата регистрации</div>
      <div class="title__item">День рождения</div>
      <div class="title__item">Email</div>
      <div class="title__item">Телефон</div>
      <div class="title__item">ФИО</div>
      <div class="title__item">Псевдоним</div>
      <div class="title__item">Город</div>
    </div>
    <UsersList
      v-for="(users, index) in paginatedData"
      :key="users.id"
      :data="users"
      :dataArr="usersData"
      :dbRef="ref"
      @remove="deleteUser(index)"
    />
    <router-link
      class="btn btn-default users-list-add"
      tag="button"
      :to="{
        name: 'UsersEdit',
        params: {
          way: 'users-edit',
          dataArr: usersData,
          dbRef: ref
        }
      }"
    >
      <span></span>
      Добавить пользоватля
    </router-link>

    <input
      v-model="search"
      class="users-list-search"
      type="search"
      placeholder="Поиск"
    />

    <div class="pages">
      <button
        :disabled="pageNumber === 0"
        @click="prevPage"
        class="btn btn-default"
      >
        Previous
      </button>

      <ul>
        <li v-for="page in pageCount" :key="page">
          <a
            v-if="
              Math.abs(page - 1 - pageNumber) < 2 ||
                page == pageCount ||
                page == 1
            "
            @click.prevent="setPage(page)"
            :class="{
              current: pageNumber === page - 1,
              last: page == pageCount && Math.abs(page - pageNumber) > 3,
              first: page == 1 && Math.abs(page - 1 - pageNumber) > 2
            }"
            >{{ page }}</a
          >
        </li>
      </ul>

      <button
        :disabled="pageNumber >= pageCount - 1"
        @click="nextPage"
        class="btn btn-default"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
import UsersList from "@/components/adminPages/users/UsersList.vue";
import firebase from "firebase";

export default {
  name: "Users",
  components: {
    UsersList
  },
  data() {
    return {
      usersData: [],
      search: "",
      size: 5,
      pageNumber: 0,

      ref: "users"
    };
  },
  methods: {
    nextPage() {
      this.pageNumber++;
    },
    prevPage() {
      this.pageNumber--;
    },
    setPage(page) {
      this.pageNumber = page - 1;
    },
    deleteUser(index) {
      this.usersData.splice(index, 1);
      const baseRef = firebase.database().ref(this.ref);
      baseRef.set(this.usersData);
    }
  },
  created() {
    const baseRef = firebase.database().ref(this.ref);
    baseRef.on("value", snapshot => {
      if (snapshot.val() !== null) {
        this.usersData = snapshot.val();
      }
    });
  },
  computed: {
    pageCount() {
      let length = this.usersData.length,
        size = this.size;
      return Math.ceil(length / size);
    },
    paginatedData() {
      const start = this.pageNumber * this.size,
        end = start + this.size;
      return this.usersData
        .filter(elem => {
          return (
            elem.firstname.toLowerCase().includes(this.search.toLowerCase()) ||
            elem.lastname.toLowerCase().includes(this.search.toLowerCase()) ||
            elem.nickname.toLowerCase().includes(this.search.toLowerCase())
          );
        })
        .slice(start, end);
    }
  }
};
</script>

<style lang="scss" scoped>
.users-list {
  padding: 20px 40px;
  position: relative;

  h3 {
    padding: 20px 10px;
    display: flex;
    justify-content: flex-start;
  }
  &-search {
    width: 225px;
    height: 37px;
    position: absolute;
    top: 20px;
    right: 270px;
    margin: 20px 5px;
    padding: 6px;
    background-color: #f8f9fa;
    border-color: #ddd;
  }
  &-add {
    margin: 20px auto;
    width: 225px;
    position: absolute;
    top: 20px;
    right: 35px;
    padding: 6px 0 6px 30px;

    span {
      width: 20px;
      height: 20px;
      display: flex;
      position: absolute;
      left: 11px;
      top: 8px;
    }
    span::after,
    span::before {
      content: " ";
      position: absolute;
      background-color: #72bb53;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    span::after {
      width: 20px;
      height: 2px;
    }
    span::before {
      width: 2px;
      height: 20px;
    }
  }

  .title {
    display: flex;
    justify-content: center;
    &-main {
      margin: 0 70px 0 60px;
    }

    &__item {
      border: 1px solid #9a9a9a;
      background: #d0d0d0;
      width: 40%;
      min-height: 40px;
      padding: 5px;
      align-items: center;
      display: flex;
      justify-content: center;
      word-break: break-all;
    }
  }

  .pages {
    display: flex;
    justify-content: center;
    align-items: center;

    button {
      margin: 30px 10px;
    }
    ul {
      /* width: 200px; */
      display: flex;
      justify-content: center;
      padding: 0;
      list-style-type: none;
    }
    li {
      display: inline;
      margin: 5px 5px;
    }
    a {
      color: #999;
      &.current {
        color: red;
      }
      &.first::after {
        content: "...";
      }
      &.last::before {
        content: "...";
      }
    }
  }
}
</style>
