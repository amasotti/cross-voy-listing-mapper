<script setup lang="ts">
// Script content (if any)
</script>


<template>
  <div class="banner-container">
    <img src="@/assets/voy_bot.png" alt="App Logo" class="logo" />
    <div class="text-content">
      <h1 class="heading">Template Translator</h1>
      <p class="description">
        This is a small utility born out of a <a href="https://it.wikivoyage.org/w/index.php?title=Discussioni_utente:Codas&oldid=820893#Citt%C3%A0_Magiche">short discussion</a> on Italian Wikivoyage to
        have a easy (although not beautiful) way to translate wikivoyage templates from one language to another. It does <span class="fw-bold">not</span> translate the text inside the template, 
        but only the template (i.e. the params) itself. On the other side, it can also translate lists of templates as usual in the "Eat", "See", "Do" sections on
        Wikivoyage <a href="https://it.wikivoyage.org/wiki/Speciale:PaginaCasuale">(<em>Random page</em>)</a>
      </p>

    <!--      Now disclaimer for techies-->
      <p class="description">
        <span class="fw-bold">For Nerds:</span> this is a small utility I am writing with TS (Vue3), still WIP. It is really simple: it just parses the input,
        models the template in a ad hoc class using some RegExp, then uses a mapping from the param names
        in the source language to the target language. The mapping is stored in a JSON file.
        Nothing special, but feel free to improve <a href="https://github.com/amasotti/cross-voy-listing-mapper">it here</a>.
        I am thinking if to continue with this approach or rely more on the Mediawiki API + some available parser in Python, Java or Nodejs. This is just meant to be a fist step.
      </p>
    </div>
  </div>
</template>



<style scoped>
.banner-container {
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: #f3f4f6; /* Light grey background */
}

.logo {
  width: 100px; /* Adjust size as needed */
  margin-right: 1rem;
}

.text-content {
  display: flex;
  flex-direction: column;
}

.heading {
  font-size: 1.5rem;
  color: #069; /* Wikivoyage blue */
}

.description {
  font-size: 1rem;
  color: #333; /* Dark grey text */
}
</style>
