document.body.style.border = "1px solid blue";

var blacklist = new RegExp('https?:\/\/.*\.(geeksforgeeks|tutorialspoint).*\.*');

function clearURLs(urls) {
    var i, j, arr, res, url;
    arr = [];
    res = document.querySelectorAll('div.rc');

    for (i = 0; i < res.length; i++) {
        for (j = 0; j < urls.blacklistURLs.length; j++) {
            if (res[i].firstChild.firstChild.getAttribute('href').indexOf(urls.blacklistURLs[j]) !== -1) {
                arr.push(i);
            }
        }
    }
    arr = [...new Set(arr)];

    for (i = 0; i < arr.length; i++) {
        url = res[arr[i]].firstChild.firstChild.getAttribute('href');
        url = 'Wiper blacklisted URL: <a href="' + url + '">' + url + '</a>';
        res[arr[i]].parentElement.innerHTML = url;
    }
}

browser.storage.local.get('blacklistURLs').then(clearURLs);
