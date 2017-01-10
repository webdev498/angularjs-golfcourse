/**
 * jQuery Cookie Plugin v
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2006, 2014 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define([''], factory);
	} else if (typeof exports === 'object') {
		// CommonJS
		factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}

	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}

	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}

	var config = $.cookie = function (key, value, options) {

		// Write

		if (arguments.length > 1 && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setTime(+t + days * 864e+5);
			}

			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// Read

		var result = key ? undefined : {};

		// To prevent the for loop in the first place assign an empty array
		// in case there are no cookies at all. Also prevents odd result when
		// calling $.cookie().
		var cookies = document.cookie ? document.cookie.split('; ') : [];

		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = parts.join('=');

			if (key && key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}

			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		if ($.cookie(key) === undefined) {
			return false;
		}

		// Must not alter options, thus extending a fresh object...
		$.cookie(key, '', $.extend({}, options, { expires: -1 }));
		return !$.cookie(key);
	};

}));
/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */
/**
 * jQuery Mobile v1.4.3
 * http://jquerymobile.com
 *
 * Copyright 2010, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * Custom: TOUCH SUPPORT
 *
 */

(function ( root, doc, factory ) {
	if ( typeof define === "function" && define.amd ) {
		// AMD. Register as an anonymous module.
		define( [ "" ], function ( $ ) {
			factory( $, root, doc );
			return $.mobile;
		});
	} else {
		// Browser globals
		factory( root.jQuery, root, doc );
	}
}( this, document, function ( jQuery, window, document, undefined ) {// This plugin is an experiment for abstracting away the touch and mouse
// events so that developers don't have to worry about which method of input
// the device their document is loaded on supports.
//
// The idea here is to allow the developer to register listeners for the
// basic mouse events, such as mousedown, mousemove, mouseup, and click,
// and the plugin will take care of registering the correct listeners
// behind the scenes to invoke the listener at the fastest possible time
// for that device, while still retaining the order of event firing in
// the traditional mouse environment, should multiple handlers be registered
// on the same element for different events.
//
// The current version exposes the following virtual events to jQuery bind methods:
// "vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel"

	(function( $, window, document, undefined ) {

		var dataPropertyName = "virtualMouseBindings",
			touchTargetPropertyName = "virtualTouchID",
			virtualEventNames = "vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel".split( " " ),
			touchEventProps = "clientX clientY pageX pageY screenX screenY".split( " " ),
			mouseHookProps = $.event.mouseHooks ? $.event.mouseHooks.props : [],
			mouseEventProps = $.event.props.concat( mouseHookProps ),
			activeDocHandlers = {},
			resetTimerID = 0,
			startX = 0,
			startY = 0,
			didScroll = false,
			clickBlockList = [],
			blockMouseTriggers = false,
			blockTouchTriggers = false,
			eventCaptureSupported = "addEventListener" in document,
			$document = $( document ),
			nextTouchID = 1,
			lastTouchID = 0, threshold,
			i;

		$.vmouse = {
			moveDistanceThreshold: 10,
			clickDistanceThreshold: 10,
			resetTimerDuration: 1500
		};

		function getNativeEvent( event ) {

			while ( event && typeof event.originalEvent !== "undefined" ) {
				event = event.originalEvent;
			}
			return event;
		}

		function createVirtualEvent( event, eventType ) {

			var t = event.type,
				oe, props, ne, prop, ct, touch, i, j, len;

			event = $.Event( event );
			event.type = eventType;

			oe = event.originalEvent;
			props = $.event.props;

			// addresses separation of $.event.props in to $.event.mouseHook.props and Issue 3280
			// https://github.com/jquery/jquery-mobile/issues/3280
			if ( t.search( /^(mouse|click)/ ) > -1 ) {
				props = mouseEventProps;
			}

			// copy original event properties over to the new event
			// this would happen if we could call $.event.fix instead of $.Event
			// but we don't have a way to force an event to be fixed multiple times
			if ( oe ) {
				for ( i = props.length, prop; i; ) {
					prop = props[ --i ];
					event[ prop ] = oe[ prop ];
				}
			}

			// make sure that if the mouse and click virtual events are generated
			// without a .which one is defined
			if ( t.search(/mouse(down|up)|click/) > -1 && !event.which ) {
				event.which = 1;
			}

			if ( t.search(/^touch/) !== -1 ) {
				ne = getNativeEvent( oe );
				t = ne.touches;
				ct = ne.changedTouches;
				touch = ( t && t.length ) ? t[0] : ( ( ct && ct.length ) ? ct[ 0 ] : undefined );

				if ( touch ) {
					for ( j = 0, len = touchEventProps.length; j < len; j++) {
						prop = touchEventProps[ j ];
						event[ prop ] = touch[ prop ];
					}
				}
			}

			return event;
		}

		function getVirtualBindingFlags( element ) {

			var flags = {},
				b, k;

			while ( element ) {

				b = $.data( element, dataPropertyName );

				for (  k in b ) {
					if ( b[ k ] ) {
						flags[ k ] = flags.hasVirtualBinding = true;
					}
				}
				element = element.parentNode;
			}
			return flags;
		}

		function getClosestElementWithVirtualBinding( element, eventType ) {
			var b;
			while ( element ) {

				b = $.data( element, dataPropertyName );

				if ( b && ( !eventType || b[ eventType ] ) ) {
					return element;
				}
				element = element.parentNode;
			}
			return null;
		}

		function enableTouchBindings() {
			blockTouchTriggers = false;
		}

		function disableTouchBindings() {
			blockTouchTriggers = true;
		}

		function enableMouseBindings() {
			lastTouchID = 0;
			clickBlockList.length = 0;
			blockMouseTriggers = false;

			// When mouse bindings are enabled, our
			// touch bindings are disabled.
			disableTouchBindings();
		}

		function disableMouseBindings() {
			// When mouse bindings are disabled, our
			// touch bindings are enabled.
			enableTouchBindings();
		}

		function startResetTimer() {
			clearResetTimer();
			resetTimerID = setTimeout( function() {
				resetTimerID = 0;
				enableMouseBindings();
			}, $.vmouse.resetTimerDuration );
		}

		function clearResetTimer() {
			if ( resetTimerID ) {
				clearTimeout( resetTimerID );
				resetTimerID = 0;
			}
		}

		function triggerVirtualEvent( eventType, event, flags ) {
			var ve;

			if ( ( flags && flags[ eventType ] ) ||
				( !flags && getClosestElementWithVirtualBinding( event.target, eventType ) ) ) {

				ve = createVirtualEvent( event, eventType );

				$( event.target).trigger( ve );
			}

			return ve;
		}

		function mouseEventCallback( event ) {
			var touchID = $.data( event.target, touchTargetPropertyName ),
				ve;

			if ( !blockMouseTriggers && ( !lastTouchID || lastTouchID !== touchID ) ) {
				ve = triggerVirtualEvent( "v" + event.type, event );
				if ( ve ) {
					if ( ve.isDefaultPrevented() ) {
						event.preventDefault();
					}
					if ( ve.isPropagationStopped() ) {
						event.stopPropagation();
					}
					if ( ve.isImmediatePropagationStopped() ) {
						event.stopImmediatePropagation();
					}
				}
			}
		}

		function handleTouchStart( event ) {

			var touches = getNativeEvent( event ).touches,
				target, flags, t;

			if ( touches && touches.length === 1 ) {

				target = event.target;
				flags = getVirtualBindingFlags( target );

				if ( flags.hasVirtualBinding ) {

					lastTouchID = nextTouchID++;
					$.data( target, touchTargetPropertyName, lastTouchID );

					clearResetTimer();

					disableMouseBindings();
					didScroll = false;

					t = getNativeEvent( event ).touches[ 0 ];
					startX = t.pageX;
					startY = t.pageY;

					triggerVirtualEvent( "vmouseover", event, flags );
					triggerVirtualEvent( "vmousedown", event, flags );
				}
			}
		}

		function handleScroll( event ) {
			if ( blockTouchTriggers ) {
				return;
			}

			if ( !didScroll ) {
				triggerVirtualEvent( "vmousecancel", event, getVirtualBindingFlags( event.target ) );
			}

			didScroll = true;
			startResetTimer();
		}

		function handleTouchMove( event ) {
			if ( blockTouchTriggers ) {
				return;
			}

			var t = getNativeEvent( event ).touches[ 0 ],
				didCancel = didScroll,
				moveThreshold = $.vmouse.moveDistanceThreshold,
				flags = getVirtualBindingFlags( event.target );

			didScroll = didScroll ||
				( Math.abs( t.pageX - startX ) > moveThreshold ||
					Math.abs( t.pageY - startY ) > moveThreshold );

			if ( didScroll && !didCancel ) {
				triggerVirtualEvent( "vmousecancel", event, flags );
			}

			triggerVirtualEvent( "vmousemove", event, flags );
			startResetTimer();
		}

		function handleTouchEnd( event ) {
			if ( blockTouchTriggers ) {
				return;
			}

			disableTouchBindings();

			var flags = getVirtualBindingFlags( event.target ),
				ve, t;
			triggerVirtualEvent( "vmouseup", event, flags );

			if ( !didScroll ) {
				ve = triggerVirtualEvent( "vclick", event, flags );
				if ( ve && ve.isDefaultPrevented() ) {
					// The target of the mouse events that follow the touchend
					// event don't necessarily match the target used during the
					// touch. This means we need to rely on coordinates for blocking
					// any click that is generated.
					t = getNativeEvent( event ).changedTouches[ 0 ];
					clickBlockList.push({
						touchID: lastTouchID,
						x: t.clientX,
						y: t.clientY
					});

					// Prevent any mouse events that follow from triggering
					// virtual event notifications.
					blockMouseTriggers = true;
				}
			}
			triggerVirtualEvent( "vmouseout", event, flags);
			didScroll = false;

			startResetTimer();
		}

		function hasVirtualBindings( ele ) {
			var bindings = $.data( ele, dataPropertyName ),
				k;

			if ( bindings ) {
				for ( k in bindings ) {
					if ( bindings[ k ] ) {
						return true;
					}
				}
			}
			return false;
		}

		function dummyMouseHandler() {}

		function getSpecialEventObject( eventType ) {
			var realType = eventType.substr( 1 );

			return {
				setup: function(/* data, namespace */) {
					// If this is the first virtual mouse binding for this element,
					// add a bindings object to its data.

					if ( !hasVirtualBindings( this ) ) {
						$.data( this, dataPropertyName, {} );
					}

					// If setup is called, we know it is the first binding for this
					// eventType, so initialize the count for the eventType to zero.
					var bindings = $.data( this, dataPropertyName );
					bindings[ eventType ] = true;

					// If this is the first virtual mouse event for this type,
					// register a global handler on the document.

					activeDocHandlers[ eventType ] = ( activeDocHandlers[ eventType ] || 0 ) + 1;

					if ( activeDocHandlers[ eventType ] === 1 ) {
						$document.bind( realType, mouseEventCallback );
					}

					// Some browsers, like Opera Mini, won't dispatch mouse/click events
					// for elements unless they actually have handlers registered on them.
					// To get around this, we register dummy handlers on the elements.

					$( this ).bind( realType, dummyMouseHandler );

					// For now, if event capture is not supported, we rely on mouse handlers.
					if ( eventCaptureSupported ) {
						// If this is the first virtual mouse binding for the document,
						// register our touchstart handler on the document.

						activeDocHandlers[ "touchstart" ] = ( activeDocHandlers[ "touchstart" ] || 0) + 1;

						if ( activeDocHandlers[ "touchstart" ] === 1 ) {
							$document.bind( "touchstart", handleTouchStart )
								.bind( "touchend", handleTouchEnd )

								// On touch platforms, touching the screen and then dragging your finger
								// causes the window content to scroll after some distance threshold is
								// exceeded. On these platforms, a scroll prevents a click event from being
								// dispatched, and on some platforms, even the touchend is suppressed. To
								// mimic the suppression of the click event, we need to watch for a scroll
								// event. Unfortunately, some platforms like iOS don't dispatch scroll
								// events until *AFTER* the user lifts their finger (touchend). This means
								// we need to watch both scroll and touchmove events to figure out whether
								// or not a scroll happenens before the touchend event is fired.

								.bind( "touchmove", handleTouchMove )
								.bind( "scroll", handleScroll );
						}
					}
				},

				teardown: function(/* data, namespace */) {
					// If this is the last virtual binding for this eventType,
					// remove its global handler from the document.

					--activeDocHandlers[ eventType ];

					if ( !activeDocHandlers[ eventType ] ) {
						$document.unbind( realType, mouseEventCallback );
					}

					if ( eventCaptureSupported ) {
						// If this is the last virtual mouse binding in existence,
						// remove our document touchstart listener.

						--activeDocHandlers[ "touchstart" ];

						if ( !activeDocHandlers[ "touchstart" ] ) {
							$document.unbind( "touchstart", handleTouchStart )
								.unbind( "touchmove", handleTouchMove )
								.unbind( "touchend", handleTouchEnd )
								.unbind( "scroll", handleScroll );
						}
					}

					var $this = $( this ),
						bindings = $.data( this, dataPropertyName );

					// teardown may be called when an element was
					// removed from the DOM. If this is the case,
					// jQuery core may have already stripped the element
					// of any data bindings so we need to check it before
					// using it.
					if ( bindings ) {
						bindings[ eventType ] = false;
					}

					// Unregister the dummy event handler.

					$this.unbind( realType, dummyMouseHandler );

					// If this is the last virtual mouse binding on the
					// element, remove the binding data from the element.

					if ( !hasVirtualBindings( this ) ) {
						$this.removeData( dataPropertyName );
					}
				}
			};
		}

// Expose our custom events to the jQuery bind/unbind mechanism.

		for ( i = 0; i < virtualEventNames.length; i++ ) {
			$.event.special[ virtualEventNames[ i ] ] = getSpecialEventObject( virtualEventNames[ i ] );
		}

// Add a capture click handler to block clicks.
// Note that we require event capture support for this so if the device
// doesn't support it, we punt for now and rely solely on mouse events.
		if ( eventCaptureSupported ) {
			document.addEventListener( "click", function( e ) {
				var cnt = clickBlockList.length,
					target = e.target,
					x, y, ele, i, o, touchID;

				if ( cnt ) {
					x = e.clientX;
					y = e.clientY;
					threshold = $.vmouse.clickDistanceThreshold;

					// The idea here is to run through the clickBlockList to see if
					// the current click event is in the proximity of one of our
					// vclick events that had preventDefault() called on it. If we find
					// one, then we block the click.
					//
					// Why do we have to rely on proximity?
					//
					// Because the target of the touch event that triggered the vclick
					// can be different from the target of the click event synthesized
					// by the browser. The target of a mouse/click event that is synthesized
					// from a touch event seems to be implementation specific. For example,
					// some browsers will fire mouse/click events for a link that is near
					// a touch event, even though the target of the touchstart/touchend event
					// says the user touched outside the link. Also, it seems that with most
					// browsers, the target of the mouse/click event is not calculated until the
					// time it is dispatched, so if you replace an element that you touched
					// with another element, the target of the mouse/click will be the new
					// element underneath that point.
					//
					// Aside from proximity, we also check to see if the target and any
					// of its ancestors were the ones that blocked a click. This is necessary
					// because of the strange mouse/click target calculation done in the
					// Android 2.1 browser, where if you click on an element, and there is a
					// mouse/click handler on one of its ancestors, the target will be the
					// innermost child of the touched element, even if that child is no where
					// near the point of touch.

					ele = target;

					while ( ele ) {
						for ( i = 0; i < cnt; i++ ) {
							o = clickBlockList[ i ];
							touchID = 0;

							if ( ( ele === target && Math.abs( o.x - x ) < threshold && Math.abs( o.y - y ) < threshold ) ||
								$.data( ele, touchTargetPropertyName ) === o.touchID ) {
								// XXX: We may want to consider removing matches from the block list
								//      instead of waiting for the reset timer to fire.
								e.preventDefault();
								e.stopPropagation();
								return;
							}
						}
						ele = ele.parentNode;
					}
				}
			}, true);
		}
	})( jQuery, window, document );

	(function( $ ) {
		$.mobile = {};
	}( jQuery ));

	(function( $, undefined ) {
		var support = {
			touch: "ontouchend" in document
		};

		$.mobile.support = $.mobile.support || {};
		$.extend( $.support, support );
		$.extend( $.mobile.support, support );
	}( jQuery ));


	(function( $, window, undefined ) {
		var $document = $( document ),
			supportTouch = $.mobile.support.touch,
			scrollEvent = "touchmove scroll",
			touchStartEvent = supportTouch ? "touchstart" : "mousedown",
			touchStopEvent = supportTouch ? "touchend" : "mouseup",
			touchMoveEvent = supportTouch ? "touchmove" : "mousemove";

		// setup new event shortcuts
		$.each( ( "touchstart touchmove touchend " +
			"tap taphold " +
			"swipe swipeleft swiperight " +
			"scrollstart scrollstop" ).split( " " ), function( i, name ) {

			$.fn[ name ] = function( fn ) {
				return fn ? this.bind( name, fn ) : this.trigger( name );
			};

			// jQuery < 1.8
			if ( $.attrFn ) {
				$.attrFn[ name ] = true;
			}
		});

		function triggerCustomEvent( obj, eventType, event, bubble ) {
			var originalType = event.type;
			event.type = eventType;
			if ( bubble ) {
				$.event.trigger( event, undefined, obj );
			} else {
				$.event.dispatch.call( obj, event );
			}
			event.type = originalType;
		}

		// also handles scrollstop
		$.event.special.scrollstart = {

			enabled: true,
			setup: function() {

				var thisObject = this,
					$this = $( thisObject ),
					scrolling,
					timer;

				function trigger( event, state ) {
					scrolling = state;
					triggerCustomEvent( thisObject, scrolling ? "scrollstart" : "scrollstop", event );
				}

				// iPhone triggers scroll after a small delay; use touchmove instead
				$this.bind( scrollEvent, function( event ) {

					if ( !$.event.special.scrollstart.enabled ) {
						return;
					}

					if ( !scrolling ) {
						trigger( event, true );
					}

					clearTimeout( timer );
					timer = setTimeout( function() {
						trigger( event, false );
					}, 50 );
				});
			},
			teardown: function() {
				$( this ).unbind( scrollEvent );
			}
		};

		// also handles taphold
		$.event.special.tap = {
			tapholdThreshold: 750,
			emitTapOnTaphold: true,
			setup: function() {
				var thisObject = this,
					$this = $( thisObject ),
					isTaphold = false;

				$this.bind( "vmousedown", function( event ) {
					isTaphold = false;
					if ( event.which && event.which !== 1 ) {
						return false;
					}

					var origTarget = event.target,
						timer;

					function clearTapTimer() {
						clearTimeout( timer );
					}

					function clearTapHandlers() {
						clearTapTimer();

						$this.unbind( "vclick", clickHandler )
							.unbind( "vmouseup", clearTapTimer );
						$document.unbind( "vmousecancel", clearTapHandlers );
					}

					function clickHandler( event ) {
						clearTapHandlers();

						// ONLY trigger a 'tap' event if the start target is
						// the same as the stop target.
						if ( !isTaphold && origTarget === event.target ) {
							triggerCustomEvent( thisObject, "tap", event );
						} else if ( isTaphold ) {
							event.preventDefault();
						}
					}

					$this.bind( "vmouseup", clearTapTimer )
						.bind( "vclick", clickHandler );
					$document.bind( "vmousecancel", clearTapHandlers );

					timer = setTimeout( function() {
						if ( !$.event.special.tap.emitTapOnTaphold ) {
							isTaphold = true;
						}
						triggerCustomEvent( thisObject, "taphold", $.Event( "taphold", { target: origTarget } ) );
					}, $.event.special.tap.tapholdThreshold );
				});
			},
			teardown: function() {
				$( this ).unbind( "vmousedown" ).unbind( "vclick" ).unbind( "vmouseup" );
				$document.unbind( "vmousecancel" );
			}
		};

		// Also handles swipeleft, swiperight
		$.event.special.swipe = {

			// More than this horizontal displacement, and we will suppress scrolling.
			scrollSupressionThreshold: 30,

			// More time than this, and it isn't a swipe.
			durationThreshold: 1000,

			// Swipe horizontal displacement must be more than this.
			horizontalDistanceThreshold: 30,

			// Swipe vertical displacement must be less than this.
			verticalDistanceThreshold: 30,

			getLocation: function ( event ) {
				var winPageX = window.pageXOffset,
					winPageY = window.pageYOffset,
					x = event.clientX,
					y = event.clientY;

				if ( event.pageY === 0 && Math.floor( y ) > Math.floor( event.pageY ) ||
					event.pageX === 0 && Math.floor( x ) > Math.floor( event.pageX ) ) {

					// iOS4 clientX/clientY have the value that should have been
					// in pageX/pageY. While pageX/page/ have the value 0
					x = x - winPageX;
					y = y - winPageY;
				} else if ( y < ( event.pageY - winPageY) || x < ( event.pageX - winPageX ) ) {

					// Some Android browsers have totally bogus values for clientX/Y
					// when scrolling/zooming a page. Detectable since clientX/clientY
					// should never be smaller than pageX/pageY minus page scroll
					x = event.pageX - winPageX;
					y = event.pageY - winPageY;
				}

				return {
					x: x,
					y: y
				};
			},

			start: function( event ) {
				var data = event.originalEvent.touches ?
						event.originalEvent.touches[ 0 ] : event,
					location = $.event.special.swipe.getLocation( data );
				return {
					time: ( new Date() ).getTime(),
					coords: [ location.x, location.y ],
					origin: $( event.target )
				};
			},

			stop: function( event ) {
				var data = event.originalEvent.touches ?
						event.originalEvent.touches[ 0 ] : event,
					location = $.event.special.swipe.getLocation( data );
				return {
					time: ( new Date() ).getTime(),
					coords: [ location.x, location.y ]
				};
			},

			handleSwipe: function( start, stop, thisObject, origTarget ) {
				if ( stop.time - start.time < $.event.special.swipe.durationThreshold &&
					Math.abs( start.coords[ 0 ] - stop.coords[ 0 ] ) > $.event.special.swipe.horizontalDistanceThreshold &&
					Math.abs( start.coords[ 1 ] - stop.coords[ 1 ] ) < $.event.special.swipe.verticalDistanceThreshold ) {
					var direction = start.coords[0] > stop.coords[ 0 ] ? "swipeleft" : "swiperight";

					triggerCustomEvent( thisObject, "swipe", $.Event( "swipe", { target: origTarget, swipestart: start, swipestop: stop }), true );
					triggerCustomEvent( thisObject, direction,$.Event( direction, { target: origTarget, swipestart: start, swipestop: stop } ), true );
					return true;
				}
				return false;

			},

			// This serves as a flag to ensure that at most one swipe event event is
			// in work at any given time
			eventInProgress: false,

			setup: function() {
				var events,
					thisObject = this,
					$this = $( thisObject ),
					context = {};

				// Retrieve the events data for this element and add the swipe context
				events = $.data( this, "mobile-events" );
				if ( !events ) {
					events = { length: 0 };
					$.data( this, "mobile-events", events );
				}
				events.length++;
				events.swipe = context;

				context.start = function( event ) {

					// Bail if we're already working on a swipe event
					if ( $.event.special.swipe.eventInProgress ) {
						return;
					}
					$.event.special.swipe.eventInProgress = true;

					var stop,
						start = $.event.special.swipe.start( event ),
						origTarget = event.target,
						emitted = false;

					context.move = function( event ) {
						if ( !start ) {
							return;
						}

						stop = $.event.special.swipe.stop( event );
						if ( !emitted ) {
							emitted = $.event.special.swipe.handleSwipe( start, stop, thisObject, origTarget );
							if ( emitted ) {

								// Reset the context to make way for the next swipe event
								$.event.special.swipe.eventInProgress = false;
							}
						}
						// prevent scrolling
						if ( Math.abs( start.coords[ 0 ] - stop.coords[ 0 ] ) > $.event.special.swipe.scrollSupressionThreshold ) {
							event.preventDefault();
						}
					};

					context.stop = function() {
						emitted = true;

						// Reset the context to make way for the next swipe event
						$.event.special.swipe.eventInProgress = false;
						$document.off( touchMoveEvent, context.move );
						context.move = null;
					};

					$document.on( touchMoveEvent, context.move )
						.one( touchStopEvent, context.stop );
				};
				$this.on( touchStartEvent, context.start );
			},

			teardown: function() {
				var events, context;

				events = $.data( this, "mobile-events" );
				if ( events ) {
					context = events.swipe;
					delete events.swipe;
					events.length--;
					if ( events.length === 0 ) {
						$.removeData( this, "mobile-events" );
					}
				}

				if ( context ) {
					if ( context.start ) {
						$( this ).off( touchStartEvent, context.start );
					}
					if ( context.move ) {
						$document.off( touchMoveEvent, context.move );
					}
					if ( context.stop ) {
						$document.off( touchStopEvent, context.stop );
					}
				}
			}
		};
		$.each({
			scrollstop: "scrollstart",
			taphold: "tap",
			swipeleft: "swipe.left",
			swiperight: "swipe.right"
		}, function( event, sourceEvent ) {

			$.event.special[ event ] = {
				setup: function() {
					$( this ).bind( sourceEvent, $.noop );
				},
				teardown: function() {
					$( this ).unbind( sourceEvent );
				}
			};
		});

	})( jQuery, this );


}));

