<template>
  <main>
    <header>
      <h1>Who is Jack Barry?</h1>
      <p>(According to Jack Barry)</p>
    </header>
    <section class="page-content">{{ page_content }}</section>
  </main>
</template>

<script>
import Prismic from 'prismic-javascript'
import { queryForDocType, generatePageData } from '@/prismic.config'

export default {
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