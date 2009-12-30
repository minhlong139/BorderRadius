BORDER RADIUS
===========
![Screenshot](http://img198.imageshack.us/img198/3932/borderradius.png)
BORDER RADIUS: NO CSS, NO IMAGES, MOOTOOLS ONLY!

BorderRadius is a Mootools's Plugin. BorderRadius makes corner more beautiful but does not use External Style Sheet or Images, it uses javascript only

BorderRadius was tested on: 
### Broswer: 
    IE6+, FF3+, Opera9+, Chrome2+, Safari4
### Platform: 
    WindowXP+, Fedora7+, MacOS
	


How to use
----------

### Javascript:
    #JS
	/* initialize */
	$('#box').borderRadius({'radius: 10'});
	/* other way */
	new BorderRadius($('#box'), {'radius': 10});
	
### HTML (property options is optional):
    #HTML
    <div id="box" options="{'radiusBottomRight':0, 'radiusTopLeft':0, 'css3': false}">Border Radius</div>
    
### Options:
    * radiusTopLeft - (integer: defaults to 0) Radius of top left border corner.
    * radiusBottomLeft - (integer: defaults to 0) Radius of bottom left border corner.
    * radiusTopRight - (integer: defaults to 0) Radius of top right border corner.
    * radiusBottomRight - (integer: defaults to 0) Radius of bottom right border corner.
    * radiusTop - (integer: defaults to 0) Radius of top left and top right border corner.
    * radiusBottom - (integer: defaults to 0) Radius of bottom left and bottom right border corner.
    * radius - (integer: defaults to 0) Radius of 4 border corners.
    * parentBgColor - (color: defaults to '#fff') Fix parent element's background color.
    * borderWidth - (integer: defaults to null) Fix border width.
    * borderStyle - (string: defaults to null) Fix border style.
    * borderColor - (color: defaults to null) Fix border color.
    * css3 - (boolean: defaults to true) By default BorderRadius make radius corners by CSS3 if currently browser supported, else BorderRadius create radius corners by itself. If you want to make consitent, set css3 to false
    
What's new?
----------
### Version 1.2:
    - Implement BorderRadius options by html property
    - Specify radius for each corners: top-left, top-right, bottom-left, bottom-right

