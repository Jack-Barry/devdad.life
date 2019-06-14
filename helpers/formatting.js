import Prism from 'prismjs'

export const prismifyBlogPost = htmlContent => {
  let updatedText = htmlContent
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')

  let textMatches = []
  const updatedTextMatches = updatedText.match(
    /<pre\sclass="(.*?(?=">))">(.*?(?=<\/pre><p>))<\/pre>/gs
  )
  if (updatedTextMatches) {
    updatedTextMatches.forEach(match => {
      const language = match.match(/class="language-(.*?(?=">))"/)[1]
      const codeText = match.match(new RegExp('(">)(.*)(?=</pre>)', 's'))[2]
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
  return updatedText
}
