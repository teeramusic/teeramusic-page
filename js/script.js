// include "smooth-scroll"
	(function($) {
	    $(window).on('load', function() {

	        // Youtube
	        $.getScript("https://www.youtube.com/iframe_api").done(function() {
	            console.log('YT_api_loaded')
	        }).fail(function() {
	            console.log('YT_api failed to load')
	        })

	        // bootstrap js
	        $.getScript('https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js').done(function() {
	            console.log('bootstrap.bundle.min.js loaded')

	            // activate scrollspy - Smooth scrolling using jQuery easing
	            $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
					if (location.pathname != "/"){
						window.location = window.location.origin+'/'+window.location.hash
					}
					if (
	                    location.pathname.replace(/^\//, "") ==
	                    this.pathname.replace(/^\//, "") &&
	                    location.hostname == this.hostname
	                ) {
	                    var target = $(this.hash);
	                    target = target.length ?
	                        target :
	                        $("[name=" + this.hash.slice(1) + "]");
	                    if (target.length) {
	                        $("html, body").animate({
	                                scrollTop: target.offset().top,
	                            },
	                            1000,
	                            "easeInOutExpo"
	                        );
	                        return false;
	                    }
	                }
	            });

				// IF we are not on the main page, clicking on links takes us to the main page
				$

	            // Closes responsive menu when a scroll trigger link is clicked
	            $(".js-scroll-trigger").click(function() {
	                $(".navbar-collapse").collapse("hide");
	            });

	            // Activate scrollspy to add active class to navbar items on scroll
	            $("body").scrollspy({
	                target: "#nav",
	            });
	            $("body").scrollspy({
	                target: "#sideNav",
	            });

	            // Activate tooltips
	            $('[data-toggle="tooltip"]').tooltip()
	        });
	    });
	})(jQuery);

// ig-feed
// gmaps
// bootstrap.js
// scrollspy (smooth scroll)
// tooltip


var $HTMLBody = $('html, body');
// Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
//     get: function(){
//         return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
//     }
// });


(function(){
	var last = true;
	var ref =$('#logo-fade-in-point');
	var target = $('.navbar-brand');
	$(window).on('scroll',function(event) {
		var show = window.innerHeight < ref.offset().top;
		if(show != last){
			target.stop();
			if(show){
				target.animate({'opacity':1},500);
			} else {
				target.animate({'opacity':0},500);
			}
		}
		last = show;
	});
})();

// ===============================================
// Contact Tel and Email Populate
// ===============================================
var cd = "TVRreElDOGdPU0JMYUdGcElFMXZiMnNnVTI5cElEUThZbkkrRFFwTkxpQXhJRlF1SUZCaElFUmhaWFE4WW5JK0RRcERhR2xoYm1jZ1RXRnBMQ0JVYUdGcGJHRnVaQ0ExTURFd01ERThZbkkrRFFwMFpXd3VJRHhoSUdoeVpXWTlJblJsYkRvck5qWTROalkxTmpBMk5ERWlJajRyTmpZZ09EWWdOalUyTURZME1Ud3ZZVDQ4WW5JK0RRcGxiV0ZwYkRvZ1BHRWdhSEpsWmowaWJXRnBiSFJ2T25SbFpYSmhRSFJsWlhKaGJYVnphV011WTI5dElqNTBaV1Z5WVVCMFpXVnlZVzExYzJsakxtTnZiVHd2WVQ0OFluSSs=";
setTimeout(function(){
	$('#contact_data').html(atob(atob(cd)));
},800);

// ===============================================
// Audio Link Player
// ===============================================
var NOP = function() {};
var $audio_links = $('a[data-audio]');
var $audio = $('#audio');
var audio = $audio[0];
audio.playing = function(){
	return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
};

audio.icons = $audio_links.find('.play-button');
audio.icon = {
	removeClass: NOP,
	addClass: NOP
};

audio.onerror = function() {
	var i = setInterval(function() {
		clearInterval(i);
		audio.load();
	}, 1e3);
};

var onCanPlayThrough = function() {
	console.log('oncanplaythrough');
	audio.icon.removeClass('load');
	if(!video.playing()){
		audio.oncanplaythrough = NOP;
		audio.icon.addClass('playing');
		audio.play();
	}
};
var onStalled = function() {
	console.log('onstalled');
	audio.icon.removeClass('playing');
	audio.icon.addClass('load');
};
audio.onstalled = onStalled;
audio.onwaiting = onStalled;

audio.onplaying = function() {
	if(video.playing()){
		audio.pause();
	}
	console.log('onplaying');
	audio.icon.removeClass('load');
	audio.icon.addClass('playing');
};

