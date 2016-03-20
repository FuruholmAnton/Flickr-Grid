var flickr = (function() {
	'use strict';
	/////////////////////////////////
	/*         Flickr API          */
	/////////////////////////////////

	/*
	*   o for original,
	*   b for a width/height of 1024,
	*   m for 240,
	*   t for 100,
	*   s for 75.
	*   When not specified it defaults to a width/height of 500.
	*
	*   _t.jpg
	*/

	var config = {
		url: 'https://www.flickr.com/services/rest/?&method=flickr.people.getPublicPhotos&format=json&api_key=4d6d6af841af2bba2737c158bd2cc298&user_id=113967346@N06&nojsoncallback=1',
		quality: 2
	};

	function init(obj) {
		if (typeof obj.url === 'string') {
			config.url = obj.url;
		}
		if (typeof obj.quality === 'number') {
			config.quality = obj.quality;
		}

		ajaxGET(config.url, cbFlickr);
	}

	function ajaxGET(url, callback) {
	    var XHR = null;

	    if (XMLHttpRequest) {
	        XHR = new XMLHttpRequest();

	    } else {
	        XHR = new ActiveXObject('Microsoft.XMLHTTP');

	    }

	    XHR.onreadystatechange = function() {
	        if (XHR.readyState === 4 || XHR.readyState === 'complete') {
	            if (XHR.status === 200) {
	                callback(XHR);

	            } else {
	                alert('fel på servern');

	            }

	        }
	    };

	    XHR.open('GET', url, true);
	    XHR.send(null);
	}

	function cbFlickr(data) {
	    var p_url = '';
	    var t_url = '';
	    var photo;
	    var data = JSON.parse(data.responseText);
	    // log(photos);
	    for (var i = 0; i < 15; i++) {
	        photo = data.photos.photo[i];
	        p_url = 'http://www.flickr.com/photos/' + photo.owner + '/' + photo.id;
	        t_url = 'http://farm' + photo.farm + '.static.flickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg';
	        createGallery(t_url);

	    }
	}

	function createGallery(url) {
	    var img = document.createElement('img');

	    img.src = url;
	    // img.className = 'gallery-item';
	    document.querySelector('.flickr').appendChild(img);
	}


	return {
		init: init
	};
})();

flickr.init({
	url: 'https://www.flickr.com/services/rest/?&method=flickr.people.getPublicPhotos&format=json&api_key=4d6d6af841af2bba2737c158bd2cc298&user_id=113967346@N06&nojsoncallback=1'
});

