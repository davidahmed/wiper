/**
 * Modify the search results on (Google.com) that happen to be
 * from certain URLs.
 * @param {Array} urls- a list of URLs to modify the results of 
 */
function clearURLs(urls) {
  const isBlacklistedUrl = (link) => urls.some(url => link.includes(url));
  const decorateURL = (url) => `Wiper blacklisted URL: <a href="${url}">${url}</a>`;

  Array.from(document.querySelectorAll('div.g'))
  filter(result => isBlacklistedUrl(result.querySelector('a').href))
  forEach(result => {result.innerHTML = decorateURL(result.querySelector('a').href)});

  return true;
}

const handleBlacklistURLs = blacklist => clearURLs(blacklist.blacklistURLs);
    
/* global operations for every time the target page (./google./search) loads */
document.body.style.border = "1px solid blue";
browser.storage.local.get('blacklistURLs').then(handleBlacklistURLs);