audio.onended = function() {
	console.log('ended');
	audio.pause();
};
audio.onpause = function() {
	console.log('onpause');
	audio.icon.removeClass('load playing');
};

$audio_links.click(function(event) {
	event.preventDefault();
	if (audio.src === encodeURI(atob(this.getAttribute('data-audio')))) {
		if (audio.timeout) {
			console.log('clear timeout');
			audio.icon.removeClass('load');
			clearInterval(audio.timeout);
			audio.timeout = 0;
		} else if (audio.paused) {
			console.log('audio was paused');
			if(!video.playing()){
				audio.play();
			}
		} else {
			console.log('audio was playing');
			audio.pause();
		}
	} else {
		audio.pause();
		audio.icons.removeClass('load playing');
		audio.icon = $(this).find('.play-button');
		audio.icon.addClass('load');
		audio.src = atob(this.getAttribute('data-audio'));
		audio.load();
		if (audio.timeout) {
			clearInterval(audio.timeout);
			audio.timeout = 0;
		}
		audio.timeout = setInterval(function() {
			clearInterval(audio.timeout);
			audio.timeout = 0;
			if (audio.readyState === 4) {
				onCanPlayThrough();
			} else {
				audio.oncanplaythrough = onCanPlayThrough;
			}
		}, 1e3);
	}
});

// ===============================================
// Video Link Player
// ===============================================

var $video_links = $('a[data-video]');
var $video = $('#video');
var video = $video[0];
var $videoContainer = $('.main-video-container');
var $videoControl = $videoContainer.find('.play-button');
var $videoWrap = $('.main-video-wrap');
var $contents = $('.blur-for-video');
video.addEventListener('contextmenu', event => event.preventDefault()); //disable right click (for saving)



video.playing = function() {
    return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
};

var videoStall = function() {
    $videoControl.removeClass('d-none');
};
video.onstalled = videoStall;
video.onwaiting = videoStall;
video.onplaying = function() {
    // stop all audio
    if (audio.playing()) {
        audio.pause();
    }

    $videoControl.addClass('d-none');
};

video.onended = function() {
    video.pause();
    video.removeAttribute("src");
    if ($videoWrap.timeout) return; // ensure no pending action
    $videoWrap.timeout = setInterval(function() {
        clearInterval($videoWrap.timeout);
        $videoWrap.timeout = 0;
        videoPause();
    }, 1e3);
};

var videoPause = function(event) {
    if (event && event.preventDefault) event.preventDefault();
    if ($videoWrap.timeout) return; // ensure no pending action
    $player.addClass('d-none');
    $videoControl.addClass('d-none');
    $videoWrap.removeClass('dim');
    $contents.removeClass('blur');

    $videoWrap.timeout = setInterval(function() {
        clearInterval($videoWrap.timeout);
        $videoWrap.timeout = 0;
        $videoWrap.addClass('d-none');
        $videoContainer.removeClass("vertical");
        video.load();
    }, 500);
    video.pause();
    video.removeAttribute("src");

    if (typeof player !== 'undefined' && typeof player.pauseVideo === 'function') {
        player.pauseVideo();
    }
};

video.onerror = function() {
    console.log('video error');
    if ($videoWrap.timeout) {
        clearInterval($videoWrap.timeout);
        $videoWrap.timeout = 0;
    }
    videoPause();
};
$(document).keyup(function(e) {
    if (e.keyCode == 27) {
        console.log('esc');
        videoPause();
    }
});


$videoWrap.click(videoPause);
$videoContainer.click(function(event) {
    event.preventDefault();
    event.stopPropagation();
    event.cancelBubble = true;
    console.log('video click');
    videoPause();
});


$video_links.click(function(event) {
    event.preventDefault();
    // stop all audio
    if (audio.playing()) {
        audio.oncanplaythrough = NOP;
        audio.pause();
    }
    if ($videoWrap.timeout) return; // ensure no pending action
    $videoWrap.removeClass('d-none');
    $videoWrap.timeout = setInterval(function() {
        clearInterval($videoWrap.timeout);
        $videoWrap.timeout = 0;
        $contents.addClass('blur');
        $videoWrap.addClass('dim');

    }, 10);
    var src = atob(this.getAttribute('data-video'));
    // if not youtube
    if (src.indexOf("youtube.com") === -1 && src.indexOf("youtu.be") === -1) {
        console.log('not yt');
        $player.addClass('d-none');
        var vertical = this.getAttribute('data-vertical');
        if (vertical) {
            $videoContainer.addClass("vertical");
        }
        video.src = src;
        video.play_promise = video.play();
        if (playPromise !== undefined) {
            playPromise.then(_ => {
                    // Automatic playback started!
                })
                .catch(error => {
                    // Auto-play was prevented
                });
        }
    } else {
        // is youtube
        console.log('is yt');
        $player.removeClass('d-none');
        src = (src.lastIndexOf('watch?v=') > -1) ? src.substring(src.lastIndexOf('watch?v=') + 8, src.length) : src.substring(src.lastIndexOf("/") + 1, src.length);
        console.log('src=' + src);
        if (typeof player === 'undefined') {
            if (typeof YT !== 'undefined') {
                initYT(src);
            } else {
                console.log('iframe ready modified')
                onYouTubeIframeAPIReady = function() {
                    initYT(src);
                }
            }
        } else {
            player.loadVideoById(src);
        }
    }
    audio.pause();
});

