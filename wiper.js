/**
 * Modify the search results on (Google.com) that happen to be
 * from certain URLs.
 * @param {Array} urls- a list of URLs to modify the results of 
 */
function clearURLs(urls) {
  const isBlacklistedUrl = (link) => urls.some(url => link.includes(url));
  const decorateURL = (url) => `Wiper blacklisted URL: <a href="${url}">${url}</a>`;

  Array.from(document.querySelectorAll('div.g'))
    .filter(result => isBlacklistedUrl(result.querySelector('a').href))
    .forEach(result => {result.innerHTML = decorateURL(result.querySelector('a').href)});

  return true;
}


function handleBlacklistURLs(blacklist){
    return clearURLs(blacklist.blacklistURLs);
  }

function handleGoogleSearchResults(toggle){
  if (toggle === true){ 
    document.body.style.border = "1px solid blue";
    browser.runtime.sendMessage({'message': 'google.com-true'});
    browser.storage.local.get('blacklistURLs')
      .then(handleBlacklistURLs, reportError);
  }

  else {
    document.body.style.border = "1px solid red";

  }
}

/**
 * Log an error. This function might be updated in a future version 
 * remote error loggin.
 * @param {String} err- the error
 */
function reportError(err) {
  console.log(err);
}

/* global operations for every time the target page (./google./search) loads */
document.body.style.border = "1px solid blue";

browser.storage.local.get('enabled')
  .then( 
    (enabled) => {handleGoogleSearchResults(enabled.enabled)},
    reportError);

/*
Add Listeners to changes in storage.
*/
function localStorageChangeHandler(changes) {
  let changedItems = Object.keys(changes);

  for (let item of changedItems){
      if (item === 'enabled' && changes[item].newValue === true){
        handleGoogleSearchResults(true);
      }

      else if (item === 'enabled' && changes[item].newValue != true){
        handleGoogleSearchResults(false);
      }
  }
}

browser.storage.onChanged.addListener(localStorageChangeHandler);