<template>
  <div class="container">
    <h1>{{ post_title }}</h1>
    <div>{{ post_content }}</div>
  </div>
</template>

<script>
import Prismic from 'prismic-javascript'
import { queryForDocType, generatePageData } from '@/prismic.config'

export default {
  async asyncData({ payload, params }) {
    let pageData

    if (payload) {
      pageData = payload.data
    } else {
      const apiData = await queryForDocType(params.slug, 'my.blog_post.uid')
      pageData = apiData.results[0].data
    }
    return generatePageData('blog_post', pageData)
  }
}
</script>