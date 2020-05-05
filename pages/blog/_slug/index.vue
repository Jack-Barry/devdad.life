<template>
  <main>
    <header>
      <h1>{{ post_title }}</h1>
      <date-time-stamp :date="post_date" />
    </header>
    <section class="page-content" v-html="post_content"></section>
    <div class="comments">
      <vue-disqus
        :shortname="disqus_shortname"
        :identifier="post_uid"
        :url="`${site_root_url}/${$nuxt.$route.path}`"
      ></vue-disqus>
    </div>
  </main>
</template>

<script>
import DateTimeStamp from '../../../components/DateTimeStamp.vue'
import { queryForDocType, generatePageData } from '@/prismic.config'
import constants from '@/helpers/constants'

export default {
  components: { DateTimeStamp },
  head() {
    return {
      title: this.post_title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.post_tldr
        },
        {
          property: 'og:title',
          content: this.post_title
        },
        {
          property: 'og:description',
          content: this.post_tldr
        },
        {
          property: 'og:image',
          content: this.post_social_media_image || constants.socialMediaImageUrl
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image'
        }
      ]
    }
  },
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