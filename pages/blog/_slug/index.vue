<template>
  <main>
    <header>
      <h1>{{ post_title }}</h1>
      <date-time-stamp :date="post_date"/>
    </header>
    <section class="page-content" v-html="post_content"></section>
  </main>
</template>

<script>
import DateTimeStamp from '../../../components/DateTimeStamp.vue'
import { queryForDocType, generatePageData } from '@/prismic.config'

export default {
  components: { DateTimeStamp },
  async asyncData({ payload, params }) {
    let pageData

    if (payload) {
      pageData = payload
    } else {
      const apiData = await queryForDocType(params.slug, 'my.blog_post.uid')
      pageData = apiData.results[0]
    }
    return generatePageData('blog_post', pageData)
  }
}
</script>