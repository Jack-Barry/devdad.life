<template>
  <div class="blog-post-preview-wrapper">
    <div class="blog-post-preview">
      <h3>
        <nuxt-link :to="`/blog/${post.uid}`">{{ Dom.RichText.asText(post.data.post_title) }}</nuxt-link>
      </h3>
      <div>
        <date-time-stamp :date="post.first_publication_date"/>
        <span v-for="tag in sortedTags" :key="tag" class="blog-post-tag">{{ tag }}</span>
      </div>
      <p>
        {{ previewText }}
        <nuxt-link :to="`/blog/${post.uid}`">Read More</nuxt-link>
      </p>
    </div>
  </div>
</template>

<script>
import PrismicDOM from 'prismic-dom'
import DateTimeStamp from './DateTimeStamp.vue'

export default {
  components: { DateTimeStamp },
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      Dom: PrismicDOM
    }
  },
  computed: {
    previewText() {
      const text = PrismicDOM.RichText.asText(
        this.$props.post.data.post_content
      )
      return `${text.substr(0, text.lastIndexOf(' ', 190))}...`
    },
    sortedTags() {
      return this.$props.post.tags.sort()
    }
  }
}
</script>

<style lang="scss">
@import '~assets/variables.scss';

.blog-post-preview-wrapper {
  padding: 0 3rem;
  display: grid;
  justify-content: center;
}

.blog-post-preview {
  max-width: 40rem;
  padding: 1rem 0;

  h3 {
    margin-bottom: 1rem;
  }

  p {
    line-height: 1.5em;
  }
}

.blog-post-tag {
  display: inline-block;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  background-color: $pale-gray;
  border-radius: 2em;
  transition-duration: 0.3s;

  &:not(:last-child) {
    margin-right: 0.5rem;
  }

  &:hover {
    background-color: $gray;
    color: $white;
  }
}
</style>
