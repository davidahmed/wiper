function displayURLs(urls){
	urls = urls.blacklistURLs;
	for (var i=0; i<urls.length; i++){
		document.getElementById('urls').innerHTML += urls[i];	
	}
}

browser.storage.local.get('blacklistURLs').then(displayURLs);
