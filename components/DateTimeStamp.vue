<template>
  <div>
    <p class="date-time-stamp">{{ dateString }}</p>
  </div>
</template>

<script>
import moment from 'moment-timezone'

export default {
  props: {
    date: {
      type: String,
    },
  },
  data() {
    return {
      dateString: moment
        .tz(this.date, 'America/Chicago')
        .format('dddd, MMMM Do YYYY @ h:mm a z'),
    }
  },
}
</script>

<style lang="scss">
@import '~assets/variables.scss';

.date-time-stamp {
  color: $gray;
  font-size: 0.9rem;
  font-style: italic;
}
</style>