/*
 * jQuery css bezier animation support -- Jonah Fox
 * version 0.0.1
 * Released under the MIT license.
 */
/*
 var path = $.path.bezier({
 start: {x:10, y:10, angle: 20, length: 0.3},
 end:   {x:20, y:30, angle: -20, length: 0.2}
 })
 $("myobj").animate({path: path}, duration)
 */

;(function($){

	$.path = {};

	var V = {
		rotate: function(p, degrees) {
			var radians = degrees * Math.PI / 180,
				c = Math.cos(radians),
				s = Math.sin(radians);
			return [c*p[0] - s*p[1], s*p[0] + c*p[1]];
		},
		scale: function(p, n) {
			return [n*p[0], n*p[1]];
		},
		add: function(a, b) {
			return [a[0]+b[0], a[1]+b[1]];
		},
		minus: function(a, b) {
			return [a[0]-b[0], a[1]-b[1]];
		}
	};

	$.path.bezier = function( params, rotate ) {
		params.start = $.extend( {angle: 0, length: 0.3333}, params.start );
		params.end = $.extend( {angle: 0, length: 0.3333}, params.end );

		this.p1 = [params.start.x, params.start.y];
		this.p4 = [params.end.x, params.end.y];

		var v14 = V.minus( this.p4, this.p1 ),
			v12 = V.scale( v14, params.start.length ),
			v41 = V.scale( v14, -1 ),
			v43 = V.scale( v41, params.end.length );

		v12 = V.rotate( v12, params.start.angle );
		this.p2 = V.add( this.p1, v12 );

		v43 = V.rotate(v43, params.end.angle );
		this.p3 = V.add( this.p4, v43 );

		this.f1 = function(t) { return (t*t*t); };
		this.f2 = function(t) { return (3*t*t*(1-t)); };
		this.f3 = function(t) { return (3*t*(1-t)*(1-t)); };
		this.f4 = function(t) { return ((1-t)*(1-t)*(1-t)); };

		/* p from 0 to 1 */
		this.css = function(p) {
			var f1 = this.f1(p), f2 = this.f2(p), f3 = this.f3(p), f4=this.f4(p), css = {};
			if (rotate) {
				css.prevX = this.x;
				css.prevY = this.y;
			}
			css.x = this.x = ( this.p1[0]*f1 + this.p2[0]*f2 +this.p3[0]*f3 + this.p4[0]*f4 +.5 )|0;
			css.y = this.y = ( this.p1[1]*f1 + this.p2[1]*f2 +this.p3[1]*f3 + this.p4[1]*f4 +.5 )|0;
			css.left = css.x + "px";
			css.top = css.y + "px";
			return css;
		};
	};

	$.path.arc = function(params, rotate) {
		for ( var i in params ) {
			this[i] = params[i];
		}

		this.dir = this.dir || 1;

		while ( this.start > this.end && this.dir > 0 ) {
			this.start -= 360;
		}

		while ( this.start < this.end && this.dir < 0 ) {
			this.start += 360;
		}

		this.css = function(p) {
			var a = ( this.start * (p ) + this.end * (1-(p )) ) * Math.PI / 180,
				css = {};

			if (rotate) {
				css.prevX = this.x;
				css.prevY = this.y;
			}
			css.x = this.x = ( Math.sin(a) * this.radius + this.center[0] +.5 )|0;
			css.y = this.y = ( Math.cos(a) * this.radius + this.center[1] +.5 )|0;
			css.left = css.x + "px";
			css.top = css.y + "px";
			return css;
		};
	};

	$.fx.step.path = function(fx) {
		var css = fx.end.css( 1 - fx.pos );
		if ( css.prevX != null ) {
			$.cssHooks.transform.set( fx.elem, "rotate(" + Math.atan2(css.prevY - css.y, css.prevX - css.x) + ")" );
		}
		fx.elem.style.top = css.top;
		fx.elem.style.left = css.left;
	};

})(jQuery);
/**
 * jQuery.scrollTo
 * Copyright (c) 2007-2014 Ariel Flesler - aflesler<a>gmail<d>com | http://flesler.blogspot.com
 * Licensed under MIT
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 * @author Ariel Flesler
 * @version 1.4.13
 */
(function (define) {
	'use strict';

	define([''], function ($) {

		var $scrollTo = $.scrollTo = function( target, duration, settings ) {
			return $(window).scrollTo( target, duration, settings );
		};

		$scrollTo.defaults = {
			axis:'xy',
			duration: parseFloat($.fn.jquery) >= 1.3 ? 0 : 1,
			limit:true
		};

		// Returns the element that needs to be animated to scroll the window.
		// Kept for backwards compatibility (specially for localScroll & serialScroll)
		$scrollTo.window = function( scope ) {
			return $(window)._scrollable();
		};

		// Hack, hack, hack :)
		// Returns the real elements to scroll (supports window/iframes, documents and regular nodes)
		$.fn._scrollable = function() {
			return this.map(function() {
				var elem = this,
					isWin = !elem.nodeName || $.inArray( elem.nodeName.toLowerCase(), ['iframe','#document','html','body'] ) != -1;

				if (!isWin)
					return elem;

				var doc = (elem.contentWindow || elem).document || elem.ownerDocument || elem;

				return /webkit/i.test(navigator.userAgent) || doc.compatMode == 'BackCompat' ?
					doc.body :
					doc.documentElement;
			});
		};

		$.fn.scrollTo = function( target, duration, settings ) {
			if (typeof duration == 'object') {
				settings = duration;
				duration = 0;
			}
			if (typeof settings == 'function')
				settings = { onAfter:settings };

			if (target == 'max')
				target = 9e9;

			settings = $.extend( {}, $scrollTo.defaults, settings );
			// Speed is still recognized for backwards compatibility
			duration = duration || settings.duration;
			// Make sure the settings are given right
			settings.queue = settings.queue && settings.axis.length > 1;

			if (settings.queue)
			// Let's keep the overall duration
				duration /= 2;
			settings.offset = both( settings.offset );
			settings.over = both( settings.over );

			return this._scrollable().each(function() {
				// Null target yields nothing, just like jQuery does
				if (target == null) return;

				var elem = this,
					$elem = $(elem),
					targ = target, toff, attr = {},
					win = $elem.is('html,body');

				switch (typeof targ) {
					// A number will pass the regex
					case 'number':
					case 'string':
						if (/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(targ)) {
							targ = both( targ );
							// We are done
							break;
						}
						// Relative/Absolute selector, no break!
						targ = win ? $(targ) : $(targ, this);
						if (!targ.length) return;
					case 'object':
						// DOMElement / jQuery
						if (targ.is || targ.style)
						// Get the real position of the target
							toff = (targ = $(targ)).offset();
				}

				var offset = $.isFunction(settings.offset) && settings.offset(elem, targ) || settings.offset;

				$.each( settings.axis.split(''), function( i, axis ) {
					var Pos	= axis == 'x' ? 'Left' : 'Top',
						pos = Pos.toLowerCase(),
						key = 'scroll' + Pos,
						old = elem[key],
						max = $scrollTo.max(elem, axis);

					if (toff) {// jQuery / DOMElement
						attr[key] = toff[pos] + ( win ? 0 : old - $elem.offset()[pos] );

						// If it's a dom element, reduce the margin
						if (settings.margin) {
							attr[key] -= parseInt(targ.css('margin'+Pos)) || 0;
							attr[key] -= parseInt(targ.css('border'+Pos+'Width')) || 0;
						}

						attr[key] += offset[pos] || 0;

						if(settings.over[pos])
						// Scroll to a fraction of its width/height
							attr[key] += targ[axis=='x'?'width':'height']() * settings.over[pos];
					} else {
						var val = targ[pos];
						// Handle percentage values
						attr[key] = val.slice && val.slice(-1) == '%' ?
							parseFloat(val) / 100 * max
							: val;
					}

					// Number or 'number'
					if (settings.limit && /^\d+$/.test(attr[key]))
					// Check the limits
						attr[key] = attr[key] <= 0 ? 0 : Math.min( attr[key], max );

					// Queueing axes
					if (!i && settings.queue) {
						// Don't waste time animating, if there's no need.
						if (old != attr[key])
						// Intermediate animation
							animate( settings.onAfterFirst );
						// Don't animate this axis again in the next iteration.
						delete attr[key];
					}
				});

				animate( settings.onAfter );

				function animate( callback ) {
					$elem.animate( attr, duration, settings.easing, callback && function() {
						callback.call(this, targ, settings);
					});
				}
			}).end();
		};

		// Max scrolling position, works on quirks mode
		// It only fails (not too badly) on IE, quirks mode.
		$scrollTo.max = function( elem, axis ) {
			var Dim = axis == 'x' ? 'Width' : 'Height',
				scroll = 'scroll'+Dim;

			if (!$(elem).is('html,body'))
				return elem[scroll] - $(elem)[Dim.toLowerCase()]();

			var size = 'client' + Dim,
				html = elem.ownerDocument.documentElement,
				body = elem.ownerDocument.body;

			return Math.max( html[scroll], body[scroll] ) - Math.min( html[size]  , body[size]   );
		};

		function both( val ) {
			return $.isFunction(val) || typeof val == 'object' ? val : { top:val, left:val };
		}

		// AMD requirement
		return $scrollTo;
	})
}(typeof define === 'function' && define.amd ? define : function (deps, factory) {
	if (typeof module !== 'undefined' && module.exports) {
		// Node
		module.exports = factory(require('jquery'));
	} else {
		factory(jQuery);
	}
}));
/* ========================================================================
 * Bootstrap: carousel.js v3.2.0
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
	'use strict';

	// CAROUSEL CLASS DEFINITION
	// =========================

	var Carousel = function (element, options) {
		this.$element    = $(element).on('keydown.bs.carousel', $.proxy(this.keydown, this))
		this.$indicators = this.$element.find('.carousel-indicators')
		this.options     = options
		this.paused      =
		this.sliding     =
		this.interval    =
		this.$active     =
		this.$items      = null

		this.options.pause == 'hover' && this.$element
			.on('mouseenter.bs.carousel', $.proxy(this.pause, this))
			.on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
	}

	Carousel.VERSION  = '3.2.0'

	Carousel.DEFAULTS = {
		interval: 5000,
		pause: 'hover',
		wrap: true
	}

	Carousel.prototype.keydown = function (e) {
		switch (e.which) {
			case 37: this.prev(); break
			case 39: this.next(); break
			default: return
		}

		e.preventDefault()
	}

	Carousel.prototype.cycle = function (e) {
		e || (this.paused = false)

		this.interval && clearInterval(this.interval)

		this.options.interval
			&& !this.paused
			&& (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

		return this
	}

	Carousel.prototype.getItemIndex = function (item) {
		this.$items = item.parent().children('.item')
		return this.$items.index(item || this.$active)
	}

	Carousel.prototype.to = function (pos) {
		var that        = this
		var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

		if (pos > (this.$items.length - 1) || pos < 0) return

		if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
		if (activeIndex == pos) return this.pause().cycle()

		return this.slide(pos > activeIndex ? 'next' : 'prev', $(this.$items[pos]))
	}

	Carousel.prototype.pause = function (e) {
		e || (this.paused = true)

		if (this.$element.find('.next, .prev').length && $.support.transition) {
			this.$element.trigger($.support.transition.end)
			this.cycle(true)
		}

		this.interval = clearInterval(this.interval)

		return this
	}

	Carousel.prototype.next = function () {
		if (this.sliding) return
		return this.slide('next')
	}

	Carousel.prototype.prev = function () {
		if (this.sliding) return
		return this.slide('prev')
	}

	Carousel.prototype.slide = function (type, next) {
		var $active   = this.$element.find('.item.active')
		var $next     = next || $active[type]()
		var isCycling = this.interval
		var direction = type == 'next' ? 'left' : 'right'
		var fallback  = type == 'next' ? 'first' : 'last'
		var that      = this

		if (!$next.length) {
			if (!this.options.wrap) return
			$next = this.$element.find('.item')[fallback]()
		}

		if ($next.hasClass('active')) return (this.sliding = false)

		var relatedTarget = $next[0]
		var slideEvent = $.Event('slide.bs.carousel', {
			relatedTarget: relatedTarget,
			direction: direction
		})
		this.$element.trigger(slideEvent)
		if (slideEvent.isDefaultPrevented()) return

		this.sliding = true

		isCycling && this.pause()

		if (this.$indicators.length) {
			this.$indicators.find('.active').removeClass('active')
			var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
			$nextIndicator && $nextIndicator.addClass('active')
		}

		var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
		if ($.support.transition && this.$element.hasClass('slide')) {
			$next.addClass(type)
			$next[0].offsetWidth // force reflow
			$active.addClass(direction)
			$next.addClass(direction)
			$active
				.one('bsTransitionEnd', function () {
					$next.removeClass([type, direction].join(' ')).addClass('active')
					$active.removeClass(['active', direction].join(' '))
					that.sliding = false
					setTimeout(function () {
						that.$element.trigger(slidEvent)
					}, 0)
				})
				.emulateTransitionEnd($active.css('transition-duration').slice(0, -1) * 1000)
		} else {
			$active.removeClass('active')
			$next.addClass('active')
			this.sliding = false
			this.$element.trigger(slidEvent)
		}

		isCycling && this.cycle()

		return this
	}


	// CAROUSEL PLUGIN DEFINITION
	// ==========================

	function Plugin(option) {
		return this.each(function () {
			var $this   = $(this)
			var data    = $this.data('bs.carousel')
			var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
			var action  = typeof option == 'string' ? option : options.slide

			if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
			if (typeof option == 'number') data.to(option)
			else if (action) data[action]()
			else if (options.interval) data.pause().cycle()
		})
	}

	var old = $.fn.carousel

	$.fn.carousel             = Plugin
	$.fn.carousel.Constructor = Carousel


	// CAROUSEL NO CONFLICT
	// ====================

	$.fn.carousel.noConflict = function () {
		$.fn.carousel = old
		return this
	}


	// CAROUSEL DATA-API
	// =================

	$(document).on('click.bs.carousel.data-api', '[data-slide], [data-slide-to]', function (e) {
		var href
		var $this   = $(this)
		var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
		if (!$target.hasClass('carousel')) return
		var options = $.extend({}, $target.data(), $this.data())
		var slideIndex = $this.attr('data-slide-to')
		if (slideIndex) options.interval = false

		Plugin.call($target, options)

		if (slideIndex) {
			$target.data('bs.carousel').to(slideIndex)
		}

		e.preventDefault()
	})

	$(window).on('load', function () {
		$('[data-ride="carousel"]').each(function () {
			var $carousel = $(this)
			Plugin.call($carousel, $carousel.data())
		})
	})

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.2.0
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
	'use strict';

	// DROPDOWN CLASS DEFINITION
	// =========================

	var backdrop = '.dropdown-backdrop'
	var toggle   = '[data-toggle="dropdown"]'
	var Dropdown = function (element) {
		$(element).on('click.bs.dropdown', this.toggle)
	}

	Dropdown.VERSION = '3.2.0'

	Dropdown.prototype.toggle = function (e) {
		var $this = $(this)

		if ($this.is('.disabled, :disabled')) return

		var $parent  = getParent($this)
		var isActive = $parent.hasClass('open')

		clearMenus()

		if (!isActive) {
			if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
				// if mobile we use a backdrop because click events don't delegate
				$('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus)
			}

			var relatedTarget = { relatedTarget: this }
			$parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

			if (e.isDefaultPrevented()) return

			$this.trigger('focus')

			$parent
				.toggleClass('open')
				.trigger('shown.bs.dropdown', relatedTarget)
		}


		/********* MODIFIED ************/


		var win = $(window);
		var menu = $parent.find('.dropdown-menu');
		var scrollTop = win.scrollTop();
		var overflowY = menu.offset().top + menu.height();
		var windowHeight = win.height();

		if (overflowY - scrollTop >= windowHeight) {
			var offset = (overflowY + 20) - windowHeight;
			$('html,body').animate({
				scrollTop: offset
			}, 250);
		}

		$parent.on('click', '.dropdown-menu li a', function (e) {

			e.preventDefault();

			var elem = $(this);
			var subCategory = elem.attr('data-type-sub-category');
			var family = elem.attr('data-type-family');
			var product = elem.attr('data-type-product');
			var type = elem.attr('data-type');
			var target = null;

			var btn = $('.btn:first-child');
			var btnParent = $parent.find('.btn:first-child');
			var btnParentSpan = btnParent.find('span');
			var currentSubCategory = btn.attr('data-type-sub-category');
			var currentFamily = btn.attr('data-type-family');
			var currentName = btn.attr('data-type-name');

			var reference = $parent.parents('.tt-filter-module');

			$parent.off('click', '.dropdown-menu li a');

			switch (type) {

				case 'sub-categories':
					if (currentSubCategory !== subCategory) {
						btnParentSpan.html(elem.text());
						btnParent.attr('data-type-name', subCategory);
						target = {
							relatedTarget: this,
							container: reference,
							selected: {
								type: type,
								subCategory: subCategory
							}
						};
						$parent.trigger($.Event('change.tt.dropdown.subCategoryChanged', target));
					}
					break;

				case 'families':
					if (currentFamily !== family) {
						btnParentSpan.html(elem.text());
						btnParent.attr('data-type-name', family);
						target = {
							relatedTarget: this,
							container: reference,
							selected: {
								type: type,
								family: family
							}
						};
						$parent.trigger($.Event('change.tt.dropdown.familyChanged', target));
					}
					break;

				case 'products':
					if (currentName !== product) {
						btnParentSpan.html(elem.text());
						btnParent.attr('data-type-name', product);
						target = {
							relatedTarget: this,
							container: reference,
							selected: {
								type: type,
								subCategory: subCategory,
								family: family,
								product: product
							}
						};
						$parent.trigger($.Event('change.tt.dropdown.productChanged', target));
					}
					break;
			}
		});


		/********* MODIFIED ************/


		return false
	}

	Dropdown.prototype.keydown = function (e) {
		if (!/(38|40|27)/.test(e.keyCode)) return

		var $this = $(this)

		e.preventDefault()
		e.stopPropagation()

		if ($this.is('.disabled, :disabled')) return

		var $parent  = getParent($this)
		var isActive = $parent.hasClass('open')

		if (!isActive || (isActive && e.keyCode == 27)) {
			if (e.which == 27) $parent.find(toggle).trigger('focus')
			return $this.trigger('click')
		}

		var desc = ' li:not(.divider):visible a'
		var $items = $parent.find('[role="menu"]' + desc + ', [role="listbox"]' + desc)

		if (!$items.length) return

		var index = $items.index($items.filter(':focus'))

		if (e.keyCode == 38 && index > 0)                 index--                        // up
		if (e.keyCode == 40 && index < $items.length - 1) index++                        // down
		if (!~index)                                      index = 0

		$items.eq(index).trigger('focus')
	}

	function clearMenus(e) {
		if (e && e.which === 3) return
		$(backdrop).remove()
		$(toggle).each(function () {
			var $parent = getParent($(this))
			var relatedTarget = { relatedTarget: this }
			if (!$parent.hasClass('open')) return
			$parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))
			if (e.isDefaultPrevented()) return
			$parent.removeClass('open').trigger('hidden.bs.dropdown', relatedTarget)
		})
	}

	function getParent($this) {
		var selector = $this.attr('data-target')

		if (!selector) {
			selector = $this.attr('href')
			selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
		}

		var $parent = selector && $(selector)

		return $parent && $parent.length ? $parent : $this.parent()
	}


	// DROPDOWN PLUGIN DEFINITION
	// ==========================

	function Plugin(option) {
		return this.each(function () {
			var $this = $(this)
			var data  = $this.data('bs.dropdown')

			if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
			if (typeof option == 'string') data[option].call($this)
		})
	}

	var old = $.fn.dropdown

	$.fn.dropdown             = Plugin
	$.fn.dropdown.Constructor = Dropdown


	// DROPDOWN NO CONFLICT
	// ====================

	$.fn.dropdown.noConflict = function () {
		$.fn.dropdown = old
		return this
	}


	// APPLY TO STANDARD DROPDOWN ELEMENTS
	// ===================================

	$(document)
		.on('click.bs.dropdown.data-api', clearMenus)
		.on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
		.on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
		.on('keydown.bs.dropdown.data-api', toggle + ', [role="menu"], [role="listbox"]', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.2.0
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
	'use strict';

	// TAB CLASS DEFINITION
	// ====================

	var Tab = function (element) {
		this.element = $(element)
	}

	Tab.VERSION = '3.2.0'

	Tab.prototype.show = function () {
		var $this    = this.element
		var $ul      = $this.closest('ul:not(.dropdown-menu)')
		var selector = $this.data('target')

		if (!selector) {
			selector = $this.attr('href')
			selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
		}

		if ($this.parent('li').hasClass('active')) return

		var previous = $ul.find('.active:last a')[0]
		var e        = $.Event('show.bs.tab', {
			relatedTarget: previous
		})

		$this.trigger(e)

		if (e.isDefaultPrevented()) return

		var $target = $(selector)

		this.activate($this.closest('li'), $ul)
		this.activate($target, $target.parent(), function () {
			$this.trigger({
				type: 'shown.bs.tab',
				relatedTarget: previous
			})
		})
	}

	Tab.prototype.activate = function (element, container, callback) {
		var $active    = container.find('> .active')
		var transition = callback
			&& $.support.transition
			&& $active.hasClass('fade')

		function next() {
			$active
				.removeClass('active')
				.find('> .dropdown-menu > .active')
				.removeClass('active')

			element.addClass('active')

			if (transition) {
				element[0].offsetWidth // reflow for transition
				element.addClass('in')
			} else {
				element.removeClass('fade')
			}

			if (element.parent('.dropdown-menu')) {
				element.closest('li.dropdown').addClass('active')
			}

			callback && callback()
		}

		transition ?
			$active
				.one('bsTransitionEnd', next)
				.emulateTransitionEnd(150) :
			next()

		$active.removeClass('in')
	}


	// TAB PLUGIN DEFINITION
	// =====================

	function Plugin(option) {
		return this.each(function () {
			var $this = $(this)
			var data  = $this.data('bs.tab')

			if (!data) $this.data('bs.tab', (data = new Tab(this)))
			if (typeof option == 'string') data[option]()
		})
	}

	var old = $.fn.tab

	$.fn.tab             = Plugin
	$.fn.tab.Constructor = Tab


	// TAB NO CONFLICT
	// ===============

	$.fn.tab.noConflict = function () {
		$.fn.tab = old
		return this
	}


	// TAB DATA-API
	// ============

	$(document).on('click.bs.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
		e.preventDefault()
		Plugin.call($(this), 'show')
	})

}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.2.0
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
	'use strict';

	// CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
	// ============================================================

	function transitionEnd() {
		var el = document.createElement('bootstrap')

		var transEndEventNames = {
			WebkitTransition : 'webkitTransitionEnd',
			MozTransition    : 'transitionend',
			OTransition      : 'oTransitionEnd otransitionend',
			transition       : 'transitionend'
		}

		for (var name in transEndEventNames) {
			if (el.style[name] !== undefined) {
				return { end: transEndEventNames[name] }
			}
		}

		return false // explicit for ie8 (  ._.)
	}

	// http://blog.alexmaccaw.com/css-transitions
	$.fn.emulateTransitionEnd = function (duration) {
		var called = false
		var $el = this
		$(this).one('bsTransitionEnd', function () { called = true })
		var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
		setTimeout(callback, duration)
		return this
	}

	$(function () {
		$.support.transition = transitionEnd()

		if (!$.support.transition) return

		$.event.special.bsTransitionEnd = {
			bindType: $.support.transition.end,
			delegateType: $.support.transition.end,
			handle: function (e) {
				if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
			}
		}
	})

}(jQuery);

