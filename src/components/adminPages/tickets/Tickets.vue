<template>
  <div class="news-list">
    <h3>Список Билетов</h3>
    <div class="title title-main">
      <div class="title__name">Название фильма</div>
      <div class="title__date">В кино с</div>
      <div class="title__status">Статус</div>
    </div>
    <TicketsList
      v-for="(ticket, index) in ticketsData"
      :key="ticket.id"
      :ticket="ticket"
      :ticketsData="ticketsData"
      :dbRef="ref"
      @remove="deleteTicket(index)"
    />
    <router-link
      class="btn btn-default news-list-add"
      tag="button"
      :to="{
        name: 'TicketsEdit',
        params: {
          way: 'ticket-edit',
          ticketsData: ticketsData,
          ref: ref
        }
      }"
    >
      <span></span>
      Создать Билет
    </router-link>
  </div>
</template>

<script>
import TicketsList from "@/components/adminPages/tickets/TicketsList.vue";
import firebase from "firebase";

export default {
  name: "Tickets",
  components: {
    TicketsList
  },
  data() {
    return {
      ticketsData: [],

      ref: "tickets"
    };
  },
  methods: {
    deleteTicket(index) {
      this.ticketsData.splice(index, 1);
      const baseRef = firebase.database().ref(this.ref);
      baseRef.set(this.ticketsData);
    }
  },
  created() {
    const baseRef = firebase.database().ref(this.ref);
    baseRef.on("value", snapshot => {
      if (snapshot.val() !== null) {
        this.ticketsData = snapshot.val();
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.news-list {
  padding: 20px 40px;
  position: relative;

  h3 {
    padding: 20px 10px;
    display: flex;
    justify-content: center;
  }
  &-add {
    margin: 20px auto;
    width: 215px;
    position: absolute;
    top: 20px;
    right: 35px;

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

    &__date,
    &__name,
    &__status {
      border: 1px solid #9a9a9a;
      background: #d0d0d0;
      width: 40%;
      height: 40px;
      padding-left: 10px;
      align-items: center;
      display: flex;
    }
  }
}
</style>
