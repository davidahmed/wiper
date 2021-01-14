var URLregex = new RegExp('((ftp|http|https):\/\/)?([a-zA-Z1-9@:%._\+~#=\.\-]+)(\/.*)?');

function pushURL(urls, newURL) {
    var oldURLs = urls.blacklistURLs;
    oldURLs.push(newURL);
    browser.storage.local.set({'blacklistURLs': oldURLs});
}

function popURL(urls, urlToRemove) {
    var oldURLs = urls.blacklistURLs,
        index = oldURLs.indexOf(urlToRemove);

    if (index > -1) {
        oldURLs.splice(index, 1);
    }
    browser.storage.local.set({'blacklistURLs': oldURLs});
}

async function addURL() {
    var url = document.getElementById('addURLField').value;
    document.getElementById('addURLField').value = "";
    if (typeof url.match(URLregex)[3] !== 'undefined') {
        await browser.storage.local.get("blacklistURLs").then(function (urls) {
            return pushURL(urls, url.match(URLregex)[3]);
        });
    }
    browser.storage.local.get("blacklistURLs").then(displayURLs);
}

async function removeURL(event) {
    var urlToRemove = event.target.parentElement.innerText;
    if (typeof urlToRemove != undefined) {
        await browser.storage.local.get('blacklistURLs').then(function (urls) {
            return popURL(urls, urlToRemove);
        });
    }
    browser.storage.local.get("blacklistURLs").then(displayURLs);
}

function displayURLs(urls) {
    var i, e, removeButton;
    urls = urls.blacklistURLs;
    if (urls !== 'undefined') {
        document.getElementById('urls').textContent = '';
        for (i = 0; i < urls.length; i++) {
            e = document.createElement('div');
            removeButton = document.createElement('input');
            e.className = 'urlEntry';
            e.innerHTML = urls[i];

            removeButton.className = 'removeButton';
            removeButton.value = 'Remove';
            removeButton.type = 'button';
            removeButton.onclick = removeURL;

            e.appendChild(removeButton);
            document.getElementById('urls').appendChild(e);
        }
    }
}

document.getElementById("addURLButton").addEventListener("click", addURL);

document.getElementById("google-switch").addEventListener("click", ()=>{
    if (document.getElementById("google-switch").checked === true){
        browser.storage.local.set({'enabled': true})
            .then(()=>{console.log(document.getElementById("google-switch").checked)});
    }
    else {
        browser.storage.local.set({'enabled': false})
            .then(()=>{console.log(document.getElementById("google-switch").checked)});
    }
})

document.getElementById("addURLField")
    .addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("addURLButton").click();
    }
});


browser.storage.local.get('blacklistURLs').then(displayURLs);
