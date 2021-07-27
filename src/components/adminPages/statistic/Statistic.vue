<template>
  <div class="statistic">
    <div class="row statistic__top">
      <div class="col-md-4"></div>

      <div class="col-md-3"></div>

      <div class="col-md-4">
        <div class="small-box bg-yellow">
          <div class="inner users-number">
            <h3>{{ usersData.length }}</h3>
            <p>User Registrations</p>
          </div>
          <div class="icon">
            <i class="nav-img fas fa-user-plus fa-2x"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "Statistic",
  data() {
    return {
      usersData: ["user"],
    };
  },
  created() {
    const baseRef = firebase.database().ref("users");
    baseRef.on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        this.usersData = snapshot.val();
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.statistic {
  padding: 7px;
  &__top {
    margin-top: 40px;
  }
}
.users-number {
  color: #fdfcfd;
  font-weight: 700;
}
.nav-img {
  opacity: 1;
  transition: opacity 0.2s ease;
  &:hover {
    opacity: 0.7;
  }
}
</style>