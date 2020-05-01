<template>
  <center class='page-home'>
    <a-rate class='demo'
      :default-value="2.5"
      allow-half
    />

    <br/>

    <a-button class=''
      type="link"
      html-type='a'
      href='javascript: window.history.back();'
    >
      back
    </a-button>
  </center>
</template>

<script>
  export default {
  }
</script>

<style>
  .page-home .demo{
    margin: 1rem auto;
  }
</style>