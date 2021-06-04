<template>
  <main>
    <div class="full-screen">
      <header v-html="welcome_message"></header>
    </div>
  </main>
</template>

<script>
import Prismic from 'prismic-javascript'
import { queryForDocType, generatePageData } from '@/prismic.config'
import makeMetaTags from '@/helpers/makeMetaTags'

export default {
  head() {
    return {
      title: 'Home',
      meta: makeMetaTags(
        "Jack Barry's Personal Blog",
        'Thoughts on various topics by Jack Barry'
      ),
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
  },
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
