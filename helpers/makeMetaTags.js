import constants from './constants'

export default function(title, description, imageLink) {
  const imageUrl =
    typeof imageLink === 'string' ? imageLink : constants.socialMediaImageUrl

  return [
    {
      hid: 'description',
      name: 'description',
      content: description
    },
    // Facebook
    {
      property: 'og:title',
      content: title
    },
    {
      property: 'og:description',
      content: description
    },
    {
      property: 'og:image',
      content: imageUrl
    },
    {
      property: 'og:site_name',
      content: 'DevDad.life'
    },
    // Twitter
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      property: 'twitter:title',
      content: title
    },
    {
      property: 'twitter:description',
      content: description
    },
    {
      name: 'twitter:image',
      content: imageUrl
    }
  ]
}
