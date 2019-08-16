chrome.runtime.onInstalled.addListener(function() {
    chrome.tabs.executeScript({
        file: 'contentScript.js'
    });
});
