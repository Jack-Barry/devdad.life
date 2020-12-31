<template>
  <div>
    <main>
      <header>
        <h1>{{ journalDate }}</h1>
      </header>
    </main>
    <section class="page-content" id="gratitude-list">
      <h3>Things I'm Grateful For</h3>
      <div v-html="gratitude_list" />
    </section>
    <section class="page-content" id="target">
      <h3>Who Do I Want to Be?</h3>
      <div v-html="target" />
    </section>
    <section class="page-content" id="status">
      <h3>Who Am I Today?</h3>
      <div v-html="status" />
    </section>
    <section class="page-content" id="focus">
      <h3>What Should I Focus On Today?</h3>
      <div v-html="focusHtml" />
    </section>
  </div>
</template>

<script>
import makeMetaTags from '@/helpers/makeMetaTags'
import { generatePageData, queryForDocType } from '@/prismic.config'
import moment from 'moment-timezone'
import PrismicDOM from 'prismic-dom'

export default {
  head() {
    const title = `Journal Entry for ${this.journalDate}`
    return {
      title,
      meta: makeMetaTags(title, this.previewText),
    }
  },

  computed: {
    focusHtml() {
      return PrismicDOM.RichText.asHtml(this._data.focus)
    },

    journalDate() {
      return moment
        .tz(this._data.entry_date, 'America/Chicago')
        .format('dddd, MMMM Do')
    },

    previewText() {
      const text = PrismicDOM.RichText.asText(this._data.focus)
      return `${text.substr(0, text.lastIndexOf(' ', 60))}...`
    },
  },

  async asyncData({ payload, params }) {
    let pageData

    if (payload) {
      pageData = payload
    } else {
      const apiData = await queryForDocType(params.slug, 'document.id')
      pageData = apiData.results[0]
    }

    return generatePageData('journal_entry', pageData)
  },
}
</script>
