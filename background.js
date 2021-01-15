/*
On startup, check whether we have stored settings.
If we don't, then store the default settings.
*/
browser.storage.local.get().then( (val) => {
  if (val['blacklistURLs'] === undefined){
    console.log('Initializing Wiper');
    browser.storage.local.set({'blacklistURLs': []});
    browser.storage.local.set({'enabled': true});
  }
}, console.log);

/*
Generic error logger.
*/
function onError(e) {
  console.error(e);
}

// Simple listener
browser.runtime.onMessage.addListener(notify);

function notify(message) {
  console.log('Got a message: ' + message.message);
}