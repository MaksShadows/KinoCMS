<template>
  <div class="calendar">
    <date-picker
      v-model="calendar"
      :lang="rus"
      :type="type"
      valueType="format"
      :format="format"
      @change="$emit('dateChange', calendar)"
    ></date-picker>
  </div>
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/scss/index.scss";

export default {
  components: { DatePicker },
  props: ["date", "type", "format"],
  data() {
    return {
      calendar: this.date
    };
  }
};
</script>

<style lang="scss" scoped></style>
