if (process.env.NODE_ENV !== 'production') require('dotenv').config()
import pkg from './package'
import Prismic from 'prismic-javascript'
import { initApi } from './prismic.config'

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
  css: [],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],

  /*
   ** Nuxt.js modules
   */
  modules: [],

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
    routes: function() {
      // Fetch content for the homepage and generate it
      const homePage = initApi().then(api => {
        return api
          .query(Prismic.Predicates.at('document.type', 'home_page'))
          .then(response => {
            return response.results.map(payload => {
              return {
                route: '/',
                payload
              }
            })
          })
      })

      // Fetch content for the about page and generate it
      const aboutPage = initApi().then(api => {
        return api
          .query(Prismic.Predicates.at('document.type', 'about_page'))
          .then(response => {
            return response.results.map(payload => {
              return {
                route: '/about',
                payload
              }
            })
          })
      })

      // Fetch all the blog posts to generate the Blog page
      const blogPage = initApi().then(api => {
        return api
          .query(Prismic.Predicates.at('document.type', 'blog_post'))
          .then(response => {
            return [
              {
                route: `/blog`,
                payload: response.results
              }
            ]
          })
      })

      // Fetch again all the blog posts, but this time generating each post's page
      const blogPosts = initApi().then(api => {
        return api
          .query(Prismic.Predicates.at('document.type', 'blog_post'))
          .then(response => {
            return response.results.map(payload => {
              return {
                route: `/blog/${payload.uid}`,
                payload
              }
            })
          })
      })

      // Here I return an array of the results of each promise using the spread operator.
      // It will be passed to each page as the `payload` property of the `context` object,
      // which is used to generate the markup of the page.
      return Promise.all([homePage, aboutPage, blogPage, blogPosts]).then(
        values => {
          return [...values[0], ...values[1], ...values[2], ...values[3]]
        }
      )
    }
  }
}
