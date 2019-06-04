<template>
  <section class="container">
    <h1>{{ welcome_message }}</h1>
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
      const apiData = await queryForDocType('home_page')
      pageData = apiData.results[0].data
    }
    return generatePageData('home_page', pageData)
  }
}
</script>