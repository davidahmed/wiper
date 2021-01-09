(() => {
  // load default storage
  browser.storage.local.get().then(
    (storedSettings) => {
      // On startup, check whether we have stored settings.
      // If we don't, then store the default settings.
      if (!storedSettings.blacklistURLS) {
        browser.storage.local.set({ blacklistURLs: [] });
      }
    },
    (error) => {
      // Generic error logger.
      console.error(error);
    }
  );
})();
