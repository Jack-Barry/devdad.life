<template>
  <nav>
    <ul>
      <li>
        <nuxt-link to="/">Home</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/about">About</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/blog">Blog</nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss">
@import '~assets/variables.scss';

nav {
  position: fixed;
  display: grid;
  width: 100%;
  background: rgba(255, 255, 255, 0.9);

  ul {
    display: flex;
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      flex: 1;
      display: grid;

      a {
        width: 100%;
        line-height: 3rem;
        text-align: center;

        &:hover {
          background: $primary-color;
          color: $white;
        }
      }
    }
  }
}
</style>