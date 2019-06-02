import Prismic from 'prismic-javascript'
import PrismicDOM from 'prismic-dom'

const config = {
  baseUrl: process.env.PRISMIC_API_URL,
  access_token: process.env.PRISMIC_API_KEY
}

export const initApi = req => {
  return Prismic.getApi(config.baseUrl, {
    accessToken: config.access_token,
    req: req
  })
}

export const linkResolver = doc => {
  if (doc.type === 'blog_post') return `/blog/${doc.uid}`
  return `/${doc.uid}`
}

export const generatePageData = (documentType, data) => {
  switch (documentType) {
    case 'home_page':
      return {
        welcome_message: PrismicDOM.RichText.asText(data.welcome_message)
      }
    case 'about_page':
      return {
        page_content: PrismicDOM.RichText.asText(data.page_content)
      }
    case 'blog_page':
      return {
        posts: data
      }
    case 'blog_post':
      return {
        post_title: PrismicDOM.RichText.asText(data.post_title),
        post_content: PrismicDOM.RichText.asText(data.post_content)
      }
  }
}
