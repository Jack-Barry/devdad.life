<template>
  <main>
    <header>
      <h1>{{ post_title }}</h1>
      <date-time-stamp :date="post_date" />
    </header>
    <section class="page-content" v-html="post_content"></section>
    <div class="comments">
      <Disqus
        :shortname="disqus_shortname"
        :identifier="post_uid"
        :url="`${site_root_url}/${$nuxt.$route.path}`"
      />
    </div>
  </main>
</template>

<script>
import DateTimeStamp from '../../../components/DateTimeStamp.vue'
import { queryForDocType, generatePageData } from '@/prismic.config'
import makeMetaTags from '@/helpers/makeMetaTags'

export default {
  components: { DateTimeStamp },

  head() {
    return {
      title: this.post_title,
      meta: makeMetaTags(
        this.post_title,
        this.post_tldr,
        this.post_social_media_image
      )
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
