BORDER RADIUS
===========

BORDER RADIUS: NO CSS & NO IMAGES.

BorderRadius is a Mootools's Plugin. BorderRadius makes corner more beautiful but does not use External Style Sheet or Images, it uses javascript only

![Screenshot](http://img36.imageshack.us/img36/2576/demof.png)

How to use
----------

1. Include border-radius.js after your mootools-core.js
2. An Element can use borderRadius function to beautier like this:

### Javascript
	/* initialize */
	$('#box').borderRadius({'radius: 10'});
	/* other way */
	new BorderRadius($('#box'), {'radius': 10});
