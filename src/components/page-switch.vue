<template>
  <center class='page-switch'>
    <a-switch class='demo'
      defaultChecked
      checkedChildren="开"
      unCheckedChildren="关"
    >
      <a-icon type="check" slot="checkedChildren" />
      <a-icon type="close" slot="unCheckedChildren" />
    </a-switch>

    <br/>

    <a-button class=''
      type="link"
      html-type='a'
      href='#/home'
    >
      Home
    </a-button>
  </center>
</template>

<script>
  export default {
  }
</script>

<style>
  .page-switch .demo{
    margin: 1rem auto;
  }
</style>