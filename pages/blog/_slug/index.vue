<template>
  <main>
    <header>
      <h1>{{ post_title }}</h1>
    </header>
    <section class="page-content" v-html="post_content"></section>
  </main>
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