// YOUTUBE SCRIPT STUFF

var player;
var $player = $('#player');
var onYouTubeIframeAPIReady = function() {}

// function onYouTubeIframeAPIReady() {
function initYT(src) {
    console.log('initYT');
    if (typeof YT === 'undefined') {
        return;
    }
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        playerVars: {
            'autoplay': 1,
            'controls': 0,
            'disablekb': 1,
            'modestbranding': 1
            // 'wmode':'opaque'
        },
        videoId: src,
        events: {
            'onReady': function(event) {
                console.log("on ready");
                event.target.playVideo();
            },
            'onStateChange': function(ev) {
                console.log('YT.onStateChange', ev);
                if (ev.data == -1) {
                    // player init
                    $player = $('#player');
                    // $player.addClass('d-none');
                }
                if(ev.data == 3 ) { // buffering
                    //fix black YT video (I think it's a bug from using fixed position in container, but not sure)
                    $player.removeClass('d-none');
                }

                if (ev.data == 1) { // video playing
                    $player.removeClass('d-none');
                }
                if (ev.data == 5 || ev.data == 2) {
                    // video ended or paused
                    videoPause();

                    // remove player when done
                    // player.destroy();
                    // player = null;
                }

            },
            'onError': function(ev) {
                console.log('YT error: ' + ev.data);
                videoPause();
            }

        }
    });

}

