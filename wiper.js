document.body.style.border = "5px solid red";
console.log("Target available");

var blacklist = new RegExp('https?:\/\/.*\.(geeksforgeeks|tutorialspoint).*\.*');



function clearURLs(urls){
	var res = document.getElementsByClassName('r')
	console.log(res);
	console.log(urls.blacklistURLs);

	for (var i= 0; i < res.length; i++){
		for (var j=0; j < urls.blacklistURLs.length; j++){
			if(res[i].childNodes[0].getAttribute('href').indexOf(urls.blacklistURLs[j]) !== -1){
				res[i].parentElement.remove();
			}
		}
	}
}

browser.storage.local.get('blacklistURLs').then(clearURLs);