// Create the namespace
var tomtom = {};
(function($, ns)
{

	'use strict';


	// Namespace
	ns.utils = ns.utils || {};


	ns.utils.client =
	{

		/**
		 * Return document width
		 */
		width: function ()
		{
			return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		},


		/**
		 * Return document height
		 */
		height: function ()
		{
			return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
		},
		/**
		 * Credits: John Resig
		 * Source: https://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport/7557433#7557433
		 * @param el
		 * @param percentageVisibile, how much of an elements needs to be visible in % values defined like: 0.25 (25 percentage)
		 * @returns {boolean}
		 */
		isElementInViewport: function(el, percentageVisibile) {
			percentageVisibile = percentageVisibile || 0;

			//special bonus for those using jQuery
			if (typeof jQuery === "function" && el instanceof jQuery) {
				el = el[0];
			}

			var rect = el.getBoundingClientRect();
			var offsetPerc = (rect.height * percentageVisibile);

			return (
				rect.top >= -offsetPerc &&
				rect.left >= 0 &&
				rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offsetPerc && /*or $(window).height() */
				rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
			);
		}
	};

}(jQuery, tomtom));
(function($, ns)
{

	'use strict';


	// Namespace
	ns.utils = ns.utils || {};


	ns.utils.cookie =
	{

		/**
		 * Set a domain cookie
		 * @param name: Cookie name
		 * @param value: Cookie value
		 * @param days: Valid for x days
		 */
		save: function (name, value, days)
		{
			// Save the cookie
			$.cookie(name, value, {
				domain: '.tomtom.com',
				expires: days,
				path: '/'
			});
		},


		/**
		 * Read a domain cookie
		 * @param name
		 */
		load: function (name)
		{
			var value = $.cookie(name);
			if (typeof value == 'undefined' || value == null || value == '') {
				return null;
			}
			return value;
		},


		/**
		 * Load cookie options
		 * @param defaults: Default values
		 */
		loadCookieOptions: function(defaults)
		{
			// Load data and set default data if needed
			var data =  JSON.parse(ns.utils.cookie.load(ns.setting.COOKIE_SETTINGS));
			if (data == null) {

				// Create a new data object
				data = {};
				data.version = defaults.version;
				data.accepted = defaults.accepted;
				data.all = defaults.all;
				data.options = defaults.options;
			}

			// Set meta data
			ns.utils.cookie.setCookieMetaData(data);

			return data;
		},


		/**
		 * Save cookie options
		 * @param values: Values to save
		 */
		saveCookieOptions: function(values)
		{
			// Create data for cookie
			var data = {};
			data.version = values.version;
			data.accepted = values.accepted;
			data.all = values.all;
			data.options = values.options;

			// Save the data and trigger a refresh
			ns.utils.cookie.save(ns.setting.COOKIE_SETTINGS, JSON.stringify(data), 45);
			ns.events.trigger(ns.event.USER_SETTINGS_SAVED);

			// Set meta data
			ns.utils.cookie.setCookieMetaData(data);

			return data;
		},


		/**
		 * Set cookie meta data tag
		 * @param data: Cookie data
		 */
		setCookieMetaData: function(data)
		{
			// 1. Cookie has not been accepted
			// 2. All cookie settings are accepted
			// 3. Specific setting is accepted
			// 4. All cookie settings are declined
			if (data.accepted == false) {
				ns.utils.meta.setMetaData('DCSext.cookieconsent', 'first visit');
			} else if (data.all == true) {
				ns.utils.meta.setMetaData('DCSext.cookieconsent', 'all');
			} else {
				for (var prop in data.options) {
					if (data.options[prop] == true) {
						ns.utils.meta.setMetaData('DCSext.cookieconsent', prop);
						return;
					}
				}
				ns.utils.meta.setMetaData('DCSext.cookieconsent', 'no selection');
			}
		}

	};

}(jQuery, tomtom));
(function($, ns)
{

	'use strict';


	// Namespace
	ns.utils = ns.utils || {};


	ns.utils.form = {

		validate: {
			email: function(value) {
				var pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/igm;
				if (value == '' || !pattern.test(value)) {
					return false;
				}
				return true;
			},
			notEmptyString: function(value) {
				return (value !== "");
			}
		}
	};

}(jQuery, tomtom));
(function($, ns)
{

	'use strict';


	// Namespace
	ns.utils = ns.utils || {};


	ns.utils.meta =
	{

		/**
		 * Set meta data tag
		 * @param name: Name of the tag
		 * @param content: Content of the tag
		 */
		setMetaData: function (name, content)
		{
			var tag = $('meta[name="' + name + '"]');
			tag.attr('content', content);
		}
	};

}(jQuery, tomtom));
(function($, ns)
{

	'use strict';


	// Namespace
	ns.utils = ns.utils || {};


	ns.utils.scanner =
	{

		/**
		 * Find elements and initialize class
		 * @param container: The container where we will look for the selector
		 * @param selector: jQuery selector for the elements to find
		 * @param initializer: Class to initialize or function to call
		 */
		scan: function(container, selector, initializer)
		{
			var instances = [];
			var elements = container.find(selector);
			elements.each(function() {
				var element = $(this);
				var instance = new initializer(element);
				instances.push(instance);
			});
			return instances;
		}
	};

}(jQuery, tomtom));
(function($, ns)
{

	'use strict';


	// Namespace
	ns.utils = ns.utils || {};


	ns.utils.tracking =
	{

		/**
		 * Track WebTrends data
		 * @param id: ID of the data in the trackingData array
		 * @param overwrite: The data overwrites (optional)
		 */
		track: function(id, overwrite)
		{
			if (typeof window.trackingData != 'undefined') {
				if (id in window.trackingData) {
					var data = window.trackingData[id];
					if (typeof overwrite != 'undefined') {
						$.extend(data, overwrite);
					}
					ns.utils.tracking.multiTrack(data);
				}
			}
		},


		/**
		 * Track raw WebTrends data
		 * @param data: Multitrack data object
		 */
		multiTrack: function(data)
		{
			// Set the responsive string
			data['DCSext.responsive_version'] = ns.utils.tracking.getResponsiveVersion();

			// Send to WebTrends
			if (typeof Webtrends != 'undefined') {
				try {
					Webtrends.multiTrack({
						args: data
					});
				} catch(e) {
					//
				}
			}
		},


		/**
		 * Get responsive image string
		 */
		getResponsiveVersion: function()
		{
			var width = ns.screenWidth;
			var responsive = 'mobile';
			if (width >= ns.setting.BREAKPOINT_MOBILE_PLUS) responsive = 'mobile-plus';
			if (width >= ns.setting.BREAKPOINT_TABLET) responsive = 'tablet';
			if (width >= ns.setting.BREAKPOINT_DESKTOP) responsive = 'desktop';
			if (width >= ns.setting.BREAKPOINT_DESKTOP_PLUS) responsive = 'desktop-plus';
			return responsive;
		},


		/**
		 * Set the responsive meta data field
		 */
		setMetaData: function()
		{
			ns.utils.meta.setMetaData(
				'DCSext.responsive_version',
				ns.utils.tracking.getResponsiveVersion()
			);
		}

	};

}(jQuery, tomtom));
(function($, ns)
{

	'use strict';


	// Namespace
	ns.event = ns.event || {};


	// Event names
	ns.event.OPEN_DETAILS 			= 'tt.openDetails';
	ns.event.CLOSE_DETAILS 			= 'tt.closeDetails';
	ns.event.RESIZE 				= 'tt.resize';
	ns.event.SCROLL 				= 'tt.scroll';
	ns.event.LOADED 				= 'tt.loaded';
	ns.event.TOGGLE    				= 'tt.toggle';
	ns.event.SELECT 				= 'tt.select';
	ns.event.USER_SETTINGS_UPDATED	= 'tt.userSettingsUpdated';
    ns.event.USER_SETTINGS_SAVED    = 'tt.userSettingsSaved';
    ns.event.FOCUS				    = 'tt.focus';
    ns.event.BLUR				    = 'tt.blur';


	// SLD Video player event
	ns.event.VIDEO_PAYER_READY		= 'player-ready';


	// Bootstrap events
	ns.event.BOOTSTRAP_TAB			= 'shown.bs.tab';
	ns.event.BOOTSTRAP_CAROUSEL		= 'slide.bs.carousel';

	// Animation Event
	ns.event.ANIMATION_END				= 'animationend webkitAnimationEnd oanimationend MSAnimationEnd';
	ns.event.ANIMATION_FRAMES_START		= 'start.tt.frames.';
	ns.event.ANIMATION_FRAMES_UPDATE	= 'update.tt.frames';
	ns.event.ANIMATION_FRAMES_FINISHED	= 'finished.tt.frames';


	// Bootstrap dropdown events
	ns.event.DROPDOWN_CATEGORY_CHANGED		= 'change.tt.dropdown.subCategoryChanged';
	ns.event.DROPDOWN_FAMILY_CHANGED		= 'change.tt.dropdown.familyChanged';
	ns.event.DROPDOWN_PRODUCT_CHANGED		= 'change.tt.dropdown.productChanged';


	// Behaviour events
	ns.event.BEHAVIOUR_ADD_TO_CARD_REQUEST		= 'behaviour.tt.addToCardRequest';
	ns.event.BEHAVIOUR_ADD_TO_CARD_REQUEST_ACK	= 'behaviour.tt.addToCardRequestAck';
	ns.event.BEHAVIOUR_ADD_TO_CARD_FINISHED		= 'behaviour.tt.addToCardFinished';



}(jQuery, tomtom));
(function($, ns)
{

	'use strict';


	// Namespace
	ns.setting = ns.setting || {};


	// Animation settings
	ns.setting.ANIMATION_DURATION 		= 250;
	ns.setting.ANIMATION_EASE 			= 'swing';


	// Breakpoint settings
	ns.setting.BREAKPOINT_MOBILE		= 320;
	ns.setting.BREAKPOINT_MOBILE_PLUS	= 480;
	ns.setting.BREAKPOINT_TABLET		= 770;
	ns.setting.BREAKPOINT_DESKTOP		= 1024;
	ns.setting.BREAKPOINT_DESKTOP_PLUS	= 1280;

	// Tab names
	ns.setting.TAB_PRODUCTS				= 'products';
	ns.setting.TAB_ACCESSORIES			= 'accessories';
	ns.setting.TAB_SERVICES				= 'services';


	// Cookie names
	ns.setting.COOKIE_SETTINGS			= 'tt_settings';
	ns.setting.COOKIE_HISTORY			= 'tt_history';
	ns.setting.COOKIE_LOCALE			= 'tt_locale';


	// Toggle types
	ns.setting.TOGGLE_CARD				= 'card';
	ns.setting.TOGGLE_TAB				= 'tab';
	ns.setting.TOGGLE_COLOR				= 'color';
	ns.setting.TOGGLE_CLOSE 			= 'close';


	// Keycodes
	ns.setting.KEYCODE_SPACE			= 32;
	ns.setting.KEYCODE_ENTER			= 13;


}(jQuery, tomtom));
(function($, ns) {

	'use strict';


	// Namespace
	ns.templates = ns.templates || {};
	ns.templates.warning = ns.templates.warning || {};
	ns.templates.form = ns.templates.form || {};

	ns.templates.warning.wrapper = '<div class="tt-message-wrapper" style="position:relative"></div>';

	ns.templates.warning.email = '<div class="tt-message">' +
									'<p class="tt-correct-format">Please use this format <strong>example@tomtom.com</strong></p>' +
								'</div>';

	ns.templates.warning.text = '<div class="tt-message">' +
									'<p class="tt-correct-format">Please fill in <strong>Your Name</strong></p>' +
								'</div>';

	ns.templates.form.succes = '<div id="formSucces" class="tt-message-wrapper" style="position:relative;">' +
									'<div class="tt-message tt-success">' +
										'<p class="tt-correct-format">Message send successful Message send successful Message send successful Message send successful</p>' +
									'</div>' +
								'</div>';

}(jQuery, tomtom));

