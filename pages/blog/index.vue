<template>
  <main>
    <header>
      <h1>Blog</h1>
    </header>
    <div v-for="(post, index) in orderedPosts" :key="index">
      <blog-preview :post="post" />
    </div>
  </main>
</template>

<script>
import Prismic from 'prismic-javascript'
import { queryForDocType, generatePageData } from '@/prismic.config'
import constants from '@/helpers/constants'
import BlogPreview from '../../components/BlogPreview.vue'

export default {
  components: { BlogPreview },
  head() {
    return {
      title: 'Blog',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'A personal blog by Jack Barry about seeking Jesus, dadding, husbanding, and dev life'
        },
        {
          property: 'og:title',
          content: 'Blog Posts by Jack Barry'
        },
        {
          property: 'og:description',
          content:
            'A personal blog by Jack Barry about seeking Jesus, dadding, husbanding, and dev life'
        },
        {
          property: 'og:image',
          content: constants.socialMediaImageUrl
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image'
        }
      ]
    }
  },
  async asyncData({ payload }) {
    let pageData

    if (payload) {
      pageData = payload
    } else {
      const apiData = await queryForDocType('blog_post')
      pageData = apiData.results
    }
    return generatePageData('blog_page', pageData)
  },
  computed: {
    orderedPosts() {
      return this.posts.sort((a, b) =>
        Date.parse(a.first_publication_date.split('+')[0]) >
        Date.parse(b.first_publication_date.split('+')[0])
          ? -1
          : 1
      )
    }
  }
}
</script>