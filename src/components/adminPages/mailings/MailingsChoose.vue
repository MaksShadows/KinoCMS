<template>
  <div class="users-list">
    <h3>Пользователи</h3>
    <div class="title title-main">
      <div class="title__item title__checkbox">
        <input type="checkbox" v-model="allUsers" @click="selectUsers()" />
      </div>
      <div class="title__item">ID</div>
      <div class="title__item">Дата регистрации</div>
      <div class="title__item">День рождения</div>
      <div class="title__item">Email</div>
      <div class="title__item">Телефон</div>
      <div class="title__item">ФИО</div>
      <div class="title__item">Псевдоним</div>
      <div class="title__item">Город</div>
    </div>
    <MailingsList
      v-for="user in paginatedData"
      :key="user.id"
      :user="user"
      :usersData="usersData"
    />

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
    <button class="btn btn-default start" @click="startMeiling()">
      Отправить выбранным
    </button>
  </div>
</template>

<script>
import MailingsList from "@/components/adminPages/mailings/MailingsList.vue";
import firebase from "firebase";

export default {
  name: "MailingsChoose",
  props: ["usersData", "message", "mailingsData", "ref"],

  components: {
    MailingsList
  },
  data() {
    return {
      search: "",
      size: 5,
      pageNumber: 0,
      allUsers: false
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
    selectUsers() {
      this.usersData.map(user => {
        user.mailing = !this.allUsers;
      });
    },
    startMeiling() {
      let mailUsers = this.usersData
        .filter(user => user.mailing)
        .map(user => {
          return { id: user.id, telephone: user.phone, email: user.email };
        });

      let mailing = {};
      mailing.message = this.message;
      mailing.users = mailUsers;
      this.mailingsData.push(mailing);

      // console.log(mailing);

      const baseRef = firebase.database().ref(this.ref);
      baseRef
        .set(this.mailingsData)
        .then(this.$router.push("/admin/" + this.ref));
    }
  },

  computed: {
    pageCount() {
      let l = this.usersData.length,
        s = this.size;
      return Math.ceil(l / s);
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
  },
  created() {
    if (this.usersData === undefined) {
      this.$router.push("/admin/mailings");
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
    justify-content: center;
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

    &__checkbox {
      width: 20%;
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

  button.start {
    margin: 0 0 35px 60px;
  }
}
</style>
