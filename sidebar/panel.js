const URLregex = new RegExp('((ftp|http|https):\/\/)?([a-zA-Z1-9@:%._\+~#=\.\-]+)(\/.*)?');

function pushURL(urls, newURL){
	var oldURLs = urls.blacklistURLs;
	oldURLs.push(newURL);
	browser.storage.local.set({'blacklistURLs':oldURLs});
};


async function addURL(){
	var url = document.getElementById('inputURL').value;
	if (typeof url.match(URLregex)[3] !== 'undefined'){
		await browser.storage.local.get("blacklistURLs").then(function(urls){
			return pushURL(urls, url.match(URLregex)[3])});
	}
	browser.storage.local.get("blacklistURLs").then(displayURLs);
}


function displayURLs(urls){
	urls = urls.blacklistURLs;
	console.log(urls);
	if (urls !== 'undefined'){
		document.getElementById('urls').textContent = '';
		for (var i=0; i<urls.length; i++){
			var e = document.createElement('div');
			e.className = 'urlEntry';
			e.innerHTML = urls[i];
			document.getElementById('urls').appendChild(e);
		}
	}
}


browser.storage.local.get('blacklistURLs').then(displayURLs);
document.getElementById("addURL").addEventListener("click", addURL);
