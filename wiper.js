document.body.style.border = "1px solid blue";

var blacklist = new RegExp('https?:\/\/.*\.(geeksforgeeks|tutorialspoint).*\.*');



function clearURLs(urls){
	var arr = [];
	var res = document.querySelectorAll('div.rc');

	for (var i= 0; i < res.length; i++){
		for (var j=0; j < urls.blacklistURLs.length; j++){
			if(res[i].firstChild.firstChild.getAttribute('href').indexOf(urls.blacklistURLs[j]) !== -1){
				arr.push(i);
			}
		}
	}
	arr = [...new Set(arr)];
	for(var i=0; i<arr.length; i++){res[arr[i]].parentElement.innerHTML=""}
}

browser.storage.local.get('blacklistURLs').then(clearURLs);
