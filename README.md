# Wikivoyage Listing Mapper

Small utility to map Wikivoyage listings from one language to another.
Will be hosted on [Toolforge](https://admin.toolforge.org/).


This is a small utility requested in [a short discussion](https://it.wikivoyage.org/w/index.php?title=Discussioni_utente:Codas&oldid=820893#Citt%C3%A0_Magiche) on Italian Wikivoyage to have a easy 
(although not beautiful) way to translate wikivoyage templates from one language to another. 
It does not translate the text inside the template, but only the template (i.e. the params) itself. 
On the other side, it can also translate lists of templates as usual in the "Eat", "See", "Do" sections on Wikivoyage ([Random page](https://it.wikivoyage.org/wiki/Speciale:PaginaCasuale))


**For Nerds:** this is a small utility I am writing with TS (Vue3), still WIP. Many differences between languages have to be taken
into account.

It is really simple: it just parses the input, models the template in a ad hoc class using some RegExp, 
then uses a mapping from the param names in the source language to the target language. 
The mapping is stored in a JSON file. Nothing special, but feel free to improve it here.
I am thinking if to continue with this approach or rely more on the Mediawiki API + some available parser in Python, Java or Nodejs. 
This is just meant to be a fist step.