$('.ig-link').each(function(e){
    var $this = $(this);
    console.log($this)
    if($this.hasClass('apple-music')){
        $this.html(` <div class="ig-icon"><svg width="36" height="36" viewBox="0 0 40 40"><path d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 4.47165e-06 20 4.47165e-06C8.95431 4.47165e-06 -8.53819e-06 8.9543 -8.53819e-06 20C-8.53819e-06 31.0457 8.95431 40 20 40Z" fill="url(#paint0_linear_apple-music-icon-circle-apple-music-circle-icon)"></path><g opacity="0.192" filter="url(#filter0_f-apple-music-circle-icon)"><path d="M61.9713 2.26772e-07C45.5355 0.000108324 29.7729 6.52924 18.1511 18.1511C6.52924 29.7729 0.000108324 45.5355 2.26772e-07 61.9713C0.000107682 78.407 6.52924 94.1696 18.1511 105.791C29.7729 117.413 45.5355 123.942 61.9713 123.943C78.407 123.942 94.1696 117.413 105.791 105.791C117.413 94.1696 123.942 78.407 123.943 61.9713C123.942 45.5355 117.413 29.7729 105.791 18.1511C94.1696 6.52924 78.407 0.000107682 61.9713 2.26772e-07V2.26772e-07ZM93.0307 12.2988C94.4959 12.2975 95.572 13.1197 95.9905 14.5618C96.1364 15.0642 96.1721 24.2661 96.1346 51.2079L96.0851 87.1831L95.7071 88.5248C94.4242 93.0876 91.2913 96.3176 86.8536 97.65C83.7175 98.5916 79.1347 98.9411 76.8839 98.4106C74.8804 97.9384 73.4284 97.1012 71.8394 95.5028C69.5281 93.1778 68.5033 90.8026 68.498 87.763C68.4956 86.0628 68.7969 84.7828 69.6024 83.0752C70.7413 80.6608 72.2152 79.2073 74.8689 77.8807C76.9938 76.8185 78.8933 76.2679 84.4429 75.1087C88.0903 74.3468 88.9785 74.02 89.6894 73.1752C90.6669 72.0135 90.6454 72.445 90.5953 54.0366C90.5519 38.0433 90.5342 37.1645 90.2433 36.7205C89.8119 36.0622 88.9128 35.7224 87.9626 35.8583C86.9533 36.0025 51.0662 43.2637 50.1709 43.5047C49.176 43.7726 48.4558 44.5638 48.2244 45.6425C48.088 46.279 48.034 53.3359 48.0331 70.7126C48.0319 97.4009 48.0536 96.7956 46.9866 99.6319C46.6821 100.441 46.1363 101.556 45.7736 102.11C44.857 103.509 43.0949 105.211 41.7248 106.022C38.4476 107.961 32.0395 108.958 28.6169 108.061C24.9907 107.111 22.297 104.643 21.0827 101.159C20.5008 99.4899 20.3639 96.7434 20.7721 94.9087C21.1993 92.9886 22.1877 91.1594 23.5217 89.8193C25.8713 87.4589 28.6485 86.3616 36.1264 84.8386C37.7406 84.5098 39.4056 84.1276 39.8268 83.9894C40.7154 83.6977 41.6791 82.7819 42.1134 81.8161C42.3989 81.1813 42.4203 79.6312 42.4996 52.9689L42.5835 24.7925L42.9756 23.9965C43.4386 23.0563 44.4146 22.171 45.3992 21.7984C46.0355 21.5577 83.3052 13.9608 89.628 12.7831C91.0577 12.5167 92.5889 12.2992 93.0307 12.2988H93.0307Z" transform="translate(3.75378 3.72998) scale(0.264583)" fill="black"></path></g><path d="M69.2409 0C50.8771 0 33.2654 7.29501 20.2802 20.2802C7.29501 33.2654 0 50.8771 0 69.2409C0 87.6048 7.29501 105.216 20.2802 118.202C33.2654 131.187 50.8771 138.482 69.2409 138.482C78.3338 138.482 87.3376 136.691 95.7383 133.211C104.139 129.732 111.772 124.631 118.202 118.202C124.631 111.772 129.732 104.139 133.211 95.7383C136.691 87.3376 138.482 78.3338 138.482 69.2409C138.482 60.1481 136.691 51.1443 133.211 42.7436C129.732 34.3429 124.631 26.7098 118.202 20.2802C111.772 13.8506 104.139 8.75034 95.7383 5.27065C87.3376 1.79097 78.3338 0 69.2409 0V0ZM100.3 19.5685C101.766 19.5672 102.842 20.3894 103.26 21.8315C103.406 22.3339 103.442 31.5358 103.404 58.4776L103.355 94.4528L102.977 95.7945C101.694 100.357 98.5609 103.587 94.1232 104.92C90.9872 105.861 86.4043 106.211 84.1535 105.68C82.1501 105.208 80.698 104.371 79.1091 102.772C76.7978 100.447 75.773 98.0723 75.7677 95.0327C75.7654 93.3325 76.0666 92.0525 76.872 90.3449C78.0109 87.9305 79.4849 86.4769 82.1386 85.1504C84.2635 84.0882 86.163 83.5375 91.7126 82.3783C95.36 81.6165 96.2482 81.2897 96.9591 80.4449C97.9366 79.2832 97.9151 79.7147 97.865 61.3063C97.8215 45.313 97.8039 44.4342 97.513 43.9902C97.0816 43.3319 96.1825 42.9921 95.2323 43.128C94.2229 43.2722 58.3358 50.5333 57.4406 50.7744C56.4456 51.0423 55.7254 51.8335 55.4941 52.9122C55.3576 53.5487 55.3037 60.6056 55.3028 77.9823C55.3016 104.671 55.3233 104.065 54.2563 106.902C53.9518 107.711 53.406 108.826 53.0433 109.38C52.1266 110.778 50.3646 112.481 48.9945 113.291C45.7172 115.23 39.3092 116.228 35.8866 115.331C32.2603 114.381 29.5667 111.912 28.3524 108.429C27.7705 106.76 27.6336 104.013 28.0417 102.178C28.4689 100.258 29.4574 98.4291 30.7913 97.089C33.1409 94.7285 35.9181 93.6313 43.3961 92.1083C45.0103 91.7795 46.6753 91.3973 47.0965 91.2591C47.985 90.9674 48.9488 90.0516 49.3831 89.0858C49.6685 88.451 49.6899 86.9009 49.7693 60.2386L49.8531 32.0622L50.2453 31.2661C50.7083 30.326 51.6843 29.4407 52.6689 29.0681C53.3051 28.8274 90.5748 21.2305 96.8976 20.0528C98.3274 19.7864 99.8585 19.5689 100.3 19.5685Z" transform="translate(1.67999 1.68018) scale(0.264583)" fill="white"></path><defs><filter id="filter0_f-apple-music-circle-icon" x="1.70421" y="1.68041" width="36.8923" height="36.8923" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend><feGaussianBlur stdDeviation="1.02479" result="effect1_foregroundBlur"></feGaussianBlur></filter><linearGradient id="paint0_linear_apple-music-icon-circle-apple-music-circle-icon" x2="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(24.8821 -7.03194) scale(37.2822) rotate(52.3873)"><stop stop-color="#FF5E50"></stop><stop offset="0.249038" stop-color="#FE5C6C"></stop><stop offset="0.376518" stop-color="#E3658A"></stop><stop offset="0.496954" stop-color="#B87EB0"></stop><stop offset="0.626674" stop-color="#916CFF"></stop><stop offset="0.762798" stop-color="#70BCFB" stop-opacity="0.919192"></stop><stop offset="1" stop-color="#21C7FE"></stop></linearGradient></defs></svg><div class="ig-icon-text">Apple Music</div></div> `)
    } else if($this.hasClass('spotify')) {
        $this.html(` <div class="ig-icon"><svg width="36" height="36" viewBox="0 0 45 45"><path style="fill:#1dd069" d="M45.71,23.22a22.5,22.5,0,1,0-6.59,15.91,22.5,22.5,0,0,0,6.59-15.91Z" transform="translate(-0.71 -0.73)"></path><path style="fill:#fff" d="M38.46,16.7a25.43,25.43,0,0,0-2.34-1.21q-1.18-.53-2.44-1A37.88,37.88,0,0,0,27.5,13a46.8,46.8,0,0,0-6.33-.59q-1.3,0-2.6,0t-2.6.16c-.83.08-1.64.17-2.43.29s-1.61.27-2.41.46l-1,.24c-.32.09-.66.18-1,.28A2.44,2.44,0,0,0,8,14.74a2.53,2.53,0,0,0,1.37,3.86,2.46,2.46,0,0,0,.72.1,2.84,2.84,0,0,0,.71-.1l.23-.06c.56-.15,1.11-.3,1.67-.42.86-.19,1.73-.33,2.6-.43s1.77-.18,2.65-.22,1.55-.06,2.32-.05,1.54,0,2.32.08,1.49.11,2.23.2,1.46.19,2.19.32c1.06.19,2.1.41,3.12.69a27.65,27.65,0,0,1,3,1q.75.3,1.46.65c.47.23.94.48,1.42.75a2.58,2.58,0,0,0,1.27.34,2.51,2.51,0,0,0,2.19-1.27,2.57,2.57,0,0,0,.33-1.26v-.06s0-.07,0-.13a3,3,0,0,0-.05-.36,2.45,2.45,0,0,0-.45-1,2.73,2.73,0,0,0-.8-.69Z" transform="translate(-0.71 -0.73)"></path><path style="fill:#fff" d="M29.87,21.55a33.53,33.53,0,0,0-5.77-1.3A34.39,34.39,0,0,0,18.19,20c-.94,0-1.86.11-2.77.22s-1.82.27-2.74.47l-1.11.27-1.08.31A2.08,2.08,0,0,0,9.43,22,2.22,2.22,0,0,0,9,23.23a2.15,2.15,0,0,0,.35,1.25,2.18,2.18,0,0,0,1,.83,2.15,2.15,0,0,0,.78.16,2.51,2.51,0,0,0,.75-.11,24.79,24.79,0,0,1,3.61-.78,28.69,28.69,0,0,1,3.87-.27c1,0,2,0,2.91.14s1.87.22,2.81.4a28.37,28.37,0,0,1,3.54.9A23.34,23.34,0,0,1,32,27.12c.35.18.69.37,1,.57l.38.21a2.25,2.25,0,0,0,1.64.24,2.15,2.15,0,0,0,1.33-1,2.23,2.23,0,0,0,.25-1.67,2.14,2.14,0,0,0-1-1.33h0L35.38,24a25.6,25.6,0,0,0-2.69-1.39,27.9,27.9,0,0,0-2.82-1.07Z" transform="translate(-0.71 -0.73)"></path><path style="fill:#fff" d="M24.13,27.42a30.78,30.78,0,0,0-4.36-.34h0l-.91,0c-.69,0-1.39.07-2,.12-.88.07-1.76.19-2.64.33s-1.75.31-2.61.51l-.22.06h0l-.25.08a1.79,1.79,0,0,0-.92.82A1.88,1.88,0,0,0,10,30.27a1.79,1.79,0,0,0,1.78,1.47l.4,0,.35-.07q1.55-.34,3.12-.56c1-.14,2.09-.23,3.15-.28q1.22,0,2.44,0t2.42.25a21.3,21.3,0,0,1,3.8.93A19.6,19.6,0,0,1,31,33.66h0l.06,0,.36.2a1.84,1.84,0,0,0,1.85-3.14,3.57,3.57,0,0,0-.36-.24l0,0h0a22.77,22.77,0,0,0-2.16-1.14,23.32,23.32,0,0,0-2.27-.9,25.39,25.39,0,0,0-4.26-1Z" transform="translate(-0.71 -0.73)"></path></svg><div class="ig-icon-text">Spotify</div></div> `)
    } else if($this.hasClass('youtube')) {
        $this.html(`<div class="ig-icon"><svg width="36" height="36" viewBox="0 0 45 45"><defs><style>.youtube-icon-circle-1{fill:red;}.youtube-icon-circle-2{fill:#fff;}</style></defs><circle class="youtube-icon-circle-1" cx="22.5" cy="22.5" r="22.5"></circle><path id="lozenge-path-YouTubeCircleIcon-youtube-circle-icon" class="youtube-icon-circle-2" d="M37.12,16a3.71,3.71,0,0,0-2.61-2.61C32.2,12.73,23,12.73,23,12.73s-9.24,0-11.55.62A3.71,3.71,0,0,0,8.79,16a38.56,38.56,0,0,0-.62,7.11,38.56,38.56,0,0,0,.62,7.11,3.71,3.71,0,0,0,2.61,2.61c2.31.62,11.55.62,11.55.62s9.24,0,11.55-.62a3.71,3.71,0,0,0,2.61-2.61,38.56,38.56,0,0,0,.62-7.11A38.56,38.56,0,0,0,37.12,16Z" transform="translate(0 -0.58)"></path><polygon id="play-polygon-YouTubeCircleIcon-youtube-circle-icon" class="youtube-icon-circle-1" points="20 26.93 27.68 22.5 20 18.07 20 26.93"></polygon></svg><div class="ig-icon-text">YouTube</div></div> `)
    } else if($this.hasClass('youtube-music')) {
        $this.html(`<div class="ig-icon"><svg width="36" height="36" viewBox="0 0 40 40"><rect width="40" height="40" fill="black" fill-opacity="0"></rect><rect width="40" height="40" fill="black" fill-opacity="0"></rect><path d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z" fill="#FF0000"></path><rect width="20.9091" height="20.9091" fill="black" fill-opacity="0" transform="translate(9.54541 9.54541)"></rect><path d="M20 10.4636C25.259 10.4636 29.5363 14.7409 29.5363 20C29.5363 25.259 25.259 29.5363 20 29.5363C14.7409 29.5363 10.4636 25.259 10.4636 20C10.4636 14.7409 14.7409 10.4636 20 10.4636ZM20 9.54541C14.225 9.54541 9.54541 14.225 9.54541 20C9.54541 25.775 14.225 30.4545 20 30.4545C25.775 30.4545 30.4545 25.775 30.4545 20C30.4545 14.225 25.775 9.54541 20 9.54541Z" fill="white"></path><path d="M16.3636 25.2275L25.2273 19.7729L16.3636 14.7729V25.2275Z" fill="white"></path></svg><div class="ig-icon-text">YouTube Music</div></div>`)
    } else if($this.hasClass('pandora')) {
        $this.html(`<div class="ig-icon"><svg width="36" height="36" viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill="url(#paint0_linear_PandoraCircleIcon-pandora-circle-icon)"></circle><path fill-rule="evenodd" clip-rule="evenodd" d="M0 11.5686V23.1371H3.22601C6.89576 23.1371 6.68784 23.1542 7.00929 22.8258C7.3218 22.5064 7.31237 22.5951 7.31237 19.97V17.6593L8.39961 17.6589C15.6819 17.6564 19.6126 14.3853 19.6078 8.33166C19.6047 4.25288 17.6036 1.52546 13.8186 0.441099C12.2906 0.0033518 12.2284 -2.92255e-07 5.62004 -2.92255e-07H0V11.5686Z" transform="translate(12 9)" fill="white"></path><defs><linearGradient id="paint0_linear_PandoraCircleIcon-pandora-circle-icon" x2="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(60 20) scale(56.5685) rotate(135)"><stop stop-color="#3870F7"></stop><stop offset="1" stop-color="#27A1EB"></stop></linearGradient></defs></svg><div class="ig-icon-text">Pandora</div></div>`)
    } else if($this.hasClass('soundcloud')) {
        $this.html(`<div class="ig-icon"><svg width="36" height="36" viewBox="0 0 45 45"><defs><style>.soundcloud-icon-circle-1{fill:#f70;}.soundcloud-icon-circle-2{fill:#fff;}</style></defs><title>sound cloud circle icon</title><path class="soundcloud-icon-circle-1" d="M144.24,22.5a22.5,22.5,0,1,0-6.59,15.91A22.5,22.5,0,0,0,144.24,22.5Z" transform="translate(-99.24 0)"></path><path class="soundcloud-icon-circle-2" d="M101.56,21.72a.17.17,0,0,0-.16.16l-.3,2.26.3,2.22a.17.17,0,0,0,.16.16.17.17,0,0,0,.16-.16h0l.35-2.22-.35-2.26a.17.17,0,0,0-.16-.16Z" transform="translate(-99.24 0)"></path><path class="soundcloud-icon-circle-2" d="M103.23,20.49a.17.17,0,0,0-.34,0l-.4,3.65.4,3.57a.17.17,0,0,0,.34,0l.45-3.57-.45-3.65Z" transform="translate(-99.24 0)"></path><path class="soundcloud-icon-circle-2" d="M109.53,17.12a.31.31,0,0,0-.31.3l-.32,6.72.32,4.34a.31.31,0,0,0,.62,0h0l.36-4.34-.36-6.72A.32.32,0,0,0,109.53,17.12Z" transform="translate(-99.24 0)"></path><path class="soundcloud-icon-circle-2" d="M106.27,19.45a.24.24,0,0,0-.24.23l-.36,4.45.36,4.31a.24.24,0,0,0,.48,0l.41-4.31-.41-4.45A.25.25,0,0,0,106.27,19.45Z" transform="translate(-99.24 0)"></path><path class="soundcloud-icon-circle-2" d="M112.84,28.78a.38.38,0,0,0,.38-.37l.31-4.27-.31-8.94a.38.38,0,0,0-.75,0l-.28,8.94.28,4.27A.38.38,0,0,0,112.84,28.78Z" transform="translate(-99.24 0)"></path><path class="soundcloud-icon-circle-2" d="M119.62,28.8a.52.52,0,0,0,.52-.51h0l.22-4.15-.22-10.33a.52.52,0,0,0-1,0l-.19,10.32.19,4.15A.52.52,0,0,0,119.62,28.8Z" transform="translate(-99.24 0)"></path><path class="soundcloud-icon-circle-2" d="M116.2,28.79a.45.45,0,0,0,.45-.44h0l.26-4.2-.27-9a.45.45,0,0,0-.89,0l-.24,9,.24,4.2a.45.45,0,0,0,.45.44Z" transform="translate(-99.24 0)"></path><path class="soundcloud-icon-circle-2" d="M107.89,28.75a.28.28,0,0,0,.27-.27l.38-4.34L108.16,20a.27.27,0,0,0-.55,0l-.34,4.13.34,4.34A.28.28,0,0,0,107.89,28.75Z" transform="translate(-99.24 0)"></path><path class="soundcloud-icon-circle-2" d="M104.66,28.51a.21.21,0,0,0,.2-.2l.43-4.17-.43-4.33a.21.21,0,0,0-.2-.2.21.21,0,0,0-.2.2l-.38,4.33.38,4.17a.21.21,0,0,0,.2.2Z" transform="translate(-99.24 0)"></path><path class="soundcloud-icon-circle-2" d="M117.91,15a.48.48,0,0,0-.48.48l-.22,8.68.22,4.18a.48.48,0,0,0,1,0h0l.24-4.18-.24-8.68a.48.48,0,0,0-.48-.48Z" transform="translate(-99.24 0)"></path><path class="soundcloud-icon-circle-2" d="M111.18,28.79a.35.35,0,0,0,.34-.34l.34-4.31-.34-8.25a.34.34,0,0,0-.69,0l-.3,8.25.3,4.31A.35.35,0,0,0,111.18,28.79Z" transform="translate(-99.24 0)"></path><path class="soundcloud-icon-circle-2" d="M114.93,28.39h0l.29-4.24-.29-9.24a.41.41,0,0,0-.82,0l-.26,9.24.26,4.24a.41.41,0,0,0,.82,0h0Z" transform="translate(-99.24 0)"></path><path class="soundcloud-icon-circle-2" d="M136.75,18.81a5,5,0,0,0-1.93.39,8.82,8.82,0,0,0-8.79-8,8.94,8.94,0,0,0-3.2.6c-.38.15-.48.3-.48.59V28.22a.61.61,0,0,0,.54.59h13.86a5,5,0,0,0,0-10Z" transform="translate(-99.24 0)"></path><path class="soundcloud-icon-circle-2" d="M121.33,12.33a.56.56,0,0,0-.55.55l-.23,11.26.23,4.09a.55.55,0,0,0,1.1,0h0l.25-4.09-.25-11.26a.56.56,0,0,0-.55-.55Z" transform="translate(-99.24 0)"></path></svg><div class="ig-icon-text">SoundCloud</div></div>`)
    } else if($this.hasClass('itunes')) {
        $this.html(`<a href="https://geo.music.apple.com/th/album/_/1567139276?i=1567139277&amp;mt=1&amp;app=itunes&amp;ls=1&amp;at=1000lHKX" target="_blank" rel="noopener noreferrer" aria-label="Purchase and download Smile Fake by J. Lotto on iTunes" data-test-id="link" class="css-1spf6ft"><div class="ig-icon"><svg width="36" height="36" viewBox="0 0 45 45"><defs><style>.itunes-icon-star-circle-1{fill:url(#linear-gradient-itunes-circle-icon-itunes-circle-icon);}.itunes-icon-star-circle-2{fill:#fff;opacity:0.86;}</style><linearGradient id="linear-gradient-itunes-circle-icon-itunes-circle-icon" x1="427.16" y1="46.08" x2="427.16" y2="1.08" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#cb44f5"></stop><stop offset="1" stop-color="#eb4cbd"></stop></linearGradient></defs><title>itunes_circle NEW</title><path class="itunes-icon-star-circle-1" d="M449.66,23.58a22.5,22.5,0,1,0-6.59,15.91A22.5,22.5,0,0,0,449.66,23.58Z" transform="translate(-404.66 -1.08)"></path><path class="itunes-icon-star-circle-2" d="M426.31,8,417.4,36.14a.63.63,0,0,0,1,.71l8.53-6.16,8.53,6.16a.63.63,0,0,0,1-.71L427.47,8A.61.61,0,0,0,426.31,8Z" transform="translate(-404.66 -1.08)"></path><path class="itunes-icon-star-circle-2" d="M426.89,30.68l15.27-11.16a.68.68,0,0,0-.4-1.23H412a.68.68,0,0,0-.4,1.23Z" transform="translate(-404.66 -1.08)"></path></svg><div class="ig-icon-text">iTunes</div></div></a>`)
    }
})

