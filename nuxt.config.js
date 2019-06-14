if (process.env.NODE_ENV !== 'production') require('dotenv').config()
import pkg from './package'
import Prismic from 'prismic-javascript'
import { queryForDocType } from './prismic.config'
import MomentTimezoneDataPlugin from 'moment-timezone-data-webpack-plugin'
import MomentLocalesPlugin from 'moment-locales-webpack-plugin'

export default {
  mode: 'universal',

  env: {
    PRISMIC_API_URL: process.env.PRISMIC_API_URL,
    PRISMIC_API_KEY: process.env.PRISMIC_API_KEY
  },

  /*
   ** Headers of the page
   */
  head: {
    title: 'Dadding and Deving',
    titleTemplate: 'DevDad | %s',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Deving and Dadding' }
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
    extend(config, ctx) {
      config.plugins.push(
        new MomentTimezoneDataPlugin({
          matchZones: 'America/Chicago',
          startYear: 2010,
          endYear: new Date().getFullYear() + 1
        })
      )

      config.plugins.push(new MomentLocalesPlugin())
    }
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
