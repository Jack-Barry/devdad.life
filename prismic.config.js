import Prismic from 'prismic-javascript'
import PrismicDOM from 'prismic-dom'
import Prism from 'prismjs'

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
      let updatedText = PrismicDOM.RichText.asHtml(data.data.post_content)
        .replace(/&#39;/g, "'")
        .replace(/&quot;/g, '"')

      let textMatches = []
      const updatedTextMatches = updatedText.match(
        /<pre\sclass="(.*?(?=">))">(.*?(?=<\/pre))<\/pre>/gs
      )
      if (updatedTextMatches) {
        updatedTextMatches.forEach(match => {
          console.log(match)
          const language = match.match(/class="language-(.*?(?=">))"/)[1]
          const codeText = match.match(
            new RegExp('(">)(.*)(?=<\/pre>)', 's')
          )[2]
          const formattedText = Prism.highlight(
            codeText,
            Prism.languages[language],
            language
          )

          let replacement = match
            .replace(
              /<pre\sclass="(.*?(?=">))">/,
              '<pre class="$1"><code class="$1">'
            )
            .replace(/<\/pre>/, '</code></pre>')
            .replace(codeText, formattedText)

          textMatches.push({
            match,
            replacement
          })
        })

        textMatches.forEach(match => {
          updatedText = updatedText.replace(match.match, match.replacement)
        })
      }

      return {
        post_date: data.first_publication_date,
        post_tldr: data.data.post_tldr,
        post_title: PrismicDOM.RichText.asText(data.data.post_title),
        post_content: updatedText
      }
  }
}
