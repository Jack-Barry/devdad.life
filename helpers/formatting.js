import PrismicDOM from 'prismic-dom'
import Prism from 'prismjs'

export const prismify = data => {
  let richText = PrismicDOM.RichText.asHtml(data)
  const toReplace = richText.match(
    /<pre\sclass="language-(?:\w*)">(.*?(?=<\/pre>))<\/pre>/gs
  )

  let replaceIndex = 0

  data.forEach(docSection => {
    if (docSection.type === 'preformatted') {
      const codeLanguage = docSection.label.replace('language-', '')
      richText = richText.replace(
        toReplace[replaceIndex],
        `<pre class="language-${codeLanguage}"><code class="language-${codeLanguage}">` +
          Prism.highlight(
            docSection.text,
            Prism.languages[codeLanguage],
            codeLanguage
          ) +
          '</code></pre>'
      )
      replaceIndex++
    }
  })
  return richText
}
