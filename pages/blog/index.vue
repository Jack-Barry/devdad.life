<template>
  <div class="container">
    <h1>Blog page</h1>
    <hr>
    <article class="post" v-for="(post, index) in posts" :key="index">
      <header>
        <h1>
          <nuxt-link :to="`/blog/${post.uid}`">{{ Dom.RichText.asText(post.data.post_title) }}</nuxt-link>
        </h1>
      </header>
    </article>
  </div>
</template>

<script>
import Prismic from 'prismic-javascript'
import PrismicDOM from 'prismic-dom'
import { queryForDocType, generatePageData } from '@/prismic.config'

export default {
  data() {
    return {
      Dom: PrismicDOM
    }
  },
  async asyncData({ payload }) {
    let pageData

    if (payload) {
      pageData = payload.data
    } else {
      const apiData = await queryForDocType('blog_post')
      pageData = apiData.results
    }
    return generatePageData('blog_page', pageData)
  }
}
</script>