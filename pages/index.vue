<template>
  <main>
    <div class="full-screen">
      <header>
        <h1>{{ welcome_message }}</h1>
      </header>
    </div>
  </main>
</template>

<script>
import Prismic from 'prismic-javascript'
import { queryForDocType, generatePageData } from '@/prismic.config'

export default {
  head() {
    return {
      title: 'Home',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: "Jack Barry's personal blog"
        },
        {
          property: 'og:title',
          content: "Jack Barry's personal blog"
        },
        {
          property: 'og:description',
          content: 'Thoughts on various topics by Jack Barry'
        },
        {
          property: 'og:image',
          content:
            'https://jack-barry-public.s3.us-east-2.amazonaws.com/devdad-images/Social+Media+Logo.png'
        },
        {
          property: 'og:url',
          content: 'https://devdad.life'
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
      pageData = payload.data
    } else {
      const apiData = await queryForDocType('home_page')
      pageData = apiData.results[0].data
    }
    return generatePageData('home_page', pageData)
  }
}
</script>

<style lang="scss">
@import '~assets/variables.scss';

.full-screen {
  height: calc(100vh - 3rem);
  display: grid;
  align-items: center;
}
</style>
