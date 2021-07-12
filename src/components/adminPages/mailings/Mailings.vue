<template>
  <div class="main-block">
    <div class="block block-sms">
      <h2>SMS</h2>
      <MailingsSms :usersData="usersData" />
    </div>
    <div class="block block-email">
      <h2>E-Mail</h2>
      <MailingsEmail :usersData="usersData" />
    </div>
  </div>
</template>

<script>
import MailingsSms from "@/components/adminPages/mailings/MailingsSms.vue";
import MailingsEmail from "@/components/adminPages/mailings/MailingsEmail.vue";

export default {
  name: "Mailings",
  components: {
    MailingsSms,
    MailingsEmail,
  },
  data() {
    return {
      usersData: [],
    };
  },
  methods: {},

};
</script>

<style lang="scss" scoped>
.main-block {
  padding: 10px 35px;
}
.block {
  min-height: 450px;
  border: 1px solid #000;
  border-radius: 10px;
  margin: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h2 {
    margin: 20px 0;
    font-weight: bold;
  }
}
</style>