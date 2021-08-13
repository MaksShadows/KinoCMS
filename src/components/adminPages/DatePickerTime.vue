<template>
  <div class="calendar">
    <date-picker
      v-model="calendar"
      type="time"
      valueType="format"
      format="HH:mm"
      @change="$emit('dateChange', calendar)"
    ></date-picker>
  </div>
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/scss/index.scss";

export default {
  components: { DatePicker },
  props: ["date"],
  data() {
    return {
      calendar: this.date
    };
  }
};
</script>

<style lang="scss" scoped></style>
