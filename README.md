# RdLytics JS

[TOC]

## About this project

This is a test/demo project and aims to demonstrate some development skills with javascript and interactions with a REST API.

## Requirements

For development you may need some nodejs tools:

- nodejs
- npm
- browserfy *(globally installed)*
- watchify *(globally installed)*
- uglifyjs *(globally installed)*

For production you just need to require through npm or just include a buid or build minifyed file from the repository.

## Installing and running

After cloning this repo, follow the steps in your terminal:

```bash
$ npm install
$ npm run watch # for watch&build while developing...
$ npm run build # for both build and build minifyed
```

## Using it

When included in the document, rdlytics-js exposes globally a `rdlytics` object that have some magic included, just follow this steps:

Include rdlytics in your project:

```html
<script src="https://rawgit.com/estudiogenius/rdlytics-js/master/build/rdlytics.min.js"></script>
```

After included you can just `init()`. This way you automagically instantiate a user (if there aren't initialized yet) and make an interaction with the current page:

```html
<script>
	rdlytics.init();
</script>
```

You can also interact manually or even interact sending a contact request as follows:

```html
<script>
	rdlytics.getUser().then(function(user) {
		user.interact('About us - Gallery'); //or
		user.interact(); // default to current page title

		// to create a contact interaction just do:
		user.contact({email: 'user@email-here.com'});
	});
</script>
```

## Licence

This is a simple demo and MUST NOT be utilized by any other circumstances instead of code evaluation.
