<template>
  <main>
    <header>
      <h1>Blog</h1>
    </header>
    <div v-for="(post, index) in posts" :key="index">
      <blog-preview :post="post"/>
    </div>
  </main>
</template>

<script>
import Prismic from 'prismic-javascript'
import { queryForDocType, generatePageData } from '@/prismic.config'
import BlogPreview from '../../components/BlogPreview.vue'

export default {
  components: { BlogPreview },
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