<template>
  <nav>
    <div>
      <nuxt-link to="/"></nuxt-link>
    </div>
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
nav {
  position: fixed;
  display: grid;
  width: 100%;
  grid-template-columns: auto 1fr;

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
      }
    }
  }
}
</style>