(function($, ns) {

	'use strict';

	// Namespace
	ns.components = ns.components || {};


	ns.components.ScreenSizeConfigurator = function(element) {

		// Properties
		var card = element.closest('.tt-product-selector-card');
		var productCardFooter = card.find('.tt-product-selector-card-footer');
		var form = element.find('form');

		/**
		 * Init
		 */
		var init = function() {

			// block the default click, otherwise the ProductSelectorCard Component will be triggered immediately
			form.on("click", function(evt) {
				evt.stopImmediatePropagation();
			});

			// listen for when the form changes
			form.on('change', function() {
				resetCurrent();
				setCurrent();
				applyPulseBehaviour();
			});
		};

		var resetCurrent = function() {
			productCardFooter.find(".tt-table-cell.active").removeClass('active');
		};

		var setCurrent = function() {
			var checkedElement = form.find('input[type="radio"]:checked');
			var targetId = checkedElement.data('toggle');
			$("#" + targetId).addClass('active');
		};

		var applyPulseBehaviour = function() {
			var pulsateElem = productCardFooter.find(".tt-table-cell.active").find('.tt-anim-pulsate');
			if(pulsateElem) {
				ns.animations.clean(pulsateElem);
				ns.animations.animate(pulsateElem);
			}
		};

		init();


		// Public methods
		return {};
	};

}(jQuery, tomtom));
(function($, ns) {

	'use strict';

	// Namespace
	ns.components = ns.components|| {};


	/**
	 * Controls for each form, the messaging system showing/hiding them
	 * @returns {{}}
	 * @constructor
	 */
	ns.components.FormFeedbackController = function($element) {

		var EVENT_BLUR = 'blur';
		var EVENT_INPUT = 'input';
		var EVENT_FOCUS = 'focus';

		var $form = $element;
		var $submit = $form.find('[type="submit"]');
		var requiredInputs = null;
		var allInputFields = null;
		var hadCorrectEmail = false;
		var validate = ns.utils.form.validate;
		var formElements = [];



		/**
		 * Init
		 */
		var init = function () {
			// we need the focus event on all input elements, not only the required
			allInputFields = $form.find('input');
			allInputFields.each(function(){
				var $target = $(this);
				// store the elements with there id
				formElements.push(getIDFor($target));
				$target.on(EVENT_FOCUS, inputFocusHandler);
			});

			// events for all required input fields
			requiredInputs = $form.find('input[data-required="true"]');
			requiredInputs.each(function() {
				$(this).on('blur input', inputBlurAndInputEventHandler);
			});

			$submit.on('click', submitFormHandler);
			checkRequiredFields();
		}

		/**
		 * InputFocusHandler
		 *
		 * Focus Event Handler for input fields
		 * @param evt - the element that triggers the focus event
		 */
		var inputFocusHandler = function(evt) {
			var $target = $(evt.currentTarget);
			if($target.hasClass('tt-has-warning')) {
				showMessageForElement($target);

				// on mobile we want to be able to scroll to the warning that has focus
				if(Modernizr.touch) {
					var msg = $target.parent().find('.tt-message');
					var targetScrollTop = $target.offset().top - msg.height() - 80; // 80 is navbar height
					if(targetScrollTop < ns.doc.scrollTop()) {
						ns.doc.scrollTo($target, 800, {offset:-(80 + msg.height())});
					}
				}
			} else {
				// element itself is not required, but we need to check if the user skipped a required field
				var itemIndex = formElements.indexOf($target.attr('id'));
				checkFormElementsBeforeIndex(itemIndex);
			}
		}

		/**
		 * CheckFormElementsBeforeIndex
		 *
		 * Check if there are form elements that are required but we have passed
		 * @param index
		 */
		var checkFormElementsBeforeIndex = function(index) {
			for(var i=0; i<index; i++) {
				var $elem = $(allInputFields[i]);
				if($elem.data('required') === true) {
					$elem.trigger('blur');
				}
			}
		};

		/**
		 * GetIDFor
		 *
		 * Get the unique ID of an element, if it does not exist we create one based on date
		 * @param $elem
		 * @returns {*}
		 */
		var getIDFor = function($elem) {
			if ($elem.attr('id') == false || $elem.attr('id') == '')
				$elem.attr('id', 'tt-dummy-' + new Date());
			return $elem.attr('id');
		};

		/**
		 * DisableHandlersForEvent
		 *
		 * Disable Events for input fields
		 * @param event - string, possible values: focus, blur, input
		 */
		var disableHandlersForEvent = function(event) {
			requiredInputs.each(function() {
				$(this).off(event, inputBlurAndInputEventHandler);
			});
		};

		/**
		 * EnableHandlersForEvent
		 *
		 * Enable Events for input fields
		 * @param event - string, possible values: focus, blur, input
		 */
		var enableHandlersForEvent = function(event) {
			requiredInputs.each(function() {
				$(this).on(event, inputBlurAndInputEventHandler);
			});
		}

		/**
		 * InputBlurAndInputEventHandler
		 *
		 * The general event handler for input fields, takes care of the Blur and Input events
		 * @param evt
		 */
		var inputBlurAndInputEventHandler = function(evt) {
			var $target = $(evt.currentTarget);
			var isInputEvent = (evt.type === EVENT_INPUT);
			var response = inputFieldIsValid($target);

			if(isInputEvent && response.type === 'email') {
				if(response.isValid) {
					hadCorrectEmail = true;
					if(isWarned($target)) {
						destroyWarning($target, isInputEvent);
					}
				} else if(hadCorrectEmail) {
					hadCorrectEmail = false;
					createWarning($target, ns.templates.warning[response.type], isInputEvent);
				}
			} else {
				if (!response.isValid) {
					// field is inValid
					if(!isWarned($target)) {
						createWarning($target, ns.templates.warning[response.type], isInputEvent);
					}

					if(!isInputEvent) {
						hideMessageForElement($target);
					}
				} else {
					// field is valid
					if(isWarned($target)) {
						destroyWarning($target, isInputEvent);
					}
				}
			}

			// check if we need to enable or disable the submit btn
			checkRequiredFields();
		};

		/**
		 * InputFieldIsValid
		 *
		 * @param $elem
		 * @returns {{isValid: Boolean, type: input type}}
		 */
		var inputFieldIsValid = function($elem) {
			var inputType = $elem.attr("type");
			var value = $elem.val();
			if(inputType === 'email') {
				return {isValid: validate.email(value), type: inputType};
			}
			if(inputType === 'text') {
				return {isValid: validate.notEmptyString(value), type: inputType};
			}
		};

		/**
		 * ElementIsWarned
		 *
		 * @param $elem
		 * @returns {Boolean}
		 */
		var isWarned = function($elem) {
			return $elem.hasClass('tt-has-warning');
		};

		/**
		 * CreateWarning
		 *
		 * @param $elem - the input field that needs a warning
		 * @param template  - HTML Template with specific warning content, can be found in constants/Templates.js
		 */
		var createWarning = function($elem, template, focus) {
			/*
				since we wrap the input field it wil lose its focus
				so since we do not want to trigger the blur event, we disable it
			*/
			disableHandlersForEvent(EVENT_BLUR);

			$elem.addClass("tt-has-warning");

			/*
				Creation of the warning message
				create a wrapper around the warned inputfield
				NOTE : if we decide to wrap the warning messages already in HTML, than this part of the code can be deleted
			*/
			// creation warning start
			$elem.wrap(ns.templates.warning.wrapper);
			var parent = $elem.parent('.tt-message-wrapper');
			parent.append(template);
			// creation warning end

			var rect = $elem[0].getBoundingClientRect();
			var msg = parent.find('.tt-message');
			var messageRect = msg[0].getBoundingClientRect();
			msg.css({
				left: Math.floor((rect.width - messageRect.width) * 0.5),
				top: -(rect.height + messageRect.height - 20),
				zIndex: 9000
			});

			parent.find('.tt-message').addClass('tt-anim-pulse-up-depth');

			if(focus === true) {
				$elem.focus();
			}

			enableHandlersForEvent(EVENT_BLUR);
		};

		/**
		 * DestroyWarning
		 *
		 * @param $elem
		 */
		var destroyWarning = function($elem, focus) {
			// to not trigger the blur event, we disable it
			disableHandlersForEvent(EVENT_BLUR);

			/*
			 NOTE : if we decide to wrap the warning messages already in HTML, than
			 this part of the code can be deleted
			 */
			// start remove of message
			var parent = $elem.parent('.tt-message-wrapper');
			parent.find('.tt-message').remove();
			$elem.unwrap(ns.templates.warning.wrapper);
			// end remove of message

			$elem.removeClass("tt-has-warning");

			if(focus === true) {
				$elem.focus();
			}

			enableHandlersForEvent(EVENT_BLUR);
		};

		/**
		 * ShowMessageForElement
		 *
		 * @param $elem
		 */
		var showMessageForElement = function($elem) {
			$elem.parent().find('.tt-message').show();
		};

		/**
		 * HideMessageForElement
		 *
		 * @param $elem
		 */
		var hideMessageForElement = function($elem) {
			$elem.parent().find('.tt-message').hide();
		};

		/**
		 * AllRequiredValid
		 *
		 * @returns {boolean}
		 */
		var allRequiredValid = function() {
			var allValid = false;
			requiredInputs.each(function() {
				allValid = inputFieldIsValid($(this)).isValid;
				if(!allValid) {
					return false;
				}
			});
			return allValid;
		};

		/**
		 * CheckRequiredFields - to enable or disable the submit button
		 */
		var checkRequiredFields = function () {
			if(allRequiredValid()) {
				$submit.removeClass('disabled');
			} else {
				$submit.addClass('disabled');
			}
		};

		/**
		 * SubmitFormHandler
		 * @param evt
		 */
		var submitFormHandler = function(evt) {
			evt.stopPropagation();
			evt.preventDefault();

			// TODO : sent post/get and attach callback showFormCallback
			showFormSuccesCallback();
		};

		/**
		 * ShowFormCallback
		 *
		 * @param success
		 */
		var showFormSuccesCallback = function() {

			$element.closest('.tt-notify-form').append(ns.templates.form.succes);
			var $msg = $('#formSucces').find('.tt-success');
			$msg.addClass('tt-message-right');

			var targetRect = $submit[0].getBoundingClientRect();
			var messageRect = $msg[0].getBoundingClientRect();

			$msg.css({
				top: -(targetRect.height + messageRect.height + 20),
				right: 0
			});

			$('#formSucces').delay(1500).fadeOut(250, function() {
				$(this).remove();
			});

			clearForm();
		};

		var clearForm = function() {
			hadCorrectEmail = false;
			allInputFields.each(function(){
				$(this).val('');
			});
			checkRequiredFields();
		};

		init();

		// Public methods
		return {};
	};

}(jQuery, tomtom));
(function($, ns)
{

	'use strict';


	// Namespace
	ns.components = ns.components || {};


	ns.components.ImageViewer360 = function(element)
	{

		// Properties
		var preloader			= element.find('.tt-loading');
		var container 			= element.find('.tt-image-container');
		var sources 			= container.find('span');
		var items 				= [];
		var itemsCount			= 0;
		var itemsLoaded			= 0;
		var isDown 				= false;
		var startPos			= 0;
		var startIndex 			= 0;
		var index 				= 0;
		var threshold 			= 20;
		var tracked				= false;


		/**
		 * Init
		 */
		var init = function()
		{
			// Create the images to start loading
			sources.each(function() {
				var source = $(this);
				var src = source.data('src');
				var image = $('<img src="" alt="" class="tt-unselectable"/>');
				image.on('load', imageLoaded);
				image.attr('src', src);
				source.append(image);
				items.push(source);
			});

			// Save size
			itemsCount = items.length;
		};


		/**
		 * Image load callback
		 */
		var imageLoaded = function()
		{
			itemsLoaded++;

			// Check if we are done loading
			if (itemsLoaded == itemsCount) {

				// Hide preloader
				preloader.css('display', 'none');
				
				// Init listeners
				if (Modernizr.touch) {
					initMobile();
				} else {
					initDesktop();
				}
			}
		};


		/**
		 * Attach touch events on mobile
		 */
		var initMobile = function()
		{
			container.on('touchstart', function(e) {
				mouseDown(e.originalEvent.changedTouches[0].clientX);
			});
			container.on('touchmove', function(e) {
				mouseMove(e.originalEvent.changedTouches[0].clientX);
			});
			container.on('touchend', function() {
				mouseUp();
			});
		};


		/**
		 * Attach mouse events on desktop
		 */
		var initDesktop = function()
		{
			container.on('mousedown', function(e) {
				e.preventDefault();
				mouseDown(e.pageX);
			});
			ns.body.on('mousemove', function(e) {
				mouseMove(e.pageX);
			});
			ns.body.on('mouseup', function() {
				mouseUp();
			});
			ns.body.on('mouseleave', function() {
				mouseUp();
			});
		};


		/**
		 * Show image
		 * @param i: Image index to show
		 */
		var showImage = function(i)
		{
			// Check errors
			if (isNaN(i)) return;

			// Limit
			i = (i < 0) ? 0 : (i > itemsCount - 1) ? itemsCount - 1 : i;

			// Show image
			if (index != i) {
				items[index].removeClass('active');
				items[i].addClass('active');
				index = i;
			}
		};


		/**
		 * Mouse down handler
		 * @param pos: Mouse position
		 */
		var mouseDown = function(pos)
		{
			isDown = true;
			startIndex = index;
			startPos = pos;
			track();
		};


		/**
		 * Mouse move handler
		 * @param pos: Mouse position
		 */
		var mouseMove = function(pos)
		{
			if (!isDown) {
				return;
			}

			// Calculate new index
			var distance = startPos - pos;
			var steps = startIndex + Math.round(distance / threshold);
			var step = Math.abs(steps) % itemsCount;
			if (steps < 0) {
				step = itemsCount - step;
			}
			showImage(step);
		};


		/**
		 * Mouse up handler
		 */
		var mouseUp = function()
		{
			isDown = false;
		};


		/**
		 * Track interaction
		 */
		var track = function()
		{
			if (tracked) {
				return;
			}

			// Find the headers and concatenate the values
			var panel = element.closest('.tt-product-panel-body');
			var header = panel.find('.tt-detail-panel-info-column-header');
			var h1 = header.find('h1');
			var h3 = header.find('h3');
			var text = [];
			var textH1 = $.trim(h1.text());
			var textH3 = $.trim(h3.text());
			if (textH1 != '') text.push(textH1);
			if (textH3 != '') text.push(textH3);

			// Track event
			ns.utils.tracking.multiTrack({
				'WT.z_event' : 'Clicked',
				'WT.z_eventtype' : '360',
				'WT.z_eventplace' : text.join('-')
			});

			// Set flag so we track the 360 interactions once
			tracked = true;
		};


		init();


		// Public methods
		return {};
	};

}(jQuery, tomtom));
(function($, ns)
{

	'use strict';


	// Namespace
	ns.components = ns.components || {};


	ns.components.ImageViewerGallery = function(element)
	{

		// Properties
		var container	= element.find('.tt-image-container');
		var menu 		= element.find('.tt-image-viewer-menu');
		var buttons		= menu.find('[data-image]');
		var thumbs 		= buttons.find('.tt-thumb');


		/**
		 * Init
		 */
		var init = function()
		{
			// Listen to clicks on thumbs
			buttons.on('click', function(e) {
				e.preventDefault();

				// Get button and grab image src
				var button = $(this);
				var src = button.data('image');

				// Set the active thumb
				var thumb = button.find('.tt-thumb');
				thumbs.removeClass('active');
				thumb.addClass('active');

				// Load the image
				var image = container.find('img');
				image.attr('src', src);
			});
		};


		init();


		// Public methods
		return {};
	};

}(jQuery, tomtom));

(function($, ns)
{

	'use strict';


	// Namespace
	ns.components = ns.components || {};


	ns.components.ImageViewerMenu = function(element)
	{

		// Properties
		var panel			= element.closest('.tt-product-details-panel');
		var panelID			= panel.attr('id');
		var buttonPrev		= element.find('.tt-nav-prev');
		var buttonNext		= element.find('.tt-nav-next');
		var thumbsList		= element.find('.tt-thumbs');
		var thumbsSlider	= thumbsList.find('ul');
		var thumbs			= thumbsList.find('li');
		var thumbsCount		= thumbs.length;
		var thumbsWidth		= 44 + 5;
		var thumbsVisible	= 3;
		var buttons 		= thumbs.find('[data-toggle]');
		var index			= 0;
		var indexLast		= 0;


		/**
		 * Init
		 */
		var init = function()
		{
			// Set last index
			if (thumbsCount > thumbsVisible) {
				indexLast = thumbsCount - thumbsVisible;
			}

			// Find the active thumbnail
			var current = thumbs.find('[data-toggle="' + panelID + '"]').closest('li');
			if (current.length > 0) {
				index = current.index();
			}

			// Show border around the active image
			thumbs.eq(index).find('.tt-thumb').addClass('active');

			// Show next and previous buttons
			buttonPrev.on('click', showPrev);
			buttonNext.on('click', showNext);

			// Swipe listeners
			// thumbsList.swiperight(showPrev);
			// thumbsList.swipeleft(showNext);

			// Listen to select events
			ns.events.on(ns.event.SELECT, selectHandler);

			// Trigger select event from buttons
			buttons.on('click', function(evt) {
				evt.stopPropagation();

				ns.events.trigger({
					type: ns.event.SELECT,
					currentID: $(this).data('toggle'),
					currentIndex: index
				});
			});

			// Update the view
			update(false);
		};


		/**
		 * Show next and previous items
		 */
		var showPrev = function(evt) {
			evt.stopPropagation();
			index--;
			update(true);
		};
		var showNext = function(evt) {
			evt.stopPropagation();
			index++;
			update(true);
		};


		/**
		 * Select handler
		 * @param e
		 */
		var selectHandler = function(e)
		{
			var thumb = thumbs.find('[data-toggle="' + e.currentID + '"]').closest('li');
			if (thumb.length > 0) {
				index = e.currentIndex;
				update(false);
			}
		};


		/**
		 * Update the position of the thumbs
		 * @param animate
		 */
		var update = function(animate)
		{
			// Cap values
			index = (index < 0 ? 0 : index > indexLast ? indexLast : index);

			// Slide thumbs
			if (!animate) {
				thumbsSlider.css('left', -(index * thumbsWidth) + 'px');
			} else {
				thumbsSlider.animate({
					left: -(index * thumbsWidth) + 'px'
				}, {
					duration: ns.setting.ANIMATION_DURATION,
					ease: ns.setting.ANIMATION_EASE
				});
			}

			// Show buttons
			if(thumbsCount > thumbsVisible && index > 0) {
				buttonPrev.removeClass("disabled");
			} else {
				buttonPrev.addClass("disabled");
			}

			if(thumbsCount > thumbsVisible && index < indexLast) {
				buttonNext.removeClass("disabled");
			} else {
				buttonNext.addClass("disabled");
			}
		};


		init();


		// Public methods
		return {};
	};

}(jQuery, tomtom));

(function($, ns)
{

	'use strict';


	// Namespace
	ns.components = ns.components || {};


	ns.components.Link = function(element)
	{

		// Properties
		var href = element.data('href');


		/**
		 * Init
		 */
		var init = function()
		{
			element.on('click', function(e)
			{
				// Check if we clicked a child link element
				// If so, then we should open that link
				var node = e.target.nodeName;
				if (node == 'A' || node == 'BUTTON') {
					return;
				}

				// Otherwise use the link in the data attribute
				e.preventDefault();
				e.stopImmediatePropagation();
				document.location.href = href;
			});
		};


		init();


		// Public methods
		return {};
	};

}(jQuery, tomtom));
(function($, ns)
{

	'use strict';


	// Namespace
	ns.components = ns.components || {};


	ns.components.MoreLess = function(element)
	{

		// Attributes
		var dataxs 			= parseInt(element.data('moreless-cols-xs'));
		var datasm 			= parseInt(element.data('moreless-cols-sm'));
		var datamd 			= parseInt(element.data('moreless-cols-md'));
		var datalg 			= parseInt(element.data('moreless-cols-lg'));


		// Options
		var propxs 			= (!isNaN(dataxs)) ? dataxs : 1;
		var propsm 			= (!isNaN(datasm)) ? datasm : 2;
		var propmd 			= (!isNaN(datamd)) ? datamd : 3;
		var proplg 			= (!isNaN(datalg)) ? datalg : propmd;
		var dataTarget 		= element.data('moreless-target');
		var dataClose 		= element.data('moreless-close');
		var dataTrigger		= element.data('moreless-toggle');
		var dataOther 		= element.data('moreless-other');
		var dataTracking 	= element.data('moreless-tracking');


		// Properties
		var isExpanded 				= false;
		var buttonTrigger 			= element.find(dataTrigger);
		var buttonTriggerStates 	= buttonTrigger.find('div');
		var buttonClose 			= element.find(dataClose);
		var otherContainers 		= element.find(dataOther);
		var columns					= 0;


		/**
		 * Init
		 */
		var init = function()
		{
			// Link buttons
			buttonTrigger.on('click', clickHandler);
			buttonClose.on('click', clickHandler);

			// Link resize handler
			ns.events.on(ns.event.RESIZE, resizeHandler);
			reset();
		};


		/**
		 * Click handler
		 * @param e
		 */
		var clickHandler = function(e)
		{
			// Prevent event
			e.preventDefault();

			// Toggle buttons
			buttonClose.toggleClass('active');
			buttonTriggerStates.toggleClass('active');

			// Toggle items
			isExpanded = !isExpanded;
			toggle(true, isExpanded);

			// Track click (only when opened)
			if (isExpanded) {
				ns.utils.tracking.multiTrack({
					'WT.z_event': 'Clicked',
					'WT.z_eventtype': 'see more',
					'WT.z_eventplace': dataTracking
				});
			}

			// Scroll to
			ns.root.animate({
				scrollTop: element.offset().top - 50
			}, {
				duration: ns.setting.ANIMATION_DURATION,
				ease: ns.setting.ANIMATION_EASE
			});
		};


		/**
		 * Window resize handler
		 */
		var resizeHandler = function()
		{
			if (!isExpanded) {
				reset();
			}
		};


		/**
		 * Reset the container and visible columns
		 */
		var reset = function()
		{
			var targets = null;
			var w = ns.screenWidth;

			// Calculate the number of columns to show
			if (w < ns.setting.BREAKPOINT_MOBILE_PLUS && propxs) {
				targets = (propxs - 1);
			} else if (w >= ns.setting.BREAKPOINT_TABLET && w < ns.setting.BREAKPOINT_DESKTOP && propsm) {
				targets = (propsm - 1);
			} else if (w >= ns.setting.BREAKPOINT_DESKTOP && w < ns.setting.BREAKPOINT_DESKTOP_PLUS && propmd) {
				targets = (propmd - 1);
			} else if (w >= ns.setting.BREAKPOINT_DESKTOP_PLUS && proplg) {
				targets = (proplg - 1);
			}

			// Check if this changed
			if (columns != targets) {
				columns = targets;

				// Toggle the minimum grid items to show
				var targetsToHide = element.find(dataTarget + ':gt(' + columns + ')');
				var targetsToShow = element.find(dataTarget + ':lt(' + (columns + 1) + ')');

				// Show trigger buttons if we have items to show
				var showTriggers = otherContainers.length > 0 || targetsToHide.length > 0;
				buttonTrigger.css('visibility', showTriggers ? 'visible' : 'hidden');
				buttonClose.css('visibility', showTriggers ? 'visible' : 'hidden');

				// Hide containers
				targetsToHide.hide();
				targetsToShow.show();
				otherContainers.hide();
			}
		};


		/**
		 * Toggle the containers and the columns
		 * @param animate: Animate if true
		 * @param show: Show or hide the,
		 */
		var toggle = function(animate, show)
		{
			if (animate) {
				if (show) {
					element.find(dataTarget + ':gt(' + columns + ')').fadeIn({
						duration: ns.setting.ANIMATION_DURATION,
						ease: ns.setting.ANIMATION_EASE
					});
					otherContainers.fadeIn({
						duration: ns.setting.ANIMATION_DURATION,
						ease: ns.setting.ANIMATION_EASE
					});
				} else {
					element.find(dataTarget + ':gt(' + columns + ')').fadeOut({
						duration: ns.setting.ANIMATION_DURATION,
						ease: ns.setting.ANIMATION_EASE
					});
					otherContainers.fadeOut({
						duration: ns.setting.ANIMATION_DURATION,
						ease: ns.setting.ANIMATION_EASE
					});
				}
			} else {
				if (show) {
					element.find(dataTarget + ':gt(' + columns + ')').show();
					otherContainers.show();
				} else {
					element.find(dataTarget + ':gt(' + columns + ')').hide();
					otherContainers.hide();
				}
			}
		};


		init();


		// Public methods
		return {};
	};


}(jQuery, tomtom));


(function($, ns)
{

	'use strict';


	// Namespace
	ns.components = ns.components || {};


	ns.components.ProductSelectorCard = function(element) {

		// properties
		var productCardFooter = element.find('.tt-product-selector-card-footer');
		var addToCardBtn = productCardFooter.find('.btn.btn-primary-branded');
		var form = element.find('form');
		var imageViewerMenu = element.find('.tt-image-viewer-menu');
		var screenSizeConfigurator = element.find('.tt-config-screen-sizes');

		/**
		 * Init
		 */
		var init = function() {
			// search for components
			ns.utils.scanner.scan(element, '.tt-config-screen-sizes', ns.components.ScreenSizeConfigurator);
			ns.utils.scanner.scan(element, '.tt-image-viewer-menu', ns.components.ImageViewerMenu);

			// add elements to the array to check if we need to enable or disable the hover state of the product selector card
			[element, addToCardBtn, screenSizeConfigurator, imageViewerMenu, form].forEach(function(item) {
				if(item) {
					item.hover(hoverOverHandler, hoverOutHandler);
				}
			});

			$(element).on('click', clickHandler);
		};

		// Check if element is a product card
		var isProductSelectorCard = function($elem) {
			return $elem.hasClass("tt-product-selector-card");
		}

		/**
		 * remove or add hover-intent for product selector
		 * @param evt
		 */
		var hoverOverHandler = function(evt) {
			if(!isProductSelectorCard($(evt.currentTarget))) {
				element.removeClass('hover-intent');
				$(element).off('click', clickHandler);
				return;
			};

			element.addClass('hover-intent');
			$(element).on('click', clickHandler);
		};

		var hoverOutHandler = function(evt) {
			if(!isProductSelectorCard($(evt.currentTarget))) {
				element.addClass('hover-intent');
				$(element).on('click', clickHandler);
				return;
			};

			element.removeClass('hover-intent');
			$(element).off('click', clickHandler);
		};

		/**
		 * get the active, read visible, learn more button from the footer of a product selector card
		 * @returns {*}
		 */
		var getActiveLearnMore = function() {
			return element.find('.tt-table-cell.active .tt-learn-more');
		}

		var clickHandler = function() {
			var href = getActiveLearnMore().attr('href');
			if(href){
				window.location = href;
			}
		};

		init();

		// Public methods
		return {};
	};


}(jQuery, tomtom));
(function($, ns)
{

	'use strict';


	// Namespace
	ns.components = ns.components || {};


	ns.components.ResizeByBreakpoint = function(element)
	{

		// Attributes
		var dataOperation 	= element.data('rbb-operation'); // can also be a string seperated by comma to get 2 values now, if so, make sure the rbb-breakpoint has also two values
		var dataTargets 	= element.data('rbb-targets');
		var dataBreakpoint 	= element.data('rbb-breakpoint');
		var images 			= element.find('.tt-responsive-image');


		if(dataOperation.indexOf(",") > -1 && dataBreakpoint.indexOf(",") > -1) {
			// we have comma seperated values, meaning an array :-)
			dataOperation = dataOperation.split(",");
			dataBreakpoint = dataBreakpoint.split(",");
			if(dataOperation.length > 2 || dataBreakpoint.length > 2) {
				// we don't use more than 2 values!
			}
		}


		// Properties
		var cache 			= [];
		var targets 		= [];
		var parents 		= [];
		var isCached 		= false;
		var isCleared 		= false;


		/**
		 * Init
		 */
		var init = function()
		{
			// Init
			initTargets();

			// Grab parents
			parents = element.parents();

			// Listen to load event from responsive images
			// This is needed to resize the elements once the images
			// are loaded and ready
			images.on(ns.event.LOADED, function() {
				isCached = false;
				resizeHandler();
			});

			// Listen to resize
			ns.events.on(ns.event.RESIZE, resizeHandler);
			resizeHandler();
		};


		/**
		 * Grab the resize targets
		 */
		var initTargets = function()
		{
			// Grab items
			var selectors = dataTargets.split(',');
			for (var i = 0; i < selectors.length; i++) {
				var item = element.find(selectors[i]);
				targets.push(item);
				cache.push(null);
			}
		};


		/**
		 * Resize triggers
		 */
		var resizeHandler = function()
		{
			if (evaluate(dataOperation)) {
				resize();
			} else {
				clear();
			}
		};


		/**
		 * Evaluate the resize operator
		 * @param op: Boolean operator
		 */
		var evaluate = function(op)
		{
			if(typeof op === "object") {
				if(Object.prototype.toString.call(op) === '[object Array]') {
					if(op[0].replace(/ /g, "") === '<=' && op[1].replace(/ /g, "") === '>=') {
						return (ns.screenWidth <= dataBreakpoint[0] || ns.screenWidth >= dataBreakpoint[1]);
					}
				}
			}
			if (op === '<') return ns.screenWidth < dataBreakpoint;
			if (op === '<=') return ns.screenWidth <= dataBreakpoint;
			if (op === '>') return ns.screenWidth > dataBreakpoint;
			if (op === '>=') return ns.screenWidth >= dataBreakpoint;
			return false;
		};


		/**
		 * Resize the targets
		 */
		var resize = function()
		{
			if (isCleared || !isCached) {

				// Make sure all elements are visible
				if (!isCached) {
					parents.addClass('calculate');
				}

				// Loop through the targets
				for (var i = 0; i < targets.length; i++)
				{
					// Properties for loop
					var height = 0;
					var heightPrev = cache[i];
					var elements = targets[i];

					// If we have a cached value then use that
					if (isCached && heightPrev != null) {
						elements.css('height', heightPrev + 'px');
						continue;
					}

					// Otherwise we need to loop over the different
					// elements and find the highest one.
					elements.each(function () {
						var element = $(this);
						element.removeAttr('style');
						if (element.height() > height) {
							height = element.height();
						}
					});

					// Set height of all elements
					if (height > 0) {
						elements.css('height', height + 'px');
						cache[i] = height;
					}
				}

				// Hide elements again
				if (!isCached) {
					parents.removeClass('calculate');
				}

				// Set cached once this function has run
				// We know have an Array of cached height values
				isCached = true;
				isCleared = false;
			}
		};


		/**
		 * Clear styles
		 */
		var clear = function()
		{
			if (!isCleared) {
				isCleared = true;
				for (var i = 0; i < targets.length; i++) {
					targets[i].removeAttr('style');
				}
			}
		};


		init();


		// Public methods
		return {};
	};


}(jQuery, tomtom));

