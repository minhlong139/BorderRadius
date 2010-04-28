/*
---
description: BorderRadius - Mootools plugin to round corners

license: MIT-style license.

authors: 
    - Bui Minh Long (http://minhlong139.plus.vn/) (minhlong139@gmail.com)
    
requires:
    core/1.2.3: '*'
    
provides: [BorderRadius]

...
*/


var BorderRadius = new Class({
  
  Implements: [Options],

  options: {
    radiusTopLeft: 0,
    radiusTopRight: 0,
    radiusTop: 0,
    radiusBottomLeft: 0,
    radiusBottomRight: 0,
    radiusBottom: 0,
    radius: 0,
    borderWidth: null,
    borderStyle: null,
    borderColor: null,
    parentBgColor: '#fff',
    css3: true,
    wrapperClass: 'border-radius-wrapper',
    key: 'border-radius-lDwEgapDpDOIasdlWERSDFxclvkjs234oiSDFSDFsadg@#$098t356sgdlfgjsDFGS@dsfgkyoire'
  },
  
  borderRadier: {},
  
  initialize: function(element, options) {
    this.element = element;
    this.initOptions(options);
    this.build();
  },
  
  initOptions: function(options) {
    var opts = JSON.decode(this.element.getProperty('options'));
    options = $merge(opts, options)
    this.setOptions(options);
    var parentBgColor = this.element.getParent().getStyle('background-color');
    parentBgColor = parentBgColor=='transparent'?this.options.parentBgColor:parentBgColor;
    
    this.options.borderWidth = this.options.borderWidth==null?parseInt(this.element.getStyle('border-top-width')):this.options.borderWidth;
    this.options.borderStyle = this.options.borderStyle==null?this.element.getStyle('border-top-style'):this.options.borderStyle;
    this.options.borderStyle = this.options.borderStyle=='none'?'solid':this.options.borderStyle;
    this.options.borderColor = this.options.borderColor==null?this.element.getStyle('border-top-color'):this.options.borderColor; 
    
    if (options.radius) this.setOptions({
      'radiusBottomLeft': options.radius,
      'radiusTopLeft':    options.radius,
      'radiusBottomRight': options.radius,
      'radiusTopRight':    options.radius
    });
    if (options.radiusTop) this.setOptions({
      'radiusTopLeft':    options.radiusTop,
      'radiusTopRight':    options.radiusTop
    });
    if (options.radiusBottom) this.setOptions({
      'radiusBottomLeft': options.radiusBottom,
      'radiusBottomRight': options.radiusBottom
    });
    ['radiusBottomLeft', 'radiusTopLeft', 'radiusBottomRight', 'radiusTopRight'].each(function(pos) {
      if (options[pos]) this.options[pos] = options[pos];
    }.bind(this));
    this.setOptions({'parentBgColor': parentBgColor});
  },
  
  build: function() {
    if (this.element.hasClass(this.options.key)) return;
    this.element.addClass(this.options.key);
    if (this.options.css3) {
      if (!this.buildByCss3()) this.fixCss3();
    } else {
      this.fixCss3();
    }
  },
  
  wrap: function() {
    var paddingTop = Math.max(parseInt(this.element.getStyle('padding-top')), this.options.radiusTop);
    if (paddingTop>=this.options.radiusTop) paddingTop -= this.options.radiusTop
    this.paddingTop = paddingTop;
    var paddingBottom = Math.max(parseInt(this.element.getStyle('padding-bottom')), this.options.radiusBottom);
    if (paddingBottom>=this.options.radiusBottom) paddingBottom -= this.options.radiusBottom;
    this.paddingBottom = paddingBottom;
    var styles = {
      'padding': this.element.getStyle('padding'),
      'padding-top': paddingTop,
      'padding-bottom': paddingBottom,
      'display': 'block'
    }
    this.wrapper = new Element('div', {'class': this.options.wrapperClass});
    this.wrapper.innerHTML = this.element.innerHTML;
    this.element.innerHTML = '';
    this.wrapper.setStyles(styles).inject(this.element.setStyle('padding', 0), 'bottom');
  },
  
  fixCss3: function() {    
    this.wrap();
    
    var hasBorder = false;
    var position = {'top': {'left': this.options.radiusTopLeft, 'right': this.options.radiusTopRight}, 
                    'bottom': {'left': this.options.radiusBottomLeft, 'right': this.options.radiusBottomRight}};
    
    if (this.options.borderWidth>0) {
      this.element.setStyle('border', 'none');
      hasBorder = true;
      var styles = {        
        'border-width': this.options.borderWidth,
        'border-style': this.options.borderStyle,
        'border-color': this.options.borderColor,
        'background-color': this.element.getStyle('background-color')
      }
      if (this.options.radiusBottomLeft!=0 || this.options.radiusBottomRight!=0) styles['border-bottom'] = 'none';
      if (this.options.radiusTopLeft!=0 || this.options.radiusTopRight!=0) styles['border-top'] = 'none';  
      this.wrapper.setStyles(styles);    
    }
    
    for (var id in position) {
      var el = new Element('div').setStyles({
        'display': 'block'
      });
      el.inject(this.element, id);
      this.borderRadier[id] = el;
      for (var i=0;i<Math.max(position[id].left, position[id].right);i++){
        var roundNumLeft = Math.round(Math.sqrt(Math.max(position[id].left*position[id].left-i*i, 0)));
        var floorNumLeft = Math.floor(Math.sqrt(Math.max(position[id].left*position[id].left-i*i, 0)));
        var roundNumRight = Math.round(Math.sqrt(Math.max(position[id].right*position[id].right-i*i, 0)));
        var floorNumRight = Math.floor(Math.sqrt(Math.max(position[id].right*position[id].right-i*i, 0)));

        var borderLeft = position[id].left==0?0:Math.max(position[id].left - roundNumLeft, 0);
        var borderRight = position[id].right==0?0:Math.max(position[id].right - roundNumRight, 0);
        var bgCornerStyles = {
          'display': 'block',
          'overflow': 'hidden',
          'height': 1,
          'position': 'relative',
          'border-color': this.options.parentBgColor,
          'border-style': 'solid',
          'border-left-width': borderLeft,
          'border-right-width': borderRight,
          'border-top-width': 0,
          'border-bottom-width': 0,
          'background-color': this.element.getStyle('background-color')
        };
        
        var opacityStyles = {
          'height': 1,          
          'border-color': this.options.parentBgColor,
          'border-style': this.options.borderStyle,
          'border-width': '0px 1px'
        };
        var borderStyles = {
          'height': 1,          
          'border-color': this.options.borderColor,
          'border-style': this.options.borderStyle,
          'border-width': '0px ' + this.options.borderWidth+ 'px',
          'border-top-width': i>=Math.max(position[id].left, position[id].right)-this.options.borderWidth?this.options.borderWidth:0
        };
        var bgCorner = (new Element('div', {'class': i})).setStyles(bgCornerStyles)
                                           .inject(el, id);
        // TODO: Make corners more smoothly
        //var opacityBorder = (new Element('div')).setStyles(opacityStyles).setOpacity(0.5).inject(bgCorner);                                 
        if (hasBorder) (new Element('div')).setStyles(borderStyles)
                                           .inject(bgCorner);            
      }            
    }
    this.autoResize();
  },
  
  autoResize: function() {
    var h = 0;
    for (var id in this.borderRadier)
      h+= this.borderRadier[id].getSize().y;
	var height = this.element.getSize().y - h - this.paddingTop - this.paddingBottom;
	if (height>0) this.wrapper.setStyle('height', height);
  },
  
  buildByCss3: function() {
    if (this.checkBorderRadius()) {
      var styles = {
        gecko: {
          '-moz-border-radius-topleft': this.options.radiusTopLeft,
          '-moz-border-radius-topright': this.options.radiusTopRight,
          '-moz-border-radius-bottomleft': this.options.radiusBottomLeft,
          '-moz-border-radius-bottomright': this.options.radiusBottomRight
        },
        webkit: {
          '-webkit-border-top-left-radius': this.options.radiusTopLeft,
          '-webkit-border-top-right-radius': this.options.radiusTopRight,
          '-webkit-border-bottom-left-radius': this.options.radiusBottomLeft,
          '-webkit-border-bottom-right-radius': this.options.radiusBottomRight
        }
      }
      if (styles[Browser.Engine.name]) {
        this.element.setStyles(styles[Browser.Engine.name]);
        return true;
      }
    }    
    return false;  
  },
  
  /*
   * Many thanks to the Arian Stolwijk (http://www.aryweb.nl/) for checkBorderRadius() idea.
   */
  checkBorderRadius: function(){
    var docEl = document.documentElement, s;
    if (docEl && (s = docEl.style)) {
      return (typeof s.borderRadius == 'string'
        || typeof s.MozBorderRadius == 'string'
        || typeof s.WebkitBorderRadius == 'string'
        || typeof s.KhtmlBorderRadius == 'string');
      }
    return null;
  }

});

Element.implement({
  borderRadius: function (options) {    
    var br = new BorderRadius(this, options);
    this.store('br', br);
    return br;
  }
});
