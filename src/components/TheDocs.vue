<script setup lang="ts">
// Script content (if any)
</script>


<template>
  <div class="banner-container">
    <img src="@/assets/voy_bot.png" alt="App Logo" class="logo" />
    <div class="text-content">
      <h1 class="heading">Listing Mapper</h1>
      <p class="description">
        This is a small utility born out of a <a href="https://it.wikivoyage.org/w/index.php?title=Discussioni_utente:Codas&oldid=820893#Citt%C3%A0_Magiche">short discussion</a> on Italian Wikivoyage to
        have a easy (although not beautiful) way to translate wikivoyage templates from one language to another. It does <span class="fw-bold">not</span> translate the text inside the template, 
        but only the template (i.e. the params) itself. On the other side, it can also translate lists of templates as usual in the "Eat", "See", "Do" sections on
        Wikivoyage <a href="https://it.wikivoyage.org/wiki/Speciale:PaginaCasuale">(<em>Random page</em>)</a>
      </p>
      <p class="fst-italic">At moment the tool only supports translation / mapping from English to Italian. If you would like to have more language, <a href="https://it.wikivoyage.org/wiki/Discussioni_utente:Nastoshka">let me know.</a></p>

    <!--      Now disclaimer for techies-->
      <p class="description">
        <span class="fw-bold">For Nerds:</span> this is a small utility I am writing with TS (Vue3), still WIP. It is really simple: it just
        downloads the page using the Mediawiki API, parses it with help of some small parser utilities, that extract the templates and then
        builds the new template in the target language.
        Nothing special, and for sure not bug-free, but feel free to test it and improve <a href="https://github.com/amasotti/cross-voy-listing-mapper">it here</a> or leave a feedback.
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
