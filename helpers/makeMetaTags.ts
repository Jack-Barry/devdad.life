import constants from './constants'

export default function (
  title: string,
  description: string,
  imageLink: string
) {
  const imageUrl =
    typeof imageLink === 'string' ? imageLink : constants.socialMediaImageUrl

  return [
    {
      hid: 'description',
      name: 'description',
      content: description,
    },
    {
      name: 'author',
      content: 'Jack Barry',
    },
    // Facebook
    {
      property: 'og:title',
      content: title,
    },
    {
      property: 'og:description',
      content: description,
    },
    {
      property: 'og:image',
      name: 'image',
      content: imageUrl,
    },
    {
      property: 'og:site_name',
      content: 'DevDad.life',
    },
    // Twitter
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      property: 'twitter:title',
      content: title,
    },
    {
      property: 'twitter:description',
      content: description,
    },
    {
      name: 'twitter:image',
      content: imageUrl,
    },
  ]
}