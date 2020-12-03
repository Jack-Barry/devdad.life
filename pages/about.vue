<template>
  <main>
    <header>
      <h1>Who is Jack Barry?</h1>
      <p>(According to Jack Barry)</p>
    </header>
    <section class="page-content" v-html="page_content" />
  </main>
</template>

<script>
import Prismic from 'prismic-javascript'
import { queryForDocType, generatePageData } from '@/prismic.config'
import makeMetaTags from '@/helpers/makeMetaTags'

export default {
  head() {
    return {
      title: 'About',
      meta: makeMetaTags('About Jack Barry', 'A little bit about Jack Barry')
    }
  },
  async asyncData({ payload }) {
    let pageData

    if (payload) {
      pageData = payload.data
    } else {
      const apiData = await queryForDocType('about_page')
      pageData = apiData.results[0].data
    }

    return generatePageData('about_page', pageData)
  }
}
</script>
