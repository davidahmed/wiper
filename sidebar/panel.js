var URLregex = new RegExp(
  "((ftp|http|https)://)?([a-zA-Z1-9@:%._+~#=.-]+)(/.*)?"
);

const displayErrorMessage = (errorMessage) => {
  let getErrorDiv = document.getElementById("displayError");
  getErrorDiv.className = "show";
  getErrorDiv.innerHTML = errorMessage;
  setTimeout(() => {
    getErrorDiv.className = getErrorDiv.className.replace("show", "");
  }, 3000);
};

function pushURL(urls, newURL) {
  let oldURLs = undefined;
  try {
    // grab the list
    oldURLs = urls.blacklistURLs;
    // to make sure only unique URL is added
    if (oldURLs.indexOf(newURL) === -1) {
      oldURLs.push(newURL);
      browser.storage.local.set({ blacklistURLs: oldURLs });
    } else {
      displayErrorMessage("The URL is already blacklisted");
    }
  } catch (error) {
    if (error instanceof TypeError && oldURLs === undefined) {
      initStorage();
      displayErrorMessage("Storage was empty. Try Again");
    }
  }
}

function popURL(urls, urlToRemove) {
  var oldURLs = urls.blacklistURLs,
    index = oldURLs.indexOf(urlToRemove);

  if (index > -1) {
    oldURLs.splice(index, 1);
  }
  browser.storage.local.set({ blacklistURLs: oldURLs });
}

async function addURL() {
  try {
    let url = document.getElementById("addURLField").value;
    document.getElementById("addURLField").value = "";
    if (typeof url.match(URLregex)[3] !== "undefined") {
      await browser.storage.local.get("blacklistURLs").then(function (urls) {
        return pushURL(urls, url.match(URLregex)[3]);
      });
    } else {
      displayErrorMessage("Not valid URL is passed");
    }
    browser.storage.local.get("blacklistURLs").then(displayURLs);
  } catch (error) {
    // need to replace it with simple message
    // for now I think we are good to go.
    displayErrorMessage(error.message);
  }
}

async function removeURL(event) {
  var urlToRemove = event.target.parentElement.innerText;
  if (typeof urlToRemove != undefined) {
    await browser.storage.local.get("blacklistURLs").then(function (urls) {
      return popURL(urls, urlToRemove);
    });
  }
  browser.storage.local.get("blacklistURLs").then(displayURLs);
}

function displayURLs(urls) {
  var i, e, removeButton;
  urls = urls.blacklistURLs;
  if (urls !== "undefined") {
    document.getElementById("urls").textContent = "";
    for (i = 0; i < urls.length; i++) {
      e = document.createElement("div");
      removeButton = document.createElement("input");
      e.className = "urlEntry";
      e.innerHTML = urls[i];

      removeButton.className = "removeButton";
      removeButton.value = "Remove";
      removeButton.type = "button";
      removeButton.onclick = removeURL;

      e.appendChild(removeButton);
      document.getElementById("urls").appendChild(e);
    }
  }
}

document.getElementById("addURLButton").addEventListener("click", addURL);

document
  .getElementById("addURLField")
  .addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      document.getElementById("addURLButton").click();
    }
  });

// load default storage
const initStorage = () => {
  browser.storage.local.get().then(
    (storedSettings) => {
      if (!storedSettings.blacklistURLS) {
        browser.storage.local.set({ blacklistURLs: [] });
      }
    },
    (error) => {
      // Generic error logger.
      console.error(error);
    }
  );
};

browser.storage.local.get("blacklistURLs").then(displayURLs);
