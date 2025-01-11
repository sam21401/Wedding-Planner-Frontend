<template>
  <div id="app">
    <Header />
    <Options />
    <slot name="slider"></slot>
    <Content />
    <Footer />
    <Snowfall />
  </div>
</template>

<script lang="ts">
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import Options from "./components/Options.vue";
import Snowfall from "./components/Snowfall.vue";

export default {
  components: {
    Header,
    Footer,
    Options,
    Snowfall,
  },
};
</script>
