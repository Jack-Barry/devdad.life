if (process.env.NODE_ENV !== 'production') require('dotenv').config()
import pkg from './package'
import Prismic from 'prismic-javascript'
import { queryForDocType } from './prismic.config'

export default {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: ['assets/styles.scss'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~plugins/prism'],

  /*
   ** Nuxt.js modules
   */
  modules: [['@nuxtjs/dotenv', { systemvars: true }]],

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },

  generate: {
    routes: async function() {
      const homepageData = await queryForDocType('home_page')
      const aboutPageData = await queryForDocType('about_page')
      const blogPostsData = await queryForDocType('blog_post')

      const blogPosts = blogPostsData.results.map(payload => ({
        route: `/blog/${payload.uid}`,
        payload
      }))

      return [
        { route: '/', payload: homepageData.results.data },
        { route: '/about', payload: aboutPageData.results.data },
        { route: '/blog', payload: blogPostsData.results.data },
        ...blogPosts
      ]
    }
  }
}