(function($, ns)
{

	'use strict';


	// Namespace
	ns.components = ns.components || {};


	ns.components.ResponsiveImage = function(element)
	{

		// Properties
		var sources 			= element.find('span');
		var alt 				= element.data('alt');
		var prefix 				= null;
		var image 				= null;


		/**
		 * Init
		 */
		var init = function()
		{
			// Create image object
			image = $('<img src="" alt="' + alt + '"/>');
			image.on('load', loadHandler);

			// Get browser prefix
			prefix = getPrefix();

			// Listen to resize
			ns.events.on(ns.event.RESIZE, resizeHandler);
			update();
		};


		/**
		 * Resize handler
		 */
		var resizeHandler = function()
		{
			update();
		};


		/**
		 * Check images and find match based on media query
		 */
		var update = function()
		{
			// Matches array
			var matches = [];

			// Get widow width
			var width = ns.screenWidth;

			// Find the source that matches
			sources.each(function()
			{
				var source = $(this);
				var media = source.data('media');

				// Replace media tags
				if (media && window.matchMedia && media.indexOf('min-device-pixel-ratio') != -1) {
					if (prefix == 'webkit') media = media.replace('min-device-pixel-ratio: 2', '-webkit-min-device-pixel-ratio: 2');
					if (prefix == 'moz') media = media.replace('min-device-pixel-ratio: 2', 'min--moz-device-pixel-ratio: 2');
					if (prefix == 'o') media = media.replace('min-device-pixel-ratio: 2', '-o-min-device-pixel-ratio: 2/1');
				}

				if (!media) {
					matches.push(source);
				} else if (window.matchMedia && window.matchMedia(media).matches) {
					matches.push(source);
				} else if (isMatch(media, width)) {
					matches.push(source);
				}
			});

			// See if we have a match
			if (matches.length > 0) {
				var match = matches.pop();
				if (match[0] !== image[0].parentNode) {
					var src = match.data('src');
					if (src) {
						try {
							image.attr('src', src);
							match.append(image);
						} catch (e) {
							// Invalid SRC
						}
					}
				}
			} else {
				image.detach();
			}
		};


		/**
		 * Image load handler
		 */
		var loadHandler = function()
		{
			// Dispatch event
			element.trigger(ns.event.LOADED);
		};


		/**
		 * IE8 and IE9 matchmedia for responsive images
		 */
		var isMatch = function(media, width)
		{
			// Return if the media query contains a high pixel ratio
			// Since IE8 and IE9 don't support HDPI that is fine.
			if (media.indexOf('min-device-pixel-ratio: 2') != -1) {
				return false;
			}

			// If we found a min width then we can grab the pixel value
			// and compare that agains the screen width
			if (media.indexOf('min-width:') != -1) {
				var start = media.indexOf('min-width:');
				var end = media.indexOf('px', start);
				var px = parseInt(media.substring(start + 11, end));
				if (!isNaN(px)) {
					if (px <= width) {
						return true;
					}
				}
			}

			// Unknown query
			return false;
		};


		/**
		 * Get browser prefix
		 */
		var getPrefix = function ()
		{
			try {
				var styles = window.getComputedStyle(document.documentElement, '');
				var pre = (
					Array.prototype.slice
						.call(styles)
						.join('')
						.match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
					)[1];
				return pre;
			} catch (e) {
				return '';
			}
		};



		init();


		// Public methods
		return {};
	};

}(jQuery, tomtom));
(function($, ns)
{

	'use strict';


	// Namespace
	ns.components = ns.components || {};


	ns.components.ShareButtons = function(element)
	{

		// Properties
		var buttonFacebook 	= element.find('.tt-facebook');
		var buttonTwitter 	= element.find('.tt-twitter');
		var buttonGoogle 	= element.find('.tt-googleplus');


		/**
		 * Init
		 */
		var init = function()
		{
			buttonFacebook.on('click', function(e) {
				e.preventDefault();
				var button = $(e.target);
				var url = button.data('url');
				var share = 'https://www.facebook.com/sharer/sharer.php';
				share += '?s=100';
				share += '&p[url]=' + url;
				window.open(share, '_blank', 'width=660,height=300,scrollbars=no,toolbar=no,location=no,status=no,menubar=no');
			});

			buttonTwitter.on('click', function(e) {
				e.preventDefault();
				var button = $(e.target);
				var url = button.data('url');
				var text = button.data('text');
				var hashtags = button.data('hashtags');
				var share = 'http://twitter.com/intent/tweet' + '?url=' + encodeURIComponent(url) + '&text=' + encodeURIComponent(text) + '&hashtags=' + encodeURIComponent(hashtags);
				window.open(share, '_blank', 'width=660,height=300,scrollbars=no,toolbar=no,location=no,status=no,menubar=no');
			});

			buttonGoogle.on('click', function(e) {
				e.preventDefault();
				var button = $(e.target);
				var url = button.data('url');
				var share = 'https://plus.google.com/share?url=' + encodeURIComponent(url);
				window.open(share, '_blank', 'width=660,height=500,scrollbars=no,toolbar=no,location=no,status=no,menubar=no');
			});
		};


		init();


		// Public methods
		return {};
	};


}(jQuery, tomtom));



