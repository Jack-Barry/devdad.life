<template>
  <section class="container">
    <div>{{ page_content }}</div>
  </section>
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