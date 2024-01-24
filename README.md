# Wikivoyage Listing Mapper

Small utility to map Wikivoyage listings from one language to another.

Writing guides and nice iteneraries on Wikivoyage is a great way to share your travel experience with other people
and makes a lot of fun! [Try it!](https://en.wikivoyage.org/wiki/Wikivoyage:Welcome,_newcomers

Less fun however is to translate single hotels, restaurants, museums, etc. from one language to another. Most of 
the parameters are the same (latitude, longitude, address, phone number, etc.), but the template names and the
language of the text inside the template are different. This tool helps with the boring part of the translation.

It's hosted on [Toolforge](https://admin.toolforge.org/) under [cross-voy-listing-mapper](https://cross-voy-listing-mapper.toolforge.org/)

It is a small utility requested in [a short discussion](https://it.wikivoyage.org/w/index.php?title=Discussioni_utente:Codas&oldid=820893#Citt%C3%A0_Magiche) on Italian Wikivoyage to have a easy 
(although not beautiful) way to translate wikivoyage templates from one language to another. 
It does not translate the text inside the template, but only the template (i.e. the params) itself. 
On the other side, it can also translate lists of templates as usual in the "Eat", "See", "Do" sections on Wikivoyage ([Random page](https://it.wikivoyage.org/wiki/Speciale:PaginaCasuale))

### Technical details
**For Nerds:** this is a small utility I am writing with TS (Vue3), still WIP. Many differences between languages have to be taken
into account.

It is really simple: it just takes following params from a web form:

- source language: the wikivoayge language you are translating from
- target language: the wikivoyage language you are translating to
- source page: the page you are translating the templates from

and then it uses the [Mediawiki RestAPI](https://www.mediawiki.org/wiki/API:REST_API) to get the page content,
which is parsed via a custom parser utility. The extracted templates are then modelled as Template objects, which are then
translated to the target language via a JSON mapping file. The translated templates are then rendered in a textarea, ready to be copied.

*End of nerd section* :)


