
chrome.runtime.onInstalled.addListener(function() {
//    chrome.tabs.executeScript({
//        file: 'contentScript.js'
//    });

});

var curWindowId = undefined;
chrome.browserAction.onClicked.addListener(function callback () {
    if (!curWindowId) {
        chrome.windows.getAll(function (windows) {
            chrome.windows.create({'url': 'index.html', 'type': 'popup'}, function(window) {
                console.log('sdfsdf');
                curWindowId = window.id;
            });
        });
    }
});

chrome.windows.onRemoved.addListener(function callback (windowId) {
    if (windowId === curWindowId) {
        curWindowId = undefined;
    }
})
