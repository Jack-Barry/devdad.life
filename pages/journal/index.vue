<template>
  <main>
    <header>
      <h1>Personal Journal</h1>
    </header>
    <div class="journal-index-links-wrapper">
      <div v-for="(entry, index) in orderedEntries" :key="index">
        <nuxt-link :to="`/journal/${entry.id}`">
          <span>{{ entry.data.date }}</span>
        </nuxt-link>
      </div>
    </div>
  </main>
</template>

<script>
import makeMetaTags from '@/helpers/makeMetaTags'
import { generatePageData, queryForDocType } from '@/prismic.config'
import DateTimeStamp from '../../components/DateTimeStamp.vue'

export default {
  components: { DateTimeStamp },

  head() {
    return {
      title: 'Personal Journal',
      meta: makeMetaTags(
        'Journal Entries by Jack Barry',
        'A personal journal by Jack Barry to assist to live with focus, clarity and purpose for every day'
      ),
    }
  },

  async asyncData({ payload }) {
    let pageData

    if (payload) {
      pageData = payload
    } else {
      const apiData = await queryForDocType('journal_entry')
      pageData = apiData.results
    }

    return generatePageData('journal_index', pageData)
  },

  computed: {
    orderedEntries() {
      return this.entries.sort((a, b) =>
        Date.parse(a.first_publication_date.split('+')[0]) >
        Date.parse(b.first_publication_date.split('+')[0])
          ? -1
          : 1
      )
    },
  },
}
</script>

<style lang="scss">
@import '~assets/variables.scss';

.journal-index-links-wrapper {
  margin: auto;
  max-width: 40rem;
  padding: 1rem 0;
}
</style>