(function($, ns)
{

	'use strict';


	// Namespace
	ns.components = ns.components || {};


	ns.components.Shortcut = function(element)
	{

		// Properties
		var href 		= element.attr('href');
		var target 		= $(href);


		/**
		 * Init
		 */
		var init = function()
		{
			element.on('click', function(e) {
				e.preventDefault();
				ns.root.animate({
					scrollTop: target.offset().top
				}, {
					duration: ns.setting.ANIMATION_DURATION * 2,
					ease: ns.setting.ANIMATION_EASE
				});
			});
		};


		init();


		// Public methods
		return {};
	};

}(jQuery, tomtom));
(function($, ns)
{

	'use strict';


	// Namespace
	ns.components = ns.components || {};


	ns.components.SmartNavButton = function(element)
	{

		// Properties
		var button 				= element.clone(true);
		var nav 				= $('.tt-main-navigation-module');
		var navContainer 		= nav.find('.tt-gradient-border');
		var navContainerRight	= navContainer.find('.tt-nav-right');
		var fixed				= $('.tt-fixed');
		var smartNavComponent 	= null;
		var smartNavContainer 	= null;
		var position			= 0;
		var positionTop			= 0;
		var positionSwap		= 0;
		var scrollTop			= 0;
		var scrollTopPrev		= 0;
		var isVisible			= false;
		var animationTimeout	= null;
		var buttonWasVisible 	= false;

		/**
		 * Init
		 */
		var init = function()
		{
			// Wrap right nav with new container and button
			smartNavComponent = $('<div class="tt-smartnav-component-container"></div>');
			smartNavComponent.append(button);
			smartNavContainer = $('<div class="tt-smartnav-container"></div>');
			smartNavContainer.append(navContainerRight);
			smartNavContainer.append(smartNavComponent);
			navContainer.append(smartNavContainer);

			// Attach listeners
			ns.events.on(ns.event.SCROLL, scrollHandler);
			ns.events.on(ns.event.RESIZE, resizeHandler);

			hideButton();
			scrollHandler();
		};

		/**
		 * Om resize we just make sure that we position the
		 * button with the correct values
		 */
		var resizeHandler = function()
		{
			if (isVisible) {
				showButton();
			}
		};


		/**
		 * Check if we need to show or hide the button
		 */
		var scrollHandler = function()
		{
			// Save position
			positionTop = element.offset().top;
			scrollTop = ns.win.scrollTop();
			position = positionTop - scrollTop;

			// Calculate swap position:
			// Fixed height minus the button size
			positionSwap = fixed.height() - 40;

			// Check if we should show or hide the buttons
			if (!isVisible && position <= positionSwap) {
				isVisible = true;
				showButton();
			} else if (isVisible && position > positionSwap) {
				isVisible = false;
				hideButton();
			}

			checkNavigationState();

			scrollTopPrev = scrollTop;
		};


		/**
		 * Check navigation buttons on tablet and mobile
		 */
		var checkNavigationState = function()
		{
			// Check difference in scroll position for mobile
			// If the user has scrolled up, then we hide the sticky button
			// to give the user quick access to the navigation buttons
			// Note: We exclude IE8 and IE9 here due to window.innerHeight
			if (!ns.isIE8 && !ns.isIE9 && isVisible && ns.screenWidth <= ns.setting.BREAKPOINT_TABLET)  {

				// Check if we reached the bottom of the page
				var heightDoc = ns.doc.height();
				var heightWin = window.innerHeight;
				var space = heightDoc - (scrollTop + heightWin);

				if (space > 0) {
					if (scrollTop < scrollTopPrev) {
						hideButton();
						buttonWasVisible = false;
					} else if (scrollTop > scrollTopPrev) {
						showButton();
						buttonWasVisible = true;
					}
				}
			}
		};


		var showButton = function()
		{
			var mobile = ns.screenWidth <= ns.setting.BREAKPOINT_TABLET;

			// Set css based on screen width
			navContainerRight.css({
				top: mobile ? '-80px' : '0px',
				right: mobile ? '0px' : (smartNavComponent.width() + 20) + 'px'
			});
			smartNavComponent.css({
				top: '0px',
				right: '0px'
			});
		};


		var hideButton = function()
		{
			navContainerRight.removeAttr('style');
			smartNavComponent.removeAttr('style');
		};


		var behaviourAddToCardRequestHandler = function()
		{
			if (!isVisible || !buttonWasVisible && isVisible) {
				ns.events.trigger(ns.event.BEHAVIOUR_ADD_TO_CARD_REQUEST_ACK);
			} else {
				hideButton();
				clearTimeout(animationTimeout);
				animationTimeout = setTimeout(function() {
					ns.events.trigger(ns.event.BEHAVIOUR_ADD_TO_CARD_REQUEST_ACK);
				}, 250);
			}
		};

		var behaviourAddToCardFinishedHandler = function()
		{
			if (buttonWasVisible) {
				showButton();
			}
		};

		init();

		// Public methods
		return {
			addToCardRequest: behaviourAddToCardRequestHandler,
			addToCardFinished: behaviourAddToCardFinishedHandler
		};
	}

}(jQuery, tomtom));
(function($, ns)
{

	'use strict';


	// Namespace
	ns.components = ns.components || {};


	ns.components.ToggleButton = function(element)
	{

		// Properties
		var type = element.data('toggle-type');


		/**
		 * Init
		 */
		var init = function()
		{
			element.on('click', function(e)
			{
				// Some toggle elements (like a product card) can have an add to basket button
				// in that case we want to make sure that link is working. All other clicks can
				// trigger the toggle action
				if (!clickedBasket(e)) {

					// Block normal event
					e.preventDefault();

					// Disable bubbeling if needed
					if (type != ns.setting.TOGGLE_COLOR) {
						e.stopImmediatePropagation();
					}

					// Dispatch toggle event
					element.trigger({
						type: ns.event.TOGGLE,
						toggleElement: element,
						toggleType: type
					});
				}
			});
		};


		/**
		 * Filter clicks on baskets
		 * @param target
		 */
		var clickedBasket = function(e)
		{
			// Check if we clicked on an add to basket button, if so, we dont block the event
			var target = $(e.target);
			return (target.hasClass('btn-basket') || target.parent().hasClass('btn-basket'));
		};


		init();


		// Public methods
		return {};
	};

}(jQuery, tomtom));
(function($, ns)
{

	'use strict';


	// Namespace
	ns.components = ns.components || {};


	ns.components.Tracking = function(element)
	{

		// Properties
		var data 		= element.data('tracking');
		var overwrite 	= element.data('tracking-overwrite');
		var simple		= (typeof data == 'string');


		/**
		 * Init
		 */
		var init = function()
		{
			// Track cart button
			if (Modernizr.touch) {
				element.on('touchstart', clickHandler);
			} else {
				element.on('mousedown', clickHandler);
			}
		};


		/**
		 * Track the clicked element
		 */
		var clickHandler = function()
		{
			if (simple) {
				ns.utils.tracking.track(data, overwrite);
			} else {
				ns.utils.tracking.multiTrack(data);
			}
		};


		init();


		// Public methods
		return {};
	};

}(jQuery, tomtom));
(function($, ns)
{

	'use strict';


	// Namespace
	ns.components = ns.components || {};


	ns.components.Video = function(element)
	{

		// Properties
		var url 			= element.data('url');
		var parent 			= element.data('parent');
		var title 			= element.data('video-title');
		var triggers 		= element.data('triggers');
		var autoPlay		= element.data('auto-play') || false;
		var triggersEl		= element.closest(parent).find(triggers);
		var target 			= element.find('.tt-video');
		var controls 		= element.find('.tt-video-controls');
		var controlsEl 		= controls.find('[data-video-control]');
		var display			= null;
		var video 			= null;
		var videoEl			= null;
		var id 				= null;
		var isActive 		= false;
		var isFullscreen 	= false;
		var tracked			= 0;
		var isOutView 		= false;

		// SDL buttons
		var buttonFullscreen 		= null;
		var buttonFullscreenExit 	= null;
		var buttonPlay 				= null;
		var buttonPause 			= null;

		/**
		 * Init
		 */
		var init = function()
		{
			// Link trigger button
			triggersEl.on('click', clickHandler);

			// Set metadata field
			ns.utils.meta.setMetaData('WT.z_videoPage', '1');

			// Disable click events on module
			// So links around video elements wont trigger
			element.on('click', function(e) {
				e.preventDefault();
				e.stopImmediatePropagation();
			});

			// Autoplay on bigger resolutions
			if(ns.screenWidth >= ns.setting.BREAKPOINT_DESKTOP) {
				listenToScrollEvents();

				if(autoPlay) {
					triggersEl.trigger('click');
				}
			};

			// when window has focus play video, but only when visible in view
			ns.events.on(ns.event.FOCUS, function() {
				if(isActive && !isOutView) {
					playVideo();
				}
			});

			// when window has no focus pause videos
			ns.events.on(ns.event.BLUR, function() {
				if(isActive) {
					pauseVideo();
				}
			});
		};

		/**
		 * ListenToScrollEvents
		 * checks if a video is out of the window
		 */
		var listenToScrollEvents = function() {
			ns.events.on(ns.event.SCROLL, function() {
				if(!ns.utils.client.isElementInViewport(element, 0.5) && isActive && !isOutView) {
					isOutView = true;
					pauseVideo();
					//console.log("PAUSE VIDEO, WE ARE OUT OF THE VIEW");
				} else if(ns.utils.client.isElementInViewport(element, 0.5) && isActive && isOutView) {
					isOutView = false;
					playVideo();
					//console.log("PLAY VIDEO, WE ARE IN VIEW");
				}
			});
		};

		/**
		 * Click handler for video buttons
		 */
		var clickHandler = function(e)
		{
			// Return if a video is already playing
			if (isActive) {
				return;
			}

			// Prevent link click
			e.preventDefault();
			e.stopImmediatePropagation();

			// If we already played the video then we can just toggle
			// the visibility and resume the video
			if (element.hasClass('inactive')) {
				element.removeClass('inactive');
				element.addClass('active');
				isActive = true;
				resizeHandler();
				playVideo();
				return;
			}

			// Video starts playing automatically, so we will track the 'play' event right away
			trackVideoEvent('play');

			// New video: We need to load a new SDL video player
			// The video player needs to have a unique ID to load
			// We will create a unique id and assign it to the video target
			if (id == null) {
				id = new Date().getTime();
				target.attr('id', id);
			}

			// Show the module
			element.removeClass('inactive');
			element.addClass('active');
			isActive = true;

			// Link video controls
			controlsEl.each(function() {
				var el = $(this);
				var type = el.attr('data-video-control');
				switch (type) {
					case 'close':
						el.on('click', closeClickHandler);
					break;
				}
			});

			// Listen to player ready event
			target.on(ns.event.VIDEO_PAYER_READY, setup);

			// Load the video player script
			$.getScript(url + '&trgt=' + id);

			// TODO: Fix better version of the AJAX loading of the video player
			// LOAD: https://tomtom.dist.sdlmedia.com/distributions/embed/?o=840d8214-cf89-4901-b15d-b9099144c40d
			// LOADS: https://tomtom.dist.sdlmedia.com/Distributions/player_html5/javascriptstring.asp?o=840d8214-cf89-4901-b15d-b9099144c40d&standalone=1&isEmbed=1&distributionStatisticsId={d15d8c72-e817-4364-a9ab-452eb931fc0e}
			// GET ID: url.substr(url.indexOf('?') + 2);
		};


		/**
		 * Setup video controls, events, etc
		 */
		var setup = function()
		{
			// Clear listeners
			target.off(ns.event.VIDEO_PAYER_READY, setup);

			// Grab video element
			video = target.find('video');
			videoEl = video[0];

			// Pause the video element when we are not active
			// This can happen when we close the video container
			// before the video is loaded.
			if (!isActive) {
				pauseVideo();
			}

			// Grab display element
			display = target.find('.ppdisplay');

			// Listen to events
			video.on('webkitendfullscreen', videoEndedHandler);
			video.on('ended', videoEndedHandler);
			video.on('progress', videoProgressHandler);
			video.on('loadedmetadata', resizeHandler);


			// SDL Media player controls
			buttonFullscreen = element.find('.ppfsenter');
			buttonFullscreenExit = element.find('.ppfsexit');
			buttonPlay = element.find('.ppplay');
			buttonPause = element.find('.pppause');

			// Link events to these buttons
			buttonFullscreen.on('click', function() {
				enterFullscreenMode();
			});
			buttonFullscreenExit.on('click', function(){
				exitFullscreenMode();
			});
			buttonPlay.on('click', function(){
				trackVideoEvent('play');
			});
			buttonPause.on('click', function(){
				trackVideoEvent('pause');
			});

			// Link keyboard events to grab ESC button
			ns.doc.keydown(keyDownHandler);

			// Resize video element
			ns.events.on(ns.event.RESIZE, resizeHandler);
			resizeHandler();

			if(autoPlay && !ns.utils.client.isElementInViewport(element, 0.5)) {
				pauseVideo();
				//console.log("AUTOPLAY BUT NOT VISIBLE");
			} else if(autoPlay && ns.utils.client.isElementInViewport(element, 0.5)) {
				playVideo();
				//console.log("AUTOPLAY AND VISIBLE");
			} else {
				//console.log("NORMAL");
				playVideo();
			}
		};

		/**
		 * EnterFullscreenMode
		 */
		var enterFullscreenMode = function() {
			element.addClass('tt-video-fullscreen');
			isFullscreen = true;
			buttonFullscreen.removeClass('activemain');
			buttonFullscreen.addClass('inactive');
			buttonFullscreenExit.addClass('activemain');
			buttonFullscreenExit.removeClass('inactive');
			resizeHandler();
		};

		/**
		 * ExitFullscreenMode
		 */
		var exitFullscreenMode = function() {
			element.removeClass('tt-video-fullscreen');
			isFullscreen = false;
			buttonFullscreenExit.removeClass('activemain');
			buttonFullscreenExit.addClass('inactive');
			buttonFullscreen.addClass('activemain');
			buttonFullscreen.removeClass('inactive');
			resizeHandler();
		};


		/**
		 * Resize video element to match viewport
		 */
		var resizeHandler = function()
		{
			// Get container and video size
			var boundsWidth = element.width();
			var boundsHeight = element.height();
			var videoWidth = videoEl.videoWidth;
			var videoHeight = videoEl.videoHeight;

			// Output size
			var scaledX = 0;
			var scaledY = 0;
			var scaledWidth = boundsWidth;
			var scaledHeight = boundsHeight;

			// If we have a video size then scale the video to fit the container
			if (videoWidth > 0 && videoHeight > 0)
			{
				// Scale to fit
				scaledWidth = boundsWidth;
				scaledHeight = boundsWidth * (videoHeight / videoWidth);
				if (scaledHeight > boundsHeight) {
					scaledWidth = boundsHeight * (videoWidth / videoHeight);
					scaledHeight = boundsHeight;
				}

				// Center video
				scaledX = (boundsWidth - scaledWidth) * 0.5;
				scaledY = (boundsHeight - scaledHeight) * 0.5;

				// Round values
				scaledX = Math.round(scaledX);
				scaledY = Math.round(scaledY);
				scaledWidth = Math.round(scaledWidth);
				scaledHeight = Math.round(scaledHeight);
			}

			// Set the size
			display.css({
				'left': scaledX + 'px',
				'top': scaledY + 'px',
				'width': scaledWidth + 'px',
				'height': scaledHeight + 'px'
			});

			if(ns.screenWidth < ns.setting.BREAKPOINT_DESKTOP) {
				checkFullscreenVideoMode();
				showFullscreenControls(false);
			} else {
				showFullscreenControls(true);
			}
		};

		/**
		 * ShowFullscreenControls
		 * @param isVisible - Boolean
		 * we show or hide the fullscreen controls
		 */
		var showFullscreenControls = function(isVisible) {
			if(isVisible) {
				buttonFullscreen.removeClass("hidden");
				buttonFullscreenExit.removeClass("hidden");
			} else {
				buttonFullscreen.addClass("hidden");
				buttonFullscreenExit.addClass("hidden");
			}
		};

		/**
		 * Key down handler
		 * @param e: Keyboard event
		 */
		var keyDownHandler = function(e)
		{
			if (isActive && isFullscreen && e.keyCode == 27) {
				element.removeClass('tt-video-fullscreen');
				isFullscreen = false;
			}
		};


		/**
		 * Close button click handler
		 * @param e: Mouse event
		 */
		var closeClickHandler = function(e)
		{
			// Click normal event
			e.preventDefault();
			e.stopImmediatePropagation();

			// Pause video
			pauseVideo();

			// Hide module
			element.removeClass('active');
			element.addClass('inactive');
			element.removeClass('tt-video-fullscreen');
			ns.body.css('overflow', '');
			isActive = false;
			isFullscreen = false;
		};


		/**
		 * The video is in progress
		 */
		var videoProgressHandler = function()
		{
			// Grab duration and current time
			var duration = parseFloat(videoEl.duration);
			var time = parseFloat(videoEl.currentTime);

			// Return if either duration or current time are unknown
			if (isNaN(duration) || duration == 0 ||
				isNaN(time) || time == 0) {
				return;
			}

			// Grab percentage and track 25%, 50% and 75%
			var percentage = Math.round((time / duration) * 100);

			if (tracked < 75 && percentage >= 75) {
				tracked = 75;
				trackVideoEvent('progress', '75');
			} else if (tracked < 50 && percentage >= 50) {
				tracked = 50;
				trackVideoEvent('progress', '50');
			} else if (tracked < 25 && percentage >= 25) {
				tracked = 25;
				trackVideoEvent('progress', '25');
			}
		};


		/**
		 * The video is ended
		 */
		var videoEndedHandler = function()
		{
			// Reset video
			pauseVideo();
			resetVideo();

			// Track event in WebTrends
			trackVideoEvent('end');

			// Hide module
			element.removeClass('active');
			element.addClass('inactive');
			element.removeClass('tt-video-fullscreen');
			ns.body.css('overflow', '');
			isActive = false;
			isFullscreen = false;
		};

		/**
		 * Go fullscreen when lower than 1024
		 */
		var checkFullscreenVideoMode = function() {
			if(ns.screenWidth < ns.setting.BREAKPOINT_DESKTOP && !isFullscreen) {
				enterFullscreenMode();
			} else if(ns.screenWidth >= ns.setting.BREAKPOINT_DESKTOP && isFullscreen) {
				exitFullscreenMode();
			}
		};

		/**
		 * Play or resume the video
		 */
		var playVideo = function()
		{
			if (videoEl != null) {
				videoEl.play();

				checkFullscreenVideoMode();
			}
		};


		/**
		 * Stop the video
		 */
		var pauseVideo = function()
		{
			if (videoEl != null) {
				videoEl.pause();
			}
		};


		/**
		 * Stop and reset the video
		 */
		var resetVideo = function()
		{
			if (videoEl != null) {
				videoEl.currentTime = 0;
			}
		};


		/**
		 * Track video event
		 * @param event: Event name
		 * @param progress: Optional progress
		 */
		var trackVideoEvent = function(event, progress)
		{
			if (typeof progress == 'undefined') {
				ns.utils.tracking.multiTrack({
					'WT.clip_n': title,
					'WT.clip_ev': event,
					'WT.dl': '41'
				});
			} else {
				ns.utils.tracking.multiTrack({
					'WT.clip_n': title,
					'WT.clip_ev': event,
					'WT.clip_perc': progress,
					'WT.dl': '41'
				});
			}
		};


		init();


		// Public methods
		return {};
	};

}(jQuery, tomtom));
(function($, ns)
{

	'use strict';


	// Namespace
	ns.modules = ns.modules || {};


	ns.modules.App = function()
	{

		// Properties
		var navigation 			= null;
		var countrySelector 	= null;
		var filter 				= null;
		var quotes 				= null;
		var banner 				= null;
		var back				= null;
		var deeplink 			= null;
		var tabs 				= null;
		var productSeo 			= null;
		var cookieBar 			= null;
		var cookieSettings 		= null;
		var notificationForm	= null;

		/**
		 * Init
		 */
		var init = function()
		{

			// Initialize the components
			ns.utils.scanner.scan(ns.body, '.tt-responsive-image', ns.components.ResponsiveImage);
			ns.utils.scanner.scan(ns.body, '.tt-social-button', ns.components.ShareButtons);
			ns.utils.scanner.scan(ns.body, '.tt-shortcut', ns.components.Shortcut);
			ns.utils.scanner.scan(ns.body, '.tt-link', ns.components.Link);
			ns.utils.scanner.scan(ns.body, '.tt-video-module', ns.components.Video);
			ns.utils.scanner.scan(ns.body, '[data-rbb-targets]', ns.components.ResizeByBreakpoint);
			ns.utils.scanner.scan(ns.body, '[data-moreless-toggle]', ns.components.MoreLess);
			ns.utils.scanner.scan(ns.body, '[data-tracking]', ns.components.Tracking);
			ns.utils.scanner.scan(ns.body, 'a > span.icon-basket, a.add-to-basket', ns.behaviour.AddToCard);

			// Initialize the modules (controllers)
			//cookieBar = new ns.modules.CookieBar();    // TODO : Turn on again, just for dev reasons
			cookieSettings = new ns.modules.CookieSettings();
			navigation = new ns.modules.Navigation();
			countrySelector = new ns.modules.CountrySelector();
			filter = new ns.modules.Filter();
			quotes = new ns.modules.Quotes();
			banner = new ns.modules.Banner();
			back = new ns.modules.Back();
			deeplink = new ns.modules.Deeplink();
			tabs = new ns.modules.Tabs(deeplink);
			productSeo = new ns.modules.ProductSeo();
			notificationForm = new ns.modules.NotificationFormModule();

			// WT: Set tracking data
			ns.utils.tracking.setMetaData();

			// GWT: Set legacy locale
			setTimeout(setCookie, 5000);
			setCookie();

			// Setup resize listener
			ns.win.on('resize', function() {
				ns.screenWidth = ns.utils.client.width();
				ns.screenHeight = ns.utils.client.height();
				ns.events.trigger(ns.event.RESIZE);
			});

			// Setup scroll listener
			ns.win.on('scroll', function() {
				ns.events.trigger(ns.event.SCROLL);
			});


			setupWindowVisibilityHandlers();
		};

		/**
		 * SetupWindowVisibilityHandlers
		 * Checks PageVisibility API otherwise we use blur and focus events
		 * Example: @see ComponentVideo.js init.
		 */
		var setupWindowVisibilityHandlers = function() {
			var visibilityChange;
			var hidden;

			if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
				hidden = "hidden";
				visibilityChange = "visibilitychange";
			} else if (typeof document.mozHidden !== "undefined") {
				hidden = "mozHidden";
				visibilityChange = "mozvisibilitychange";
			} else if (typeof document.msHidden !== "undefined") {
				hidden = "msHidden";
				visibilityChange = "msvisibilitychange";
			} else if (typeof document.webkitHidden !== "undefined") {
				hidden = "webkitHidden";
				visibilityChange = "webkitvisibilitychange";
			} else {
				// IE 8 and IE 9
				ns.win.on('blur', function() {
					ns.events.trigger(ns.event.BLUR);
				});

				ns.win.on('focus', function() {
					ns.events.trigger(ns.event.FOCUS);
				});
			}

			if(hidden && visibilityChange) {
				ns.doc.on(visibilityChange, function() {
					ns.events.trigger( document[hidden] ? ns.event.BLUR : ns.event.FOCUS );
				});
			}
		};

		/**
		 * Set legacy locale overwrite cookie
		 */
		var setCookie = function()
		{
			var locale = ns.body.data('legacy-locale');
			ns.utils.cookie.save(ns.setting.COOKIE_LOCALE, locale, 365);
		};


		init();


		// Public methods
		return {};
	};

}(jQuery, tomtom));
(function($, ns)
{

	'use strict';


	// Namespace
	ns.modules = ns.modules || {};


	ns.modules.Back = function()
	{

		// Properties
		var shop		= $('#shop_page_url');
		var buttons 	= $('.tt-link-back');
		var url			= null;


		/**
		 * Init
		 */
		var init = function()
		{
			initHistory();
			initBackButtons();
			initListeners();
		};


		/**
		 * Init the history cookie and set the GWT previous page reference
		 */
		var initHistory = function()
		{
			// Read previous and current url
			url = ns.utils.cookie.load(ns.setting.COOKIE_HISTORY);

			// Set the GWT shop history
			if (url != null) {
				shop.attr('href', url);
			} else {
				shop.attr('href', 'javascript:window.history.back()');
			}
		};


		/**
		 * Init the back buttons
		 */
		var initBackButtons = function()
		{
			// Get referrer and check if we got to this page via a request from the same host
			var referrer = document.referrer;
			var hostname = document.location.hostname;
			var history = window.history;
			var show = history.length > 1 && (referrer != null && referrer != '' && referrer.indexOf(hostname) != -1);

			// Loop though the buttons
			buttons.each(function()
			{
				// Show the button if the above check is valid
				// or we have an overwrite situation
				var button = $(this);
				var href = button.attr('href');
				if (show || href != '') {
					button.css('display', 'block');
				}

				// If the back button has a HREF attribute then we should
				// use that url as the back url. If the HREF attribute is empty
				// we should use the normal browser back functionality
				if (href == '') {
					button.on('click', function(e) {
						e.preventDefault();
						window.history.back();
					});
				}
			});
		};


		/**
		 * Init the listeners on the buy buttons
		 */
		var initListeners = function()
		{
			// Buttons to find
			var selectors = [
				'.btn-basket',
				'.gwtWrapper .buy-button',
				'.gwtWrapper #gwtVoicePortalWidget .button-red-arrowRight',
				'.gwtWrapper #gwtVoicePortalWidget .button-goForward'
			].join(',');

			// Track cart button
			if (Modernizr.touch) {
				ns.doc.on('touchstart', selectors, clickHandler);
			} else {
				ns.doc.on('mousedown', selectors, clickHandler);
			}
		};


		/**
		 * Buy button click handler
		 */
		var clickHandler = function()
		{
			// Grab the current url
			var url = window.location.href;

			// Set the previous url if we are not on a checkout page
			if (url.indexOf('checkout') == -1) {
				ns.utils.cookie.save(ns.setting.COOKIE_HISTORY, url, 1);
			}
		};


		init();


		// Public methods
		return {};
	};

}(jQuery, tomtom));
(function($, ns)
{

	'use strict';


	// Namespace
	ns.modules = ns.modules || {};


	ns.modules.Banner = function()
	{

		// Properties
		var element 			= $('.tt-banner-module');
		var elementPreview 		= $('.tt-banner-preview-module');
		var bannerPreview 		= null;
		var carousel 			= null;


		/**
		 * Init
		 */
		var init = function()
		{
			// Return if banner element is not found
			if (element.length == 0) {
				return;
			}

			// If we have at a certain point a quote carousel on a page,
			// we need to make sure we grab the carousel of the Banner Module
			carousel = element.find('.carousel');

			// Init carousel
			carousel.carousel({
				interval: 8000
			});

			// Swipe listeners
			carousel.swiperight(function() {
				carousel.carousel('prev');
			});
			carousel.swipeleft(function() {
				carousel.carousel('next');
			});

			// Return if banner preview element is not found
			if (elementPreview.length == 0) {
				return;
			}

			// Create sub controller
			bannerPreview = new ns.modules.BannerPreview(elementPreview);

			// Link both
			carousel.on(ns.event.BOOTSTRAP_CAROUSEL, function(obj) {
				bannerPreview.updatePosition(obj.direction);
			});
		};


		init();


		// Public methods
		return {
			open: open
		};
	};

}(jQuery, tomtom));
(function($, ns)
{

	'use strict';


	// Namespace
	ns.modules = ns.modules || {};


	ns.modules.BannerPreview = function(container)
	{

		// Properties
		var width 		= 0;
		var target 		= null;
		var active 		= null;


		/**
		 * Init
		 */
		var init = function()
		{
			// Find small banners
			target = container.find('.tt-animate-content');

			// Reverse the elements in the animation container
			var elements = target.find('div[class*="col-"]').get().reverse();
			target.empty();
			target.append(elements);

			// Check if we have an active index set, if so animate
			active = target.children().last();
			$(active).detach();
		};


		/**
		 * Update position of the banners
		 * @param direction
		 */
		var updatePosition = function(direction)
		{
			width = container.outerWidth() / 3;

			if (direction == 'left') {
				target.prepend(active);
				target.css('left', -width);
				animateContainer(0, direction);
			} else if (direction == 'right') {
				target.append(active);
				animateContainer(-(width), direction);
			}
		};


		/**
		 * Animate container
		 * @param left
		 * @param direction
		 */
		var animateContainer = function(left, direction)
		{
			target.animate({
				left: left
			}, {
				duration: ns.setting.ANIMATION_DURATION * 2,
				ease: ns.setting.ANIMATION_EASE,
				complete: function() {
					if (direction == 'left') {
						active = target.children().last();
						$(active).detach();
					} else if (direction == 'right') {
						active = target.children().first();
						$(active).detach();
					}
					target.css('left', 0);
				}
			});
		};


		init();


		// Public methods
		return {
			updatePosition: updatePosition
		};

	};

}(jQuery, tomtom));
(function($, ns)
{

	'use strict';


	// Namespace
	ns.modules = ns.modules || {};


	ns.modules.CookieBar = function()
	{

		// Properties
		var panels			= $('.tt-container-panels');
		var module			= $('.tt-cookie-bar-module');
		var fixed			= $('.tt-fixed');
		var version			= null;
		var buttonAccept	= null;
		var localData 		= null;
		var isAtTop 		= true;
		var padding			= 80; // Body padding
		var height			= 0;


		/**
		 * Init
		 */
		var init = function()
		{
			// Return if module is not found
			if (module.length == 0) {
				return;
			}

			// Remove the cookiebar
			module.detach();

			// Grab version and options
			version = module.data('version');

			// Load cookie data
			load();

			// If the user has not accepted the cookies or the version is changed
			// the we show the cookie bar to the user
			if (!localData.accepted || localData.version !== version) {
				showCookieBar();
			}
		};


		/**
		 * Show the cookie bar
		 */
		var showCookieBar = function()
		{
			// Link the accept button
			buttonAccept = module.find('.btn-accept');
			buttonAccept.on('click', onAcceptClicked);

			// Show module
			module.css('display', 'block');

			// Insert the module on top
			if (ns.screenWidth >= ns.setting.BREAKPOINT_TABLET)
			{
				// Inset before the navigation
				fixed.prepend(module);

				// Grab module size and add body padding
				height = module.height() + padding;

				// Slide in the module
				module.hide().delay(500).slideToggle({
					duration: ns.setting.ANIMATION_DURATION,
					ease: ns.setting.ANIMATION_EASE
				});

				// Slide the panels down
				panels.delay(500).animate({
					top: height
				}, {
					duration: ns.setting.ANIMATION_DURATION,
					ease: ns.setting.ANIMATION_EASE
				});

				// Increase the padding to make room for the cookie bar
				ns.body.delay(500).animate({
					paddingTop: height
				}, {
					duration: ns.setting.ANIMATION_DURATION,
					ease: ns.setting.ANIMATION_EASE
				});
			}
			else
			{
				// Insert at the bottom
				ns.body.append(module);
				module.addClass('tt-cookie-mobile');
				module.css('bottom', -module.height());

				// Animate in place
				if (Modernizr.touch) {
					module.css({
						bottom: '0px',
						transition: 'bottom 5s'
					});
				} else {
					module.delay(500).animate({
						bottom: 0
					}, {
						duration: ns.setting.ANIMATION_DURATION,
						ease: ns.setting.ANIMATION_EASE
					});
				}
			}

			ns.events.on(ns.event.RESIZE, resizeHandler);
			ns.events.on(ns.event.USER_SETTINGS_SAVED, removeCookieBar);
		};


		/**
		 * Remove the cookie bar
		 */
		var removeCookieBar = function()
		{
			// Remove event listeners
			ns.events.off(ns.event.RESIZE, resizeHandler);
			ns.events.off(ns.event.USER_SETTINGS_SAVED, removeCookieBar);

			// Remove module
			buttonAccept.off('click', onAcceptClicked);
			module.remove();
			ns.body.removeAttr('style');
			panels.removeAttr('style');
		};


		/**
		 * Window resize handler
		 */
		var resizeHandler = function()
		{
			if (ns.screenWidth >= ns.setting.BREAKPOINT_TABLET) {
				if (!isAtTop) {
					placeAtTop();
				} else {
					height = module.height() + padding;
					ns.body.css('padding-top', height);
					panels.css('top', height);
				}
			} else {
				if (isAtTop) {
					placeAtBottom();
				}
			}
		};


		/**
		 * Place bar at the top of the page
		 * This is the position for dekstop
		 */
		var placeAtTop = function()
		{
			if (!isAtTop) {
				isAtTop = true;
				module.removeClass('tt-cookie-mobile');
				fixed.prepend(module);
				height = module.height() + padding;
				ns.body.css('padding-top', height);
				panels.css('top', height);
			}
		};


		/**
		 * Place bar at the bottom of the page
		 * This is the position for mobile
		 */
		var placeAtBottom = function()
		{
			if (isAtTop) {
				isAtTop = false;
				module.addClass('tt-cookie-mobile');
				ns.body.append(module);
				ns.body.removeAttr('style');
				panels.removeAttr('style');
			}
		};


		/**
		 * Load properties
		 */
		var load = function()
		{
			// Load data from cookie
			localData = ns.utils.cookie.loadCookieOptions({
				version: version,
				accepted: false,
				all: false,
				options: {}
			});
		};


		/**
		 * Save properties
		 */
		var onAcceptClicked = function()
		{
			// Set the correct values
			localData = ns.utils.cookie.saveCookieOptions({
				version: version,
				accepted: true,
				all: true,
				options: {}
			});
		};


		init();


		// Public methods
		return {};
	};

}(jQuery, tomtom));
(function($, ns)
{

	'use strict';


	// Namespace
	ns.modules = ns.modules || {};


	ns.modules.CookieSettings = function()
	{

		// Properties
		var module 			= $('.tt-cookie-settings-module');
		var version			= null;
		var button 			= null;
		var localData 		= null;
		var options			= [];


		/**
		 * Init
		 */
		var init = function()
		{
			// Return if module is not found
			if (module.length == 0) {
				return;
			}

			// Grab options and save button
			version = module.data('version');
			button = $('.tt-secondary-navigation-module .tt-right').find('a');

			// Grab checkboxes
			var elements = $('[data-option]');
			elements.each(function() {
				var element = $(this);
				var option = element.data('option');
				var checkbox = element.find('input');
				options.push({
					name: option,
					checkbox: checkbox
				});
			});

			// Load the data
			ns.events.on(ns.event.USER_SETTINGS_SAVED, load);
			load();

			// Link listeners
			button.on('click', onSaveClicked);
		};


		/**
		 * Green save button clicked
		 * @param e
		 */
		var onSaveClicked = function(e)
		{
			// Don't open link
			e.preventDefault();

			// Track data
			ns.utils.tracking.track('cookie-save');

			// Update the data for cookie
			localData.version = version;
			localData.accepted = true;
			localData.all = true;
			localData.options = {};

			// Loop through the options
			for (var i = 0; i < options.length; i++)
			{
				// Grab checkbox value and if it's is not selected
				// then set the 'all selected' property to false
				var selected = options[i].checkbox.prop('checked');
				if (!selected) {
					localData.all = false;
				}

				// Save option in the local cookie data
				localData.options[options[i].name] = selected;
			}

			// Save the data
			ns.utils.cookie.saveCookieOptions(localData);
		};


		/**
		 * Load values from storage and update checkboxes
		 */
		var load = function()
		{
			// Load the data from the cookie
			localData = ns.utils.cookie.loadCookieOptions({
				version: version,
				accepted: false,
				all: false,
				options: {}
			});

			// Return if not accepted
			if (localData.accepted == false) {
				return;
			}

			// Set the checkboxes based on the loaded data
			for (var i = 0; i < options.length; i++) {
				if (localData.all == true) {
					options[i].checkbox.prop('checked', true);
				} else if (options[i].name in localData.options) {
					options[i].checkbox.prop('checked', localData.options[options[i].name]);
				}
			}
		};


		init();


		// Public methods
		return {};
	};

}(jQuery, tomtom));
(function($, ns)
{

	'use strict';


	// Namespace
	ns.modules = ns.modules || {};


	ns.modules.CountrySelector = function()
	{

		// Properties
		var module 					= $('.tt-countries-module');
		var countryList 			= $('.tt-country-list');
		var countrySelectorButton 	= $('.tt-country-selector-btn');
		var countrySelectorBody 	= $('.tt-country-selector-body');
		var countrySelectorFooter 	= $('.tt-container-country-selector-trigger');
		var countryContent			= $('.tt-countries-content');
		var countries				= countryList.find('a[data-toggle="tab"]');
		var country 				= countrySelectorFooter.find('.tt-country');
		var language 				= countrySelectorFooter.find('.tt-language');
		var iconUp 					= countrySelectorFooter.find('.icon-up');
		var iconClose 				= countrySelectorFooter.find('.icon-close');
		var nav 					= $('nav');
		var isOpen 					= false;


		/**
		 * Init
		 */
		var init = function()
		{
			// Link the selector button
			countrySelectorButton.on('click', toggle);

			// Block keyboard events (to fix GWT login form error)
			countrySelectorButton.on('keydown', function(e) {
				if (e.keyCode == ns.setting.KEYCODE_ENTER || e.keyCode == ns.setting.KEYCODE_SPACE) {
					e.preventDefault();
				}
			});

			// When you click on a country we set the active one
			// The Bootstrap tab component will show the languages
			countries.on('click', function(e) {
				e.preventDefault();
				var active = countryList.find('li.active:not(' + e.target.hash + ')');
				active.removeClass('active');
			});
		};


		/**
		 * Toggle function
		 */
		var toggle = function()
		{
			if (!isOpen) {
				open();
			} else {
				close();
			}
		};


		/**
		 * Open the countries selector
		 */
		var open = function()
		{
			// Show correct icon
			iconUp.hide();
			iconClose.show();

			// Calculate max screen height
			var heightFooter = countrySelectorFooter.height();
			var heightNav = nav.height();
			var heightScreen = ns.screenHeight - heightFooter - heightNav;

			// Toggle size
			var smallScreen = ns.screenWidth < ns.setting.BREAKPOINT_DESKTOP;
			countrySelectorBody.css('max-height', smallScreen ? heightScreen + 'px' : 'none');
			countryList.css('max-height', smallScreen ? heightScreen + 'px' : 'none');

			// Toggle scroll
			countryList.addClass('tt-scroll');

			// Save current scroll position
			var scroll = ns.doc.scrollTop();

			// Open content
			// On mobile we just open the content block and scroll down
			// On desktop we animate the content block and keep the
			// page scrolled down on each step
			if (smallScreen && Modernizr.touch) {
				countryContent.css('display', 'block');
				ns.doc.scrollTop(scroll + countryContent.height());
			} else {
				countryContent.slideDown({
					duration: ns.setting.ANIMATION_DURATION,
					ease: ns.setting.ANIMATION_EASE,
					progress: function () {
						var height = countryContent.height();
						module.css('height', height + 'px');
						ns.doc.scrollTop(scroll + height);
					}
				});
			}

			// Set flag
			isOpen = true;
		};


		/**
		 * Close the countries selector
		 */
		var close = function()
		{
			// Show correct icon
			iconUp.show();
			iconClose.hide();

			// Toggle scroll
			countryList.removeClass('tt-scroll');

			// Close content
			var smallScreen = ns.screenWidth < ns.setting.BREAKPOINT_DESKTOP;
			if (smallScreen && Modernizr.touch) {
				countryContent.css('display', 'none');
			} else {
				countryContent.slideUp({
					duration: ns.setting.ANIMATION_DURATION,
					ease: ns.setting.ANIMATION_EASE,
					progress: function () {
						var height = countryContent.height();
						module.css('height', height + 'px');
					}
				});
			}

			// Set flag
			isOpen = false;
		};


		init();


		// Public methods
		return {};
	};

}(jQuery, tomtom));
(function($, ns)
{

	'use strict';


	// Namespace
	ns.modules = ns.modules || {};


	ns.modules.Deeplink = function()
	{

		// Properties
		var tabs 		= $('.tt-container-tabs');
		var tab 		= null;
		var category 	= null;
		var product 	= null;


		/**
		 * Init
		 */
		var init = function()
		{
			// Get query parameters (Array)
			var params = getVariables();

			/**
			 * The deeplink has 3 properties
			 * -> TAB / CATEGORY / PRODUCT
			 *
			 * But the tab property can be skipped on pages with one tab
			 * -> CATEGORY / PRODUCT
			 */

			if (params.length > 0) {
				switch (params[0]) {

					// Normal tab name
					case ns.setting.TAB_PRODUCTS:
					case ns.setting.TAB_ACCESSORIES:
					case ns.setting.TAB_SERVICES:
						// Do nothing
					break;

					// Exception for Maps & Services name
					case 'maps-services':
						params[0] = ns.setting.TAB_SERVICES;
					break;

					// If it's not one of the default names we should look for the first tab
					// We then add the tab name (products, accessories or services) to the
					// beginning of the array
					default:
						var type = tabs.find('[data-type]').first().data('type');
						params.unshift(type);
					break;
				}
			}

			// Save the deeplink properties
			tab = params.length > 0 ? params[0] : null;
			category = params.length > 1 ? params[1] : null;
			product = params.length > 2 ? params[2] : null;
		};


		/**
		 * Get all deeplink variables from the url
		 */
		var getVariables = function()
		{
			// Return data
			var result = [];

			// Grab the query string
			var hash = document.location.hash;
			if (hash)
			{
				// Remove question mark
				if (hash.indexOf("#") == 0) {
					hash = hash.substr(1);
				}

				// Split on pairs and loop through them, when we find the correct
				// name then return the encoded value of that.
				var parts = hash.split('/');
				for (var i = 0; i < parts.length; i++) {
					var part = trim(parts[i]);
					if (part != '') {
						result.push(part)
					}
				}
			}
			return result;
		};


		/**
		 * Trim a string
		 */
		var trim = function(str)
		{
			if (str == null || str == '') {
				return '';
			}
			return str.replace(/^\s+|\s+$/g, '');
		};


		init();


		// Public methods
		return {
			getTab: function() {
				return tab;
			},
			getCategory: function() {
				return category;
			},
			getProduct: function() {
				return product;
			}
		};
	};

}(jQuery, tomtom));
(function($, ns)
{

	'use strict';


	// Namespace
	ns.modules = ns.modules || {};


	ns.modules.Details = function(panel)
	{

		// Properties
		var url						= panel.data('content');
		var id						= panel.attr('id');
		var isLoading				= false;
		var isLoaded				= false;
		var isInitialized			= false;
		var isActive 				= false;
		var isMobile				= false;
		var mediaColumn 			= null;
		var infoColumn 				= null;
		var infoColumnHeader 		= null;
		var content					= null;
		var currentID				= null;
		var currentIndex			= null;

		/**
		 * Init
		 */
		var init = function()
		{
			// If we did not specify a ajax url
			if (typeof url == 'undefined') {
				isLoading = false;
				isLoaded = true;
			}

			// Listen to select events and store the current
			// selected thumbnail and index
			ns.events.on(ns.event.SELECT, function(e) {
				currentID = e.currentID;
				currentIndex = e.currentIndex;
			});
		};


		/**
		 * Activate handler
		 */
		var activate = function()
		{
			// Set flag
			isActive = true;

			// If the panel is already loaded then just initialize the elements
			// Otherwise start loading the panel (if we aren't already loading it)
			if (isLoaded) {
				initialize();
			} else if (!isLoading) {
				load();
			}
		};


		/**
		 * Deactivate handler
		 */
		var deactivate = function()
		{
			// Set flag and remove listeners
			isActive = false;
			ns.events.off(ns.event.RESIZE, resizeHandler);
		};


		/**
		 * Load the panel via AJAX
		 */
		var load = function()
		{
			// Show spinner
			panel.addClass('loading');

			// Set flag
			isLoading = true;

			// Load ajax
			$.ajax({
				url: url,
				cache: true,
				dataType: 'html',
				success: function(data)
				{
					// Set flags
					isLoading = false;
					isLoaded = true;

					// Convert data to dom elements
					content = $(data);

					// Remove class and append data
					panel.removeClass('loading');
					panel.append(content.children());

					// Scan for components
					ns.utils.scanner.scan(panel, '.tt-responsive-image', ns.components.ResponsiveImage);
					ns.utils.scanner.scan(panel, '.tt-social-button', ns.components.ShareButtons);
					ns.utils.scanner.scan(panel, '[data-rbb-targets]', ns.components.ResizeByBreakpoint);
					ns.utils.scanner.scan(panel, '[data-moreless-toggle]', ns.components.MoreLess);
					ns.utils.scanner.scan(panel, '[data-tracking]', ns.components.Tracking);
					ns.utils.scanner.scan(panel, '[data-toggle-type]', ns.components.ToggleButton);

					// Track panel
					if (id != null) {
						ns.utils.tracking.track(id);
					}

					// Initialize the components if we are still active
					if (isActive) {
						initialize();
					}
				},
				error: function()
				{
					//
				}
			});
		};


		/**
		 * Initialize the components
		 */
		var initialize = function()
		{
			// Only initialize components once
			if (!isInitialized) {
				isInitialized = true;

				// Find elements
				mediaColumn = panel.find('.tt-detail-panel-media-column');
				infoColumn = panel.find('.tt-detail-panel-info-column');
				infoColumnHeader = panel.find('.tt-detail-panel-info-column-header');

				// Initiate modules and components
				ns.utils.scanner.scan(panel, '.tt-details-info-column-trigger', ns.modules.Retailers);
				ns.utils.scanner.scan(mediaColumn, '.tt-image-viewer-360', ns.components.ImageViewer360);
				ns.utils.scanner.scan(mediaColumn, '.tt-image-viewer-gallery', ns.components.ImageViewerGallery);
				ns.utils.scanner.scan(mediaColumn, '.tt-image-viewer-menu', ns.components.ImageViewerMenu);

				// Trigger a select event to make sure the
				// current thumbnail is selected properly
				if (currentID != null && currentIndex != null) {
					ns.events.trigger({
						type: ns.event.SELECT,
						currentID: currentID,
						currentIndex: currentIndex
					});
				}
			}

			// Resize listener for moving header above media column or not
			ns.events.on(ns.event.RESIZE, resizeHandler);
			resizeHandler();
		};


		/**
		 * Resize handler
		 */
		var resizeHandler = function()
		{
			// Only move elements if needed
			var mobile = ns.screenWidth < ns.setting.BREAKPOINT_DESKTOP;
			if (isMobile != mobile) {
				isMobile = mobile;
				if (isMobile) {
					mediaColumn.prepend(infoColumnHeader);
				} else {
					infoColumn.prepend(infoColumnHeader);
				}
			}
		};


		init();


		// Public methods
		return {
			activate: activate,
			deactivate: deactivate
		};
	};

}(jQuery, tomtom));
(function($, ns)
{

	'use strict';


	// Namespace
	ns.modules = ns.modules || {};


	ns.modules.Filter = function()
	{

		// Properties
		var module 				= $('.tt-filter-module');
		var dropdown 			= module.find('.dropdown');
		var tab					= module.parent();
		var accessories 		= tab.find('.tt-accessories-module');
		var headers 			= tab.find('.tt-section-header-white');
		var data 				= [];
		var filterSubCategory 	= 'all';
		var filterFamily 		= 'all';
		var filterProduct 		= 'all';


		/**
		 * Init
		 */
		var init = function()
		{
			// Return if filters are not found
			if (module.length == 0) {
				return;
			}

			// Init the dropdowns
			initProducts();
			initFilterHandlers();
		};


		/**
		 * Find products to filter
		 */
		var initProducts = function()
		{
			// Fill data object with rows and cards
			accessories.each(function(index) {
				var element = $(this);
				var header = headers.eq(index);
				var rows = element.find('.row[data-rbb-targets]');
				var cards = rows.find('.tt-accessory-card-column');
				data.push({
					rows: rows,
					cards: cards,
					header: header
				});
			});
		};


		/**
		 * Link event listeners on dropdowns
		 */
		var initFilterHandlers = function()
		{
			dropdown.on(ns.event.DROPDOWN_CATEGORY_CHANGED, function(e) {
				filterSubCategory = e.selected.subCategory;
				filterFamily = 'all';
				filterProduct = 'all';
				resetFamilies(e.container);
				resetProducts(e.container);
				filterFamilyByCategory(e.container, filterSubCategory);
				filterProductsByCategory(e.container, filterSubCategory);
				filterCards();
			});

			dropdown.on(ns.event.DROPDOWN_FAMILY_CHANGED, function(e) {
				filterFamily = e.selected.family;
				filterProduct = 'all';
				resetProducts(e.container);
				if (filterFamily == 'all' && filterSubCategory != 'all') {
					filterProductsByCategory(e.container, filterSubCategory);
				} else {
					filterProductsByFamilyName(e.container, filterFamily);
				}
				filterCards();
			});

			dropdown.on(ns.event.DROPDOWN_PRODUCT_CHANGED, function(e) {
				filterProduct = e.selected.product;
				filterCards();
			});
		};


		// filtering methods
		var filterFamilyByCategory = function(container, category) {
			filter(container, category, 'families', 'data-type-sub-category');
		};
		var filterProductsByCategory = function(container, category) {
			filter(container, category, 'products', 'data-type-sub-category');
		};
		var filterProductsByFamilyName = function(container, family) {
			filter(container, family, 'products', 'data-type-family');
		};


		/**
		 * Filter products
		 * @param container
		 * @param category
		 * @param selector
		 * @param attr
		 */
		var filter = function(container, category, selector, attr)
		{
			// Grab models
			var models = $(container).find('ul[data-type="' + selector + '"]');

			// Grab all its children
			var children = models.children();

			// Turn on the children that have the same family name, others hide them
			children.each(function() {
				var link = $(this).find('a');

				// Show all links if selected category is all
				if (category == 'all') {
					link.removeClass('hide');
				} else {

					// Other wise hide links except type 'all'
					var val = link.attr(attr);
					if (val != 'all' && val != category) {
						link.addClass('hide');
					} else {
						link.removeClass('hide');
					}
				}
			});
		};


		/**
		 * Filter cards
		 */
		var filterCards = function()
		{
			// Send close event
			ns.events.trigger(ns.event.CLOSE_DETAILS);

			for (var i = 0; i < data.length; i++) {

				// Get data
				var rows = data[i].rows;
				var cards = data[i].cards;
				var header = data[i].header;

				// Results to show
				var results = [];

				// Filter cards and add in result set
				cards.each(function() {
					var card = $(this);
					card.detach();
					if (filterCard(card)) {
						results.push(card);
					}
				});

				// Show or hide the header based on results
				header.css('display', results.length == 0 ? 'none' : 'block');

				// Add card into the correct row
				for (var n = 0; n < results.length; n++) {
					var index = Math.floor(n / 3);
					var row = $(rows[index]);
					var card = results[n];
					card.appendTo(row);
				}
			}
		};


		/**
		 * Filter card
		 * @param card
		 */
		var filterCard = function(card)
		{
			var dataSubCategory 	= card.attr('data-type-sub-category');
			var dataFamily 			= card.attr('data-type-family');
			var dataProduct 		= card.attr('data-type-product');

			var arrSubCategory 		= (dataSubCategory !== undefined) ? dataSubCategory.split(',') : [];
			var arrFamily 			= (dataFamily !== undefined) ? dataFamily.split(',') : [];
			var arrProduct 			= (dataProduct !== undefined) ? dataProduct.split(',') : [];

			var validSubCategory 	= (filterSubCategory != 'all') ? ($.inArray(filterSubCategory, arrSubCategory) != -1) : true;
			var validFamily 		= (filterFamily != 'all') ?  ($.inArray(filterFamily, arrFamily) != -1) : true;
			var validProduct 		= (filterProduct != 'all') ? ($.inArray(filterProduct, arrProduct) != -1) : true;

			return validSubCategory && validFamily && validProduct;
		};


		/**
		 * Reset families dropdown
		 * @param container
		 */
		var resetFamilies = function(container)
		{
			var button = $(container).find('.dropdown').find('button[data-type="families"]');
			var buttonSpan = button.find('span');
			buttonSpan.html(button.attr('data-placeholder'));
			button.attr('data-type-name', 'all');
		};


		/**
		 * Reset products dropdown
		 * @param container
		 */
		var resetProducts = function(container)
		{
			var button = $(container).find('.dropdown').find('button[data-type="products"]');
			var buttonSpan = button.find('span');
			buttonSpan.html(button.attr('data-placeholder'));
			button.attr('data-type-name', 'all');
		};



		init();


		// Public methods
		return {};
	};

}(jQuery, tomtom));
(function($, ns)
{

	'use strict';


	// Namespace
	ns.modules = ns.modules || {};


	ns.modules.Navigation = function()
	{

		// Properties
		var nav 					= $('nav');
		var wrapper 				= $('.tt-wrapper');
		var fixed					= $('.tt-fixed');
		var navButtons 				= nav.find('button[data-toggle]');
		var navToggle 				= nav.find('.tt-nav-icon-toggle');
		var panel					= $('.tt-container-panels');
		var panelButtons 			= panel.find('button[data-toggle]');
		var panels 					= panel.find('.tt-nav-panels');
		var panelsList				= panels.find('.tt-nav-panel-list');
		var panelsListButtons		= panelsList.find('a');
		var cart					= nav.find('#go-to-cart');
		var current 				= null;
		var targets 				= [];
		var isMobileNavOpen 		= false;
		var isPanelOpen 			= false;
		var isBodyFixed 			= false;
		var activeClass 			= null;
		var previousClass			= null;
		var scrollPosition 			= 0;
		var scrollPositionOffset	= 0;
		var navRight 				= null;
		var navButton 				= null;
		var navButtonSticky 		= null;


		/**
		 * Init
		 */
		var init = function()
		{
			// Attach listeners for panels
			attachListeners();

			// Set active navigation element
			setActiveState();

			// Create the sticky button
			navRight = $('.tt-secondary-navigation-module > .tt-right').first();
			navButton = navRight.find('a').first();
			if (navButton.length > 0) {
				navButtonSticky = new ns.components.SmartNavButton(navButton);
			}

			ns.events.on(ns.event.BEHAVIOUR_ADD_TO_CARD_REQUEST, behaviourAddToCardRequestHandler);
			ns.events.on(ns.event.BEHAVIOUR_ADD_TO_CARD_FINISHED, behaviourAddToCardFinishedHandler);
		};

		/**
		 * Bahaviour Listeners
		 */
		var behaviourAddToCardRequestHandler = function () {
			if(navButtonSticky !== null) {
				navButtonSticky.addToCardRequest();
			} else {
				ns.events.trigger(ns.event.BEHAVIOUR_ADD_TO_CARD_REQUEST_ACK);
			}
		}

		var behaviourAddToCardFinishedHandler = function () {
			if(navButtonSticky !== null) {
				navButtonSticky.addToCardFinished();
			}
		}

		/**
		 * Attach listeners
		 */
		var attachListeners = function()
		{
			// See what all the sibling targets are of the nav toggle button
			// so we can check if we need to open or close the mobile nav content or not
			var main = navToggle.data('toggle');
			var target = $(main);
			var items = target.children('ul').children('li');
			targets.push(main);

			// Find targets
			for (var i = 0; i < items.length; i++) {
				var item = $(items[i]);
				var button = item.children('button');
				var toggle = button.data('toggle');
				targets.push(toggle);
			}

			// Link listeners
			$.each([navButtons, panelButtons], function(index, value){
				$(value).on('click', function(e) {
					var button = $(this);
					toggleContent(button, button.data('toggle'));
					e.preventDefault();
				})
			});

			// Link cart button
			cart.on('click', function(e) {
				e.preventDefault();
				window.location.href = cart.data('href');
			});
		};


		/**
		 * Set the currently active naviagtion panel
		 */
		var setActiveState = function()
		{
			// Get current path
			var path = location.pathname;
			path = path.substring(path.indexOf('/', 7), path.lastIndexOf('/'));


			// TODO : Check with Ferdi!! for local dev, otherwise all panel list buttons, except the first, get an ective state
			if(location.origin.indexOf('localhost') > -1) {
				return;
			}

			// Loop over items and find match
			panelsListButtons.each(function(){
				var el = $(this);
				var href = el.attr('href');
				href = href.substring(href.indexOf('/', 7), href.lastIndexOf('/'));
				if (path.indexOf(href) == 0) {
					el.addClass('active');
					return;
				}
			});
		};


		/**
		 * Toggle between fixed and normal header
		 */
		var toggleFixed = function()
		{
			ns.body.toggleClass('tt-mobile-panels-open');

			isBodyFixed = ns.body.hasClass('tt-mobile-panels-open');

			if (isBodyFixed) {
				scrollPosition = ns.doc.scrollTop();
				scrollPositionOffset = scrollPosition - fixed.height();
				wrapper.addClass('tt-fixed-helper');
				wrapper.css('top', -scrollPositionOffset);
				wrapper.on('click', function(e) {
					e.preventDefault();
					if (current != null) {
						current.trigger('click');
					}
				});
			} else {
				wrapper.removeAttr('style');
				wrapper.removeClass('tt-fixed-helper');
				wrapper.off('click');
				ns.doc.scrollTop(scrollPosition);
			}
		};


		/**
		 * Toggle content
		 * @param button
		 */
		var toggleContent = function(button)
		{
			activeClass = 'active';

			if (button.hasClass('tt-nav-icon-toggle')) {
				if (isMobileNavOpen) {
					if ($.inArray(current.data('toggle'), targets) != -1) {
						$(current.data('toggle')).slideToggle({
							duration: ns.setting.ANIMATION_DURATION,
							ease: ns.setting.ANIMATION_EASE
						});
						current = null;
						isMobileNavOpen = false;
						panels.slideToggle({
							duration: ns.setting.ANIMATION_DURATION,
							ease: ns.setting.ANIMATION_EASE,
							complete: function() {
								panels.removeAttr('style');
								toggleFixed();
							}
						});
						return;
					}
				} else {
					isMobileNavOpen = true;
				}
			} else if ($.inArray(button.data('toggle'), targets) != -1 && !isMobileNavOpen) {
				isMobileNavOpen = true;
			}

			// Check panel to open
			if (current == null)
			{
				panels.slideToggle({
					duration: ns.setting.ANIMATION_DURATION,
					ease: ns.setting.ANIMATION_EASE
				});
				$(button.data('toggle')).slideToggle({
					duration: ns.setting.ANIMATION_DURATION,
					ease: ns.setting.ANIMATION_EASE,
					complete: function() {
						if (Modernizr.touch) {
							ns.doc.scrollTop(0);
						}
					}
				});
				button.addClass(activeClass);
				current = button;
				previousClass = activeClass;
				toggleFixed();
			}
			else if (button.data('toggle') == current.data('toggle'))
			{
				$(current.data('toggle')).slideToggle({
					duration: ns.setting.ANIMATION_DURATION,
					ease: ns.setting.ANIMATION_EASE
				});
				current.removeClass(previousClass);
				current = null;
				activeClass = null;
				previousClass = null;
				panels.slideToggle({
					duration: ns.setting.ANIMATION_DURATION,
					ease: ns.setting.ANIMATION_EASE,
					complete: function() {
						panels.removeAttr('style');
						toggleFixed();
					}
				});
				if (isMobileNavOpen) {
					isMobileNavOpen = false;
				}
			}
			else
			{
				$(current.data('toggle')).delay(ns.setting.ANIMATION_DURATION).fadeOut({
					duration: ns.setting.ANIMATION_DURATION,
					ease: ns.setting.ANIMATION_EASE
				});
				current.removeClass(previousClass);
				$(button.data('toggle')).fadeIn({
					duration: ns.setting.ANIMATION_DURATION,
					ease: ns.setting.ANIMATION_EASE
				});
				button.addClass(activeClass);
				current = button;
				previousClass = activeClass;
			}

			isPanelOpen = (current != null);
		};


		init();


		// Public methods
		return {};
	};

}(jQuery, tomtom));
(function($, ns) {

	'use strict';

	// Namespace
	ns.modules = ns.modules || {};


	ns.modules.NotificationFormModule = function() {

		// Properties
		var module = $(".tt-notification-form-module");

		/**
		 * Init
		 */
		var init = function() {
			ns.utils.scanner.scan(module, '.form', ns.components.FormFeedbackController);
		};





		init();

		// Public methods
		return {};
	};

}(jQuery, tomtom));
(function($, ns)
{

	'use strict';


	// Namespace
	ns.modules = ns.modules || {};


	ns.modules.ProductSeo = function()
	{

		// Properties
		var panel = $('.tt-details-container-seo');
		var details	= null;


		/**
		 * Init
		 */
		var init = function()
		{
			// Return if SEO wrapper is not found
			if (panel.length == 0) {
				return;
			}

			// Create detail section
			details = new ns.modules.Details(panel);
			details.activate();
		};


		init();


		// Public methods
		return {};
	};

}(jQuery, tomtom));
(function($, ns)
{

	'use strict';


	// Namespace
	ns.modules = ns.modules || {};


	ns.modules.Quotes = function()
	{

		// Properties
		var element 	= $('.tt-carousel-quote-module');
		var carousel 	= element.find('.carousel');


		/**
		 * Init
		 */
		var init = function() {

			// Return if element is not found
			if (element.length == 0) {
				return;
			}

			// if we only have 1 slide, hide indicators and controls
			var totalQuotes = carousel.find('.carousel-inner').children().length;
			if(totalQuotes === 1) {
				carousel.find('.carousel-indicators').addClass('hidden');
				carousel.find('.carousel-control').addClass('hidden');
				return;
			}

			// Create carousel
			carousel.carousel({
				interval: 0
			});

			// Link swipe events
			carousel.swiperight(function() {
				carousel.carousel('prev');
			});
			carousel.swipeleft(function() {
				carousel.carousel('next');
			});
		};


		init();


		// Public methods
		return {};
	};

}(jQuery, tomtom));
(function($, ns)
{

	'use strict';


	// Namespace
	ns.modules = ns.modules || {};


	ns.modules.Retailers = function(element)
	{

		// Properties
		var panel		= element.closest('.tt-product-details-panel');
		var module 		= panel.find('.tt-retailer-module');
		var isOpen 		= false;
		var current		= null;


		/**
		 * Init
		 */
		var init = function()
		{
			// Return if retailer is not found
			if (module.length == 0) {
				return;
			}

			// Since the ModuleTab initiated toggle components on the
			// complete tab div, we can also listen to the toggle event
			panel.on(ns.event.TOGGLE, toggleHandler);
		};


		/**
		 * Toggle button click handler
		 * @param e
		 */
		var toggleHandler = function(e)
		{
			// Get data from event
			var elem = e.toggleElement;
			var type = e.toggleType;

			switch(type) {
				case 'retail-online':
				case 'retail-stores':
					showContentById(elem.data('target'));
					break;
				case 'retail-close':
					hideContent(current);
					togglePanel();
					break;
			}
		};


		/**
		 * Resize handler
		 */
		var resizeHandler = function()
		{
			if (current != null) {
				module.animate({
					height: panel.find(current).height() + 120
				}, {
					duration: ns.setting.ANIMATION_DURATION,
					ease: ns.setting.ANIMATION_EASE
				});
			}
		};


		/**
		 * Toggle panel
		 */
		var togglePanel = function()
		{
			isOpen = !isOpen;
			if (module) {
				module.slideToggle({
					duration: ns.setting.ANIMATION_DURATION,
					ease: ns.setting.ANIMATION_EASE
				});
			}
		};


		/**
		 * Show content
		 * @param id
		 * @param delay
		 */
		var showContent = function(id, delay)
		{
			current = id;

			// Link resize handler
			ns.events.on(ns.event.RESIZE, resizeHandler);
			resizeHandler();

			// Fade in
			delay = delay || 50;
			panel.find(id).delay(delay).fadeIn({
				duration: 150,
				ease: ns.setting.ANIMATION_EASE
			});

			// Scroll to
			var offset = module.offset().top - 200;
			ns.root.animate({
				scrollTop: offset
			}, {
				duration: ns.setting.ANIMATION_DURATION,
				ease: ns.setting.ANIMATION_EASE
			});
		};


		/**
		 * Hide content
		 * @param id
		 */
		var hideContent = function(id)
		{
			ns.events.off(ns.event.RESIZE, resizeHandler);
			panel.find(id).fadeOut({
				duration: 75,
				ease: ns.setting.ANIMATION_EASE
			});
		};


		/**
		 * Toggle content
		 * @param prevID
		 * @param newID
		 */
		var toggleContent = function(prevID, newID)
		{
			hideContent(prevID);
			showContent(newID, 255);
		};


		/**
		 * Show content
		 * @param targetId
		 */
		var showContentById = function(targetID)
		{
			if (!isOpen) {
				togglePanel();
				showContent(targetID, 255);
			} else if (isOpen && current == targetID) {
				togglePanel();
				hideContent(targetID);
				current = null;
			} else if (isOpen && current != targetID) {
				toggleContent(current, targetID);
			}
		};


		init();


		// Public methods
		return {};
	};

}(jQuery, tomtom));
(function($, ns)
{

	'use strict';


	// Namespace
	ns.modules = ns.modules || {};


	ns.modules.Tab = function(container, type)
	{

		// Properties
		var details 			= container.find('.tt-product-details-panel');
		var detailPanels 		= {};
		var activePanel 		= null;
		var activePanelEl 		= null;
		var activeCategory 		= null;
		var activeCategoryEl 	= null;
		var activeBtn 			= null;
		var isActive 			= false;
		var isMobile			= false;



		/**
		 * Init
		 */
		var init = function()
		{
			console.log("ns.modules.Tab - IS UNDER DEVELOPMENT! - All DetailPanels have been commented out");

			ns.utils.scanner.scan(container, '.tt-product-selector-card', ns.components.ProductSelectorCard);

			/*
			// Create panel controllers for each card
			details.each(function()
			{
				// Save properties
				var panel = $(this);
				var panelID = panel.attr('id');
				var panelInstance = new ns.modules.Details(panel);

				// Check if panel is visible (one column)
				if (panel.is(':visible')) {
					activePanel = panelID;
					activePanelEl = container.find('#' + panelID);
					panelInstance.activate();
				}

				// Save in details panels list
				detailPanels[panelID] = panelInstance;
			});

			// Find toggle buttons
			ns.utils.scanner.scan(container, '[data-toggle-type]', ns.components.ToggleButton);

			// Link events
			ns.events.on(ns.event.CLOSE_DETAILS, closeDetailPanel);
			ns.events.on(ns.event.RESIZE, resizeHandler);
			container.on(ns.event.TOGGLE, toggleHandler);
			resizeHandler();
			*/
		};


		/**
		 * Toggle click handler
		 * @param e: Toggle event
		 */
		var toggleHandler = function(e)
		{
			// Get data from event
			var element = e.toggleElement;
			var type = e.toggleType;

			switch(type) {

				// Clicked toggle card button
				case ns.setting.TOGGLE_CARD:
					clearActiveButton();
					setActiveButton(element);
					updatePanels(element, true);
				break;

				// Clicked toggle tab button
				case ns.setting.TOGGLE_TAB:
					var mainBtn = element.parents('[data-toggle-type="card"]');
					if (mainBtn.length > 0 ) {
						clearActiveButton();
						setActiveButton(mainBtn);
					}
					updatePanels(element, false);
				break;

				// Clicked toggle color button
				case ns.setting.TOGGLE_COLOR:
					var panelID = element.data('toggle');
					if (activePanel == panelID) {
						return;
					}
					if (activePanel != null) {
						detailPanels[activePanel].deactivate();
						hidePanel(activePanelEl);
					}
					activePanel = panelID;
					activePanelEl = container.find('#' + panelID);
					showPanel(activePanelEl);
					detailPanels[activePanel].activate();
				break;

				// Clicked toggle close button
				case ns.setting.TOGGLE_CLOSE:
					closeDetailPanel();
				break;
			}
		};


		/**
		 * Resize handler from window
		 */
		var resizeHandler = function()
		{
			// Only move elements if needed
			var mobile = ns.screenWidth < ns.setting.BREAKPOINT_DESKTOP;
			if (isMobile != mobile) {
				isMobile = mobile;
				resize();
			}
		};


		/**
		 * Resize
		 */
		var resize = function()
		{
			// Return if not active
			if (!isActive || activeBtn === null) {
				return;
			}

			// Move elements
			if (activeCategory !== null && activeBtn !== null) {
				if (isMobile) {
					activeCategoryEl.insertAfter(activeBtn);
				} else {
					activeCategoryEl.insertAfter(activeBtn.closest('.row.no-gutter'));
				}
			}
		};


		/**
		 * Reset active elements
		 */
		var resetIds = function()
		{
			activePanel = null;
			activePanelEl = null;
			activeCategory = null;
			activeCategoryEl = null;
		};


		/**
		 * Save active elements
		 * @param panelId
		 * @param categoryId
		 */
		var storeIds = function(panelID, categoryID)
		{
			activePanel = panelID;
			activePanelEl = container.find('#' + panelID);
			activeCategory = categoryID;
			activeCategoryEl = container.find('#' + categoryID);
		};


		/**
		 * Clear active states
		 */
		var clearActiveButton = function()
		{
			if (activeBtn != null) {
				activeBtn.removeClass('active');
				activeBtn.closest('.row').removeClass('active');
				activeBtn.find('.tt-toggle').find('div').toggleClass('active');
				activeBtn = null;
			}
		};


		/**
		 * Set active button
		 * @param elem
		 */
		var setActiveButton = function(elem)
		{
			activeBtn = elem;
			activeBtn.addClass('active');
			activeBtn.closest('.row').addClass('active');
			activeBtn.find('.tt-toggle').find('div').toggleClass('active');
		};


		/**
		 * Close detail panel
		 */
		var closeDetailPanel = function()
		{
			if (activePanel != null && activeCategory != null) {
				hidePanel(activePanelEl);
				detailPanels[activePanel].deactivate();
				toggleCategory(activeCategoryEl);
				activeCategoryEl.find('[data-toggle-type="tab"]').closest('li').removeClass('active');
				resetIds();
				clearActiveButton();
			}
		};


		/**
		 * Toggle category
		 * @param element: Panel to toggle
		 * @param delay: Delay before opening
		 */
		var toggleCategory = function(element, delay)
		{
			delay = delay || 0;
			element.delay(delay).slideToggle({
				duration: ns.setting.ANIMATION_DURATION,
				ease: ns.setting.ANIMATION_EASE,
				complete: function() {
					if (element.css('display') == 'block') {
						scrollTo();
					}
				}
			});
		};


		/**
		 * Activate tab
		 */
		var activatePanelTab = function()
		{
			activeCategoryEl.find('[data-toggle="' + activePanel + '"]').closest('li').addClass('active');
		};


		/**
		 * Deactivate tab
		 */
		var deactivatePanelTab = function()
		{
			activeCategoryEl.find('[data-toggle="' + activePanel + '"]').closest('li').removeClass('active');
		};


		/**
		 * Show the panel
		 * @param element: Panel to show
		 * @param delay: Delay before fade
		 */
		var showPanel = function(element, delay)
		{
			delay = delay || 0;
			element.delay(delay).fadeIn({
				duration: 150,
				ease: ns.setting.ANIMATION_EASE
			});

			// Track panel
			if (activePanel != null) {
				ns.utils.tracking.track(activePanel);
			}
		};


		/**
		 * Hide the panel
		 * @param element
		 */
		var hidePanel = function(element)
		{
			element.fadeOut({
				duration: ns.setting.ANIMATION_DURATION,
				ease: ns.setting.ANIMATION_EASE
			});
		};


		/**
		 * Update panels
		 * @param element
		 * @param isMain
		 */
		var updatePanels = function(element, isMain)
		{
			// Get clicked panel and category id
			var panelID = element.data('toggle');
			var categoryID = element.data('category');

			if (type == ns.setting.TAB_PRODUCTS && activeCategory == categoryID && isMain) {
				closeDetailPanel();
				return;
			}

			if (activeCategory == null)
			{
				// New panel to open
				storeIds(panelID, categoryID);
				showPanel(activePanelEl);
				toggleCategory(activeCategoryEl);
				detailPanels[panelID].activate();
				activatePanelTab();
				resize();
			}
			else if (activeCategory != categoryID)
			{
				// Switched category
				detailPanels[panelID].deactivate();
				hidePanel(activePanelEl);
				deactivatePanelTab();
				toggleCategory(activeCategoryEl);
				storeIds(panelID, categoryID);
				showPanel(activePanelEl, 500);
				toggleCategory(activeCategoryEl, 500);
				activatePanelTab();
				detailPanels[activePanel].activate();
				resize();
			}
			else if (activeCategory == categoryID && activePanel != panelID)
			{
				// Same category but different product range
				detailPanels[activePanel].deactivate();
				deactivatePanelTab();
				hidePanel(activePanelEl);
				activePanel = panelID;
				activePanelEl = container.find('#' + panelID);
				activatePanelTab();
				showPanel(activePanelEl);
				detailPanels[activePanel].activate();
				resize();
			}
			else
			{
				// Clicked same trigger that opened the panel
				closeDetailPanel();
			}
		};


		/**
		 * Activate element
		 */
		var activate = function() {
			isActive = true;
		};
		var deactivate = function() {
			isActive = false;
		};


		/**
		 * Scroll the body
		 */
		var scrollTo = function()
		{
			if (activeBtn != null) {
				var offset = activeBtn.offset().top + activeBtn.height() - 100;
				ns.root.animate({
					scrollTop: offset
				}, {
					duration: ns.setting.ANIMATION_DURATION,
					ease: ns.setting.ANIMATION_EASE
				});
			}
		};


		/**
		 * Open deeplink
		 * @param categoryName
		 * @param productName
		 */
		var openDeeplink = function(categoryName, productName)
		{
			// Properties
			var category = null;
			var product = null;

			// Find the first matched category
			if (categoryName != null) {
				category = container.find(
					'[data-toggle-type="card"]' +
					'[data-deeplink-category="' + categoryName + '"]'
				).first();
			}

			// Find the first matched product
			if (productName != null) {
				product = container.find(
					'[data-toggle-type="card"]' +
					'[data-deeplink-category="' + categoryName + '"]' +
					'[data-deeplink-product="' + productName + '"]'
				).first();
			}

			// If we found a product the open that
			if (product != null && product.length > 0) {
				setActiveButton(product);
				updatePanels(product, false);
				return;
			}

			// Otherwise we open the category
			if (category != null && category.length > 0) {
				setTimeout(function() {
					var offset = category.offset().top - 100;
					ns.root.animate({
						scrollTop: offset
					}, {
						duration: ns.setting.ANIMATION_DURATION,
						ease: ns.setting.ANIMATION_EASE
					});
				}, 500);
			}
		};


		init();


		// Public methods
		return {
			activate: activate,
			deactivate: deactivate,
			openDeeplink: openDeeplink
		};
	};

}(jQuery, tomtom));
(function($, ns) {

	'use strict';


	// Namespace
	ns.modules = ns.modules || {};


	ns.modules.Tabs = function(deeplink) {

		// Properties
		var tabs 			= $('button[data-toggle="tab"]');
		var tabsContainer 	= $('.tt-container-tabs');
		var tabProducts 	= null;
		var tabAccessories 	= null;
		var tabServices 	= null;
		var active			= null;
		var pageHeaderTitle = $(".tt-page-selector-header").find("h1");


		/**
		 * Init
		 */
		var init = function() {

			// Return of there are no tabs
			if (tabs.length == 0) {
				return;
			}

			// Init
			initTabs();
			initDeepLink();
			initPageHeader();
		};

		var initPageHeader = function() {
			if(pageHeaderTitle) {
				pageHeaderTitle.addClass("tt-anim-rotate-x");
			}
		};

		var initTabs = function() {
			tabs.each(function() {
				// Grab data attributes
				var tab = $(this);
				var type = tab.data('type');
				var id = tab.data('target');
				var target = $(id);

				// Init the correct tab
				switch (type)
				{
					case ns.setting.TAB_PRODUCTS:
						tabProducts = new ns.modules.Tab(target, ns.setting.TAB_PRODUCTS);
					break;
					case ns.setting.TAB_ACCESSORIES:
						tabAccessories = new ns.modules.Tab(target, ns.setting.TAB_ACCESSORIES);
					break;
					case ns.setting.TAB_SERVICES:
						tabServices = new ns.modules.Tab(target, ns.setting.TAB_SERVICES);
					break;
				}
				// Find the active tab
				if (tab.closest('li').hasClass('active')) {
					active = getInstance(type);
					if (active != null) {
						active.activate();
					}
				}
			});

			// Link event listeners
			tabs.on(ns.event.BOOTSTRAP_TAB, function() {
				var tab = $(this);
				var type = tab.data('type');
				var instance = getInstance(type);
				var pageTitle = tab.data('page-header');
				if (instance != null) {
					active.deactivate();
					instance.activate();
					active = instance;
					applyPageSelectorHeader( pageTitle );
				}
			});
		};

		/*
			TODO : If possible can we still attach the tt-anim-rotate-x class to the html element itself so we only have to add .on and .out
		 */
		var applyPageSelectorHeader = function(header) {
			if(header != null) {
				if(!Modernizr.touch) {
					// reset all first, if we are clicking like crazy
					pageHeaderTitle.removeClass("out");
					pageHeaderTitle.removeClass("in");
					pageHeaderTitle.off('animationend webkitAnimationEnd oanimationend MSAnimationEnd');

					// set up the css animation flow
					pageHeaderTitle.on('animationend webkitAnimationEnd oanimationend MSAnimationEnd', function() {
						pageHeaderTitle.text(header);
						pageHeaderTitle.removeClass("out");
						if(pageHeaderTitle.hasClass("in")) {
							pageHeaderTitle.off('animationend webkitAnimationEnd oanimationend MSAnimationEnd');
							pageHeaderTitle.removeClass("in");
							// animation sequence finished
							return; // we want to stop otherwise we add the vertical back again
						}
						// add second flip back
						pageHeaderTitle.addClass("in");
					});
					// first rotate away and hide the current header
					pageHeaderTitle.addClass("out");
				} else {
					pageHeaderTitle.text(header);
				}
			}
		};

		/**
		 * Check deeplink
		 */
		var initDeepLink = function() {
			if (deeplink.getTab() != null) {

				// Open tab
				var tab = tabsContainer.find('[data-type="' + deeplink.getTab() + '"]');
				if (tab.length > 0) {
					$(tab).trigger('click');
				}

				// Open module
				if (deeplink.getCategory() != null) {
					var instance = getInstance(deeplink.getTab());
					if (instance != null) {
						instance.openDeeplink(deeplink.getCategory(), deeplink.getProduct());
					}
				}
			}
		};


		/**
		 * Get tab instance based on name
		 * @param name: Name of the tab
		 */
		var getInstance = function(name) {
			if (name == ns.setting.TAB_PRODUCTS) return tabProducts;
			if (name == ns.setting.TAB_ACCESSORIES) return tabAccessories;
			if (name == ns.setting.TAB_SERVICES) return tabServices;
			return null;
		};


		init();


		// Public methods
		return {};
	};

}(jQuery, tomtom));
(function($, ns) {

	'use strict';


	// Namespace
	ns.animations = ns.animations || {};

	ns.animations.clean = function ($elem) {
		$elem.off('animationend webkitAnimationEnd oanimationend MSAnimationEnd');
		$elem.removeClass("out");
		$elem.removeClass("in");
	};

	ns.animations.animate = function ($elem, reversed) {
		var states = ["in", "out"];
		if (reversed) states = states.reverse();

		// set up the css animation flow
		$elem.on('animationend webkitAnimationEnd oanimationend MSAnimationEnd', function () {
			if ($elem.hasClass(states[0])) {
				$elem.removeClass(states[0]);
				$elem.trigger(ns.event.ANIMATION_FRAMES_UPDATE);
			}
			if ($elem.hasClass(states[1])) {
				$elem.off('animationend webkitAnimationEnd oanimationend MSAnimationEnd');
				$elem.removeClass(states[1]);
				// animation sequence finished
				ns.animations.clean($elem);
				$elem.trigger(ns.event.ANIMATION_FRAMES_FINISHED);
				return;
			};

			// add second flip back
			$elem.addClass(states[1]);
		});

		if (!$elem.hasClass(states[0])) {
			$elem.addClass(states[0]);
			$elem.trigger(ns.event.ANIMATION_FRAMES_START);
		}
	};
}(jQuery, tomtom));

