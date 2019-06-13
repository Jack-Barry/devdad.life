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
          content: "Jack Barry's personal blog, online resumé, and other stuff"
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
