<template>
  <div class="title">
    <div class="title__name">{{ ticket.movie.name }}</div>
    <div class="title__date">{{ ticket.date }}</div>
    <div class="title__status" v-if="ticket.status">В кино</div>
    <div class="title__status" v-else>Скоро</div>
    <router-link
      class="title__edit"
      tag="div"
      :to="{
        name: 'TicketsEdit',
        params: {
          way: 'ticket-edit',
          ticket: ticket,
          ticketsData: ticketsData,
          ref: ref
        }
      }"
    >
      <div class="icon fas fa-pen"></div>
    </router-link>
    <div @click="$emit('remove')" class="icon title__remove fas fa-trash"></div>
  </div>
</template>

<script>
export default {
  name: "TicketsList",
  props: {
    ticket: {
      type: Object,
      default: () => {}
    },
    ticketsData: {
      type: Array,
      default: () => []
    },
    ref: {
      type: String,
      default: "tickets"
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  justify-content: center;
  margin-left: 60px;

  &__date,
  &__name,
  &__status {
    border: 1px solid #9a9a9a;
    background: #ececec;
    width: 40%;
    height: 40px;
    padding-left: 10px;
    align-items: center;
    display: flex;
  }

  &__edit,
  &__remove {
    margin-left: 20px;
    align-items: center;
    display: flex;
  }

  .icon {
  }
}
</style>
