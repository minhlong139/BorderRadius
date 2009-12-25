/*
---
name: BorderRadius

verson: 1.0

description: BorderRadius - Mootools plugin to round corners

license: MIT-style

authors: Long Bui Minh (http://minhlong139.plus.vn/) (minhlong139@gmail.com)

requires:
- core:1.2: 
- Element.Style
- Utilities.Selectors

provides: [Element, Elements, $, $$]

category: Interface

tags: [border, corner, radius]
docs: http://minhlong139.plus.vn/BorderRadius/docs/
demo: http://minhlong139.plus.vn/BorderRadius/demo/
current: 1.0

*/

var BorderRadius = new Class({
  
  Implements: [Options],

  options: {
    parentBgColor: '#fff',
    radiusTop: 0,
    radiusBottom: 0,
    radius: 0,
    borderWidth: null,
    borderStyle: null,
    borderColor: null,
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
    this.setOptions(options);
    var parentBgColor = this.element.getParent().getStyle('background-color');
    parentBgColor = parentBgColor=='transparent'?this.options.parentBgColor:parentBgColor;
    
    this.options.borderWidth = this.options.borderWidth==null?parseInt(this.element.getStyle('border-top-width')):this.options.borderWidth;
    this.options.borderStyle = this.options.borderStyle==null?this.element.getStyle('border-top-style'):this.options.borderStyle;
    this.options.borderStyle = this.options.borderStyle=='none'?'solid':this.options.borderStyle;
    this.options.borderColor = this.options.borderColor==null?this.element.getStyle('border-top-color'):this.options.borderColor; 
    
    if (this.options.radius) this.setOptions({
      'radiusBottom': this.options.radius,
      'radiusTop':    this.options.radius
    });
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
    var position = {'top': this.options.radiusTop, 'bottom': this.options.radiusBottom};
    
    if (this.options.borderWidth>0) {
      this.element.setStyle('border', 'none');
      hasBorder = true;
      var styles = {        
        'border-width': this.options.borderWidth,
        'border-style': this.options.borderStyle,
        'border-color': this.options.borderColor,
        'background-color': this.element.getStyle('background-color')
      }
      if (this.options.radiusBottom!=0) styles['border-bottom'] = 'none';
      if (this.options.radiusTop!=0) styles['border-top'] = 'none';  
      this.wrapper.setStyles(styles);    
    }
    
    for (var id in position) {
      var el = new Element('div').setStyles({
        'display': 'block'
      });
      el.inject(this.element, id);
      this.borderRadier[id] = el;
      for (var i=0;i<position[id];i++){
        var border = position[id] - Math.round(Math.sqrt(position[id]*position[id]-i*i));
        var bgCornerStyles = {
          'display': 'block',
          'overflow': 'hidden',
          'height': 1,
          'border-color': this.options.parentBgColor,
          'border-style': 'solid',
          'border-width': '0px ' + border + 'px',
          'background-color': this.element.getStyle('background-color')
        };
        var borderStyles = {
          'height': 1,          
          'border-color': this.options.borderColor,
          'border-style': this.options.borderStyle,
          'border-width': '0px ' + this.options.borderWidth+ 'px',
          'border-top-width': i>=position[id]-this.options.borderWidth?this.options.borderWidth:0
        };
        var bgCorner = (new Element('div')).setStyles(bgCornerStyles)
                                           .inject(el, id);
        if (hasBorder) (new Element('div')).setStyles(borderStyles)
                                           .inject(bgCorner);            
      }            
    }
    this.autoResize();
  },
  
  autoResize: function() {
    var h = 0;
    for (var id in this.borderRadier)
      h+= this.borderRadier[id].clientHeight;
    this.wrapper.setStyle('height', this.element.clientHeight - h - this.paddingTop - this.paddingBottom);
  },
  
  buildByCss3: function() {    
    if (Browser.Engine.gecko || Browser.Engine.webkit) {
      var engine = Browser.Engine.gecko?'gecko':'webkit';      
      var styles = {
        gecko: {
          '-moz-border-radius-topleft': this.options.radiusTop,
          '-moz-border-radius-topright': this.options.radiusTop,
          '-moz-border-radius-bottomleft': this.options.radiusBottom,
          '-moz-border-radius-bottomright': this.options.radiusBottom
        },
        webkit: {
          '-webkit-border-top-left-radius': this.options.radiusTop,
          '-webkit-border-top-right-radius': this.options.radiusTop,
          '-webkit-border-bottom-left-radius': this.options.radiusBottom,
          '-webkit-border-bottom-right-radius': this.options.radiusBottom
        }
      }
      this.element.setStyles(styles[engine]);
      return true;
    } else {
      return false;  
    }
  }
});

Element.implement({
  borderRadius: function (options) {
    var opts = JSON.decode(this.getProperty('options'));
    var br = new BorderRadius(this, $merge(opts, options));
    this.store('br', br);
    return br;
  }
});