// include "tooltip"
// include "booking"
// ===============================================
// ISOTOPE
// ===============================================
window.grids = [];
var $isotope = $('.isotope').each(function(index){
	var instance =jQuery(this);
	var $grid = instance.find('.isotope-grid');
	var $filterButtons = instance.find('.isotope-filter-button');
	var last_result = instance.find('');
	var filter_enabled = instance.find('.isotope-filter').length; // check if filter has been enabled
	var filterValue = {};


	if (filter_enabled) {


		// fix flexbox item height
		// $grid.one('arrangeComplete', function(event, filteredItems) {
		// 	var tallest = 0;
		// 	filteredItems.forEach(function(item) {
		// 		var height = item.size.height;
		// 		tallest = tallest > height ? tallest : height;
		// 	});
		// 	filteredItems.forEach(function(item) {
		// 		item.element.style.height = tallest + "px";
		// 	});
		// });

		// trigger after arrage
		var first = 0;
		$grid.on('arrangeComplete', function(event, filteredItems) {
			// if playing items become invisible, pause
			if (audio.src && !audio.paused) {
				var item = $audio_links.filter('[data-audio="' + btoa(audio.src) + '"]');
				if (!item.is(':visible')){
					audio.oncanplaythrough = NOP;
					audio.pause();
				}

			}

			// scroll filter to top of page when clicked
			if(first)
				$HTMLBody.animate({
					scrollTop: $filterButtons.parent().parent().offset().top-15
				}, 400);
			first=true;
		});

		// filter button logic
		var md = function() {
			var item = $(this).attr('data-filter');
			if (filterValue[item]) {
				// has filter - remove
				delete filterValue[item];
			} else {
				// doesn't have filter - add
				filterValue[item] = true;
			}

			var filter = Object.keys(filterValue);
			filter = filter.join('');

			// if no items found after adding a filter, clear filter
			// and select only last filter
			// OR
			// if addding filter results in the same result, clear filter
			// and select only last filter
			var result = function(){
				var result="";
				$grid.find(filter).each(function(key,value){
					result += value.innerHTML;
				});
				return result;
			}();

			if (!$grid.find(filter).length && filter.length !== 0 || last_result === result) {
				$filterButtons.removeClass('active');
				filterValue = {};
				filterValue[item] = true;
				// clear filter
				filter = item;
				console.log('reset & ' + item);
			}

			last_result = result;
			console.log(filter);
			$grid.isotope({filter:filter});
		}
		$filterButtons.on('mouseup',md);
		$filterButtons.on('ontouchend',md);

		grids.push($grid);

		// init isotope
		$grid.isotope({
			// options
			itemSelector: '.isotope-item',
			layoutMode: 'fitRows'
		});

	}
});

console.log('script loaded');