(function($, ns)
{

	'use strict';


	// Namespace
	ns.behaviour = ns.behaviour || {};


	ns.behaviour.AddToCard = function(element)
	{
		// Properties
		var button = (element.parent('a').length > 0) ? element.parent('a') : element;
		var url = button.attr('href');
		var nav = $('.tt-navigation-container');
		var shoppingBasket = nav.find('.icon-basket');
		var shoppingBadge = nav.find('.badge');

		/**
		 * Init
		 */
		var init = function()
		{
			// add behaviour once to the shoppingbadge!
			if(!shoppingBadge.hasClass('tt-anim-pulsate')) {
				shoppingBadge.addClass('tt-anim-pulsate');
				shoppingBadge.on(ns.event.ANIMATION_FRAMES_FINISHED, shoppingAnimationFinished);
			}

			// Link click handlers
			button.on('click', clickHandler);
		};


		var shoppingAnimationFinished = function(evt) {
			ns.events.trigger(ns.event.BEHAVIOUR_ADD_TO_CARD_FINISHED);
		}

		/**
		 * Start animation
		 * @param e
		 */
		var clickHandler = function(e)
		{
			// Prevent the href being triggered!
			e.preventDefault();
			e.stopImmediatePropagation();

			if (ns.screenWidth <= ns.setting.BREAKPOINT_TABLET) {
				ns.events.on(ns.event.BEHAVIOUR_ADD_TO_CARD_REQUEST_ACK, startAnimation);
				ns.events.trigger(ns.event.BEHAVIOUR_ADD_TO_CARD_REQUEST);
			} else {
				startAnimation();
			}
		};


		/**
		 * Start the animation
		 */
		var startAnimation = function()
		{
			ns.events.off(ns.event.BEHAVIOUR_ADD_TO_CARD_REQUEST_ACK, startAnimation);

			// Clone button and animate to basket
			var clone = shoppingBasket.clone();
			ns.body.append(clone);

			// Get the global position of the clicked element
			var rect = button[0].getBoundingClientRect();
			var targetRect = shoppingBasket[0].getBoundingClientRect();

			// Apply settings to cloned btn which we are going to animate
			clone.css({
				position: 'fixed',
				left: rect.left,
				top: rect.top,
				zIndex: 9000
			});

			// remove any possible animations/transitions
			ns.animations.clean(shoppingBadge);

			// and finally animate
			clone.animate({
				path : createBezierPath(rect, targetRect),
				width: 40,
				height:40
			}, {
				duration: 750,
				specialEasing: {
					top: 'easeInOutQuad',
					left: 'easeInOutQuad'
				},
				complete: function ()
				{
					// Remove the clone
					clone.remove();

					// Set active color scheme state for when we have items in the basket
					if (!shoppingBasket.hasClass('active')) {
						shoppingBasket.addClass('active');
					}

					// Get the current amount of shopping items from the badge
					var currentValue = parseInt(shoppingBadge.text());
					if (currentValue == null || isNaN(currentValue)) {
						currentValue = 0;
					}

					// Increase the currentvalue
					// Place new value back into the badge
					// Add animation to the badge
					currentValue += 1;
					shoppingBadge.html(currentValue);

					//shoppingBadge.addClass('tt-anim-pulsate');
					ns.animations.animate(shoppingBadge);
				}
			});
		};


		var createBezierPath = function(rect, targetRect)
		{
			var x = 0;
			var y = 0;

			// Quick check how close we are on the x-axis to see if we need to flip the bezier curve
			if (targetRect.left - rect.left < 200) {
				x = rect.left - targetRect.left;
				y = rect.top - targetRect.top;
			} else {
				x = targetRect.left - rect.left;
				y = targetRect.top - rect.top;
			}

			// Calculate the angle in radians
			var theta = Math.atan2(-y, x);
			if (theta < 0) {
				theta += 2 * Math.PI;
			}

			// Convert to degrees
			var degrees = theta * (180 / Math.PI);

			// Create bezier path
			// To increasing the angle make the length size bigger
			return new $.path.bezier({
				start: {
					x: rect.left,
					y: rect.top,
					angle: degrees,
					scale: 10,
					length: .15
				},
				end: {
					x: targetRect.left,
					y: targetRect.top,
					angle: -degrees,
					scale: 1,
					length: .15
				}
			});
		};


		init();


		// Public methods
		return {};
	}

}(jQuery, tomtom));
(function($, ns)
{

	// Cache objects in namespace for global use
	ns.win = $(window);
	ns.doc = $(document);
	ns.html = $('html');
	ns.body = $('body');
	ns.root = $('html,body');

	// Old browser versions flags
	ns.isIE8 = ns.html.hasClass('ie8');
	ns.isIE9 = ns.html.hasClass('ie9');

	// Resize properties
	ns.screenWidth = ns.utils.client.width();
	ns.screenHeight = ns.utils.client.height();

	// Default event bus
	ns.events = $({});


	// Create the app
	ns.app = new ns.modules.App();


}(jQuery, tomtom));
