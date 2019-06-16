import Prismic from 'prismic-javascript'
import PrismicDOM from 'prismic-dom'
import { prismify } from './helpers/formatting'

export const initApi = req => {
  return Prismic.getApi(process.env.PRISMIC_API_URL, {
    accessToken: process.env.PRISMIC_API_KEY,
    req: req
  })
}

export const queryForDocType = async (docType, predicate = 'document.type') => {
  const data = await initApi()
  const queried = await data.query(Prismic.Predicates.at(predicate, docType))
  return queried
}

export const generatePageData = (documentType, data) => {
  switch (documentType) {
    case 'home_page':
      return {
        welcome_message: PrismicDOM.RichText.asText(data.welcome_message)
      }
    case 'about_page':
      return {
        page_content: PrismicDOM.RichText.asHtml(data.page_content)
      }
    case 'blog_page':
      return {
        posts: data
      }
    case 'blog_post':
      return {
        site_root_url: process.env.SITE_ROOT_URL,
        disqus_shortname: process.env.DISQUS_SHORTNAME,
        post_uid: data.data.uid,
        post_date: data.first_publication_date,
        post_tldr: data.data.post_tldr,
        post_title: PrismicDOM.RichText.asText(data.data.post_title),
        post_content: prismify(data.data.post_content)
      }
  }
}
