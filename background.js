/*
On startup, check whether we have stored settings.
If we don't, then store the default settings.
*/
function checkStoredSettings(storedSettings) {
  if (!storedSettings.blacklistURLS) {
    browser.storage.local.set({'blacklistURLs': []});
  }
}


/*
Generic error logger.
*/
function onError(e) {
  console.error(e);
}


const gettingStoredSettings = browser.storage.local.get();
gettingStoredSettings.then(checkStoredSettings, onError